import React, { useRef, useState, useEffect } from 'react';
import {
  Box,
  Paper,
  IconButton,
  Tooltip,
  Typography,
  Button,
  Stack,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Switch,
  FormControlLabel,
  Popover,
  ToggleButton,
  ToggleButtonGroup,
  Slider,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Save as SaveIcon,
  Brush as BrushIcon,
  Edit as EditIcon,
  Create as CreateIcon,
  History as HistoryIcon,
  TextFields as TextFieldsIcon,
  GridOn as GridOnIcon,
  Colorize as ColorizeIcon,
  Undo as UndoIcon,
  Redo as RedoIcon,
  FormatColorFill as FillIcon,
  OpenWith as MoveIcon,
  SaveAlt as ExportIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { practiceData, PracticeWord } from '../data/practiceData';
import { HexColorPicker } from 'react-colorful';

interface DrawingTool {
  name: string;
  icon: JSX.Element;
  lineWidth: number;
  lineCap: CanvasLineCap;
  lineJoin: CanvasLineJoin;
  type: 'brush' | 'fill' | 'move';
}

interface SavedDrawing {
  name: string;
  data: string;
  timestamp: number;
}

const tools: DrawingTool[] = [
  {
    name: 'Bút chì',
    icon: <CreateIcon />,
    lineWidth: 2,
    lineCap: 'round',
    lineJoin: 'round',
    type: 'brush',
  },
  {
    name: 'Bút mực',
    icon: <EditIcon />,
    lineWidth: 3,
    lineCap: 'round',
    lineJoin: 'round',
    type: 'brush',
  },
  {
    name: 'Bút lông',
    icon: <BrushIcon />,
    lineWidth: 5,
    lineCap: 'round',
    lineJoin: 'round',
    type: 'brush',
  },
  {
    name: 'Tô màu',
    icon: <FillIcon />,
    lineWidth: 1,
    lineCap: 'butt',
    lineJoin: 'miter',
    type: 'fill',
  },
  {
    name: 'Di chuyển',
    icon: <MoveIcon />,
    lineWidth: 1,
    lineCap: 'butt',
    lineJoin: 'miter',
    type: 'move',
  },
  {
    name: 'Xóa',
    icon: <UndoIcon />,
    lineWidth: 20,
    lineCap: 'round',
    lineJoin: 'round',
    type: 'brush',
  },
];

const colors = [
  '#000000', // Đen
  '#FFFFFF', // Trắng
  '#FF0000', // Đỏ
  '#00FF00', // Xanh lá
  '#0000FF', // Xanh dương
  '#FFFF00', // Vàng
  '#FF00FF', // Hồng
  '#00FFFF', // Cyan
  '#FFA500', // Cam
  '#800080', // Tím
];

const WritingBoard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedTool, setSelectedTool] = useState<DrawingTool>(tools[0]);
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [drawingName, setDrawingName] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const [showSavedDrawingsDialog, setShowSavedDrawingsDialog] = useState(false);
  const [savedDrawings, setSavedDrawings] = useState<SavedDrawing[]>([]);
  const [currentWord, setCurrentWord] = useState<PracticeWord | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [gridSize] = useState(40);
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [customColor, setCustomColor] = useState('#000000');
  const [eraserSize, setEraserSize] = useState(20);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [eraserAnchorEl, setEraserAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [selectedArea, setSelectedArea] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [moveStartPoint, setMoveStartPoint] = useState<{ x: number; y: number } | null>(null);
  const [exportAnchorEl, setExportAnchorEl] = useState<HTMLButtonElement | null>(null);

  const drawGrid = React.useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.save();
    ctx.strokeStyle = theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 1;

    // Vẽ đường dọc
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Vẽ đường ngang
    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    ctx.restore();
  }, [gridSize, theme.palette.mode]);

  // Khởi tạo màu mặc định dựa trên theme chỉ khi bảng trống
  useEffect(() => {
    if (isCanvasEmpty) {
      setSelectedColor(theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000');
    }
  }, [theme.palette.mode, isCanvasEmpty]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gridCanvas = gridCanvasRef.current;
    if (!canvas || !gridCanvas) return;

    const ctx = canvas.getContext('2d');
    const gridCtx = gridCanvas.getContext('2d');
    if (!ctx || !gridCtx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    gridCanvas.width = canvas.offsetWidth;
    gridCanvas.height = canvas.offsetHeight;

    // Set initial styles
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = selectedTool.lineWidth;
    ctx.lineCap = selectedTool.lineCap;
    ctx.lineJoin = selectedTool.lineJoin;

    setContext(ctx);

    // Load saved drawing
    const savedDrawing = localStorage.getItem('writingBoard');
    if (savedDrawing) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        checkCanvasEmpty();
      };
      img.src = savedDrawing;
    }

    // Vẽ grid ngay khi khởi tạo
    if (showGrid) {
      drawGrid(gridCtx, canvas.width, canvas.height);
    }

    // Handle window resize
    const handleResize = () => {
      const savedImage = canvas.toDataURL();
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gridCanvas.width = canvas.offsetWidth;
      gridCanvas.height = canvas.offsetHeight;
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        if (showGrid) {
          drawGrid(gridCtx, canvas.width, canvas.height);
        }
      };
      img.src = savedImage;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedColor, selectedTool.lineWidth, selectedTool.lineCap, selectedTool.lineJoin, showGrid, drawGrid]);

  useEffect(() => {
    const gridCanvas = gridCanvasRef.current;
    if (!gridCanvas) return;

    const gridCtx = gridCanvas.getContext('2d');
    if (!gridCtx) return;

    // Xóa grid cũ
    gridCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);

    // Vẽ grid mới nếu đang bật
    if (showGrid) {
      drawGrid(gridCtx, gridCanvas.width, gridCanvas.height);
    }
  }, [showGrid, gridSize, theme.palette.mode, drawGrid]);

  useEffect(() => {
    if (context) {
      context.strokeStyle = selectedColor;
      context.lineWidth = selectedTool.lineWidth;
      context.lineCap = selectedTool.lineCap;
      context.lineJoin = selectedTool.lineJoin;
    }
  }, [selectedTool, selectedColor, context, selectedTool.lineWidth, selectedTool.lineCap, selectedTool.lineJoin]);

  const checkCanvasEmpty = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    const hasContent = imageData.data.some(channel => channel !== 0);
    setIsCanvasEmpty(!hasContent);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context || !canvasRef.current) return;
    const { offsetX, offsetY } = e.nativeEvent;

    if (selectedTool.type === 'move' && isMoving && moveStartPoint && selectedArea) {
      const dx = offsetX - moveStartPoint.x;
      const dy = offsetY - moveStartPoint.y;
      
      // Xóa vùng cũ
      context.clearRect(selectedArea.x, selectedArea.y, selectedArea.width, selectedArea.height);
      
      // Vẽ lại vùng mới
      const newX = selectedArea.x + dx;
      const newY = selectedArea.y + dy;
      setSelectedArea({ ...selectedArea, x: newX, y: newY });
      setMoveStartPoint({ x: offsetX, y: offsetY });
      return;
    }

    if (selectedTool.type === 'brush') {
      context.lineTo(offsetX, offsetY);
      context.stroke();
    }
  };

  const floodFill = (x: number, y: number, fillColor: string) => {
    if (!context || !canvasRef.current) return;
    
    const imageData = context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    const pixels = imageData.data;
    
    const startPos = (y * canvasRef.current.width + x) * 4;
    const startR = pixels[startPos];
    const startG = pixels[startPos + 1];
    const startB = pixels[startPos + 2];
    const startA = pixels[startPos + 3];
    
    const fillColorRGB = hexToRgb(fillColor);
    if (!fillColorRGB) return;
    
    const stack: number[][] = [[x, y]];
    
    while (stack.length) {
      const [currentX, currentY] = stack.pop()!;
      const pos = (currentY * canvasRef.current.width + currentX) * 4;
      
      if (
        currentX < 0 || currentX >= canvasRef.current.width ||
        currentY < 0 || currentY >= canvasRef.current.height ||
        pixels[pos] !== startR ||
        pixels[pos + 1] !== startG ||
        pixels[pos + 2] !== startB ||
        pixels[pos + 3] !== startA
      ) {
        continue;
      }
      
      pixels[pos] = fillColorRGB.r;
      pixels[pos + 1] = fillColorRGB.g;
      pixels[pos + 2] = fillColorRGB.b;
      pixels[pos + 3] = 255;
      
      stack.push([currentX + 1, currentY]);
      stack.push([currentX - 1, currentY]);
      stack.push([currentX, currentY + 1]);
      stack.push([currentX, currentY - 1]);
    }
    
    context.putImageData(imageData, 0, 0);
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!context) return;
    const { offsetX, offsetY } = e.nativeEvent;
    
    if (selectedTool.type === 'move' && selectedArea) {
      setIsMoving(true);
      setMoveStartPoint({ x: offsetX, y: offsetY });
      return;
    }

    setIsDrawing(true);

    if (selectedTool.type === 'fill') {
      floodFill(offsetX, offsetY, selectedColor);
      saveCanvasState();
    } else if (selectedTool.type === 'brush') {
      context.beginPath();
      context.moveTo(offsetX, offsetY);
    }
  };

  const stopDrawing = () => {
    if (!context) return;
    context.closePath();
    setIsDrawing(false);
    setIsMoving(false);
    setMoveStartPoint(null);
    saveCanvasState();
  };

  const clearCanvas = () => {
    if (!context || !canvasRef.current) return;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setIsCanvasEmpty(true);
    saveCanvasState();
  };

  const saveDrawing = () => {
    setShowSaveDialog(true);
  };

  const handleSaveConfirm = () => {
    if (!canvasRef.current || !drawingName.trim()) return;
    
    const dataURL = canvasRef.current.toDataURL();
    const newDrawing: SavedDrawing = {
      name: drawingName,
      data: dataURL,
      timestamp: Date.now(),
    };
    
    const updatedDrawings = [...savedDrawings, newDrawing];
    setSavedDrawings(updatedDrawings);
    localStorage.setItem('savedDrawings', JSON.stringify(updatedDrawings));
    setShowSaveDialog(false);
    setDrawingName('');
  };

  const loadSelectedDrawing = (drawing: SavedDrawing) => {
    if (!context || !canvasRef.current) return;

    const img = new Image();
    img.onload = () => {
      context.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
      context.drawImage(img, 0, 0);
      setIsCanvasEmpty(false);
    };
    img.src = drawing.data;
    setShowSavedDrawingsDialog(false);
  };

  const deleteSavedDrawing = (timestamp: number) => {
    const updatedDrawings = savedDrawings.filter(d => d.timestamp !== timestamp);
    setSavedDrawings(updatedDrawings);
    localStorage.setItem('savedDrawings', JSON.stringify(updatedDrawings));
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleConfirmNavigation = () => {
    if (pendingNavigation) {
      navigate(pendingNavigation);
      setShowConfirmDialog(false);
      setPendingNavigation(null);
    }
  };

  const handleSaveAndNavigate = () => {
    setShowConfirmDialog(false);
    setShowSaveDialog(true);
  };

  // Xử lý click vào các link trong menu
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && !link.getAttribute('href')?.startsWith('#')) {
        const path = link.getAttribute('href');
        if (path && !isCanvasEmpty) {
          e.preventDefault();
          e.stopPropagation();
          if (window.confirm('Bạn có muốn rời khỏi bảng vẽ không?')) {
            navigate(path);
          }
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isCanvasEmpty, navigate]);

  // Xử lý chuyển trang trong ứng dụng
  useEffect(() => {
    const handleRouteChange = () => {
      if (!isCanvasEmpty) {
        if (!window.confirm('Bạn có muốn rời khỏi bảng vẽ không?')) {
          window.history.pushState(null, '', location.pathname);
        }
      }
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, [isCanvasEmpty, location.pathname]);

  // Thêm event listener cho navigation
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isCanvasEmpty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isCanvasEmpty]);

  // Load saved drawings from localStorage
  useEffect(() => {
    const drawings = JSON.parse(localStorage.getItem('savedDrawings') || '[]');
    setSavedDrawings(drawings);
  }, []);

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * practiceData.consonants.length);
    const word = practiceData.consonants[randomIndex];
    setCurrentWord({
      ...word,
      letter: word.pronunciationVi // Chỉ hiển thị phiên âm
    });
  };

  const handleColorPickerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleColorPickerClose = () => {
    setAnchorEl(null);
  };

  const handleCustomColorChange = (color: string) => {
    setCustomColor(color);
    setSelectedColor(color);
  };

  const open = Boolean(anchorEl);

  // Thêm hàm xử lý di chuyển chuột
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (selectedTool.name === 'Xóa') {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        setCursorPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    }
  };

  // Thêm hàm xử lý thay đổi kích thước tẩy
  const handleEraserSizeChange = (event: Event, newValue: number | number[]) => {
    setEraserSize(newValue as number);
    if (context) {
      context.lineWidth = newValue as number;
    }
  };

  const handleEraserClick = (event: React.MouseEvent<HTMLElement>) => {
    setEraserAnchorEl(event.currentTarget as HTMLButtonElement);
  };

  const handleEraserClose = () => {
    setEraserAnchorEl(null);
  };

  const openEraser = Boolean(eraserAnchorEl);

  const handleToolChange = (e: React.MouseEvent<HTMLElement>, value: string | null) => {
    const tool = tools.find((t) => t.name === value);
    if (tool) {
      setSelectedTool(tool);
      if (tool.name === 'Xóa') {
        handleEraserClick(e);
      } else {
        handleEraserClose();
      }
    }
  };

  const handleEraserButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    if (selectedTool.name === 'Xóa') {
      handleEraserClick(e);
    }
  };

  // Thêm hàm lưu trạng thái canvas
  const saveCanvasState = () => {
    if (!canvasRef.current) return;
    const newState = canvasRef.current.toDataURL();
    const newHistory = history.slice(0, currentStep + 1);
    newHistory.push(newState);
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
    setCanUndo(newHistory.length > 1);
    setCanRedo(false);
  };

  // Thêm hàm Undo
  const handleUndo = () => {
    if (currentStep > 0 && context && canvasRef.current) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      const img = new Image();
      img.onload = () => {
        context.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
        context.drawImage(img, 0, 0);
        checkCanvasEmpty();
      };
      img.src = history[newStep];
      setCanUndo(newStep > 0);
      setCanRedo(true);
    }
  };

  // Thêm hàm Redo
  const handleRedo = () => {
    if (currentStep < history.length - 1 && context && canvasRef.current) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      const img = new Image();
      img.onload = () => {
        context.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
        context.drawImage(img, 0, 0);
        checkCanvasEmpty();
      };
      img.src = history[newStep];
      setCanUndo(true);
      setCanRedo(newStep < history.length - 1);
    }
  };

  const handleExportClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setExportAnchorEl(event.currentTarget);
  };

  const handleExportClose = () => {
    setExportAnchorEl(null);
  };

  const handleExport = (format: 'png' | 'jpg' | 'svg') => {
    if (!canvasRef.current) return;
    
    const link = document.createElement('a');
    let dataUrl: string;
    
    switch (format) {
      case 'png':
        dataUrl = canvasRef.current.toDataURL('image/png');
        break;
      case 'jpg':
        dataUrl = canvasRef.current.toDataURL('image/jpeg', 0.8);
        break;
      case 'svg':
        // Chuyển đổi canvas thành SVG
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', canvasRef.current.width.toString());
        svg.setAttribute('height', canvasRef.current.height.toString());
        
        const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        image.setAttribute('width', canvasRef.current.width.toString());
        image.setAttribute('height', canvasRef.current.height.toString());
        image.setAttribute('href', canvasRef.current.toDataURL('image/png'));
        
        svg.appendChild(image);
        dataUrl = 'data:image/svg+xml;base64,' + btoa(new XMLSerializer().serializeToString(svg));
        break;
    }
    
    link.download = `drawing.${format}`;
    link.href = dataUrl;
    link.click();
    handleExportClose();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Bảng viết
      </Typography>

      <Paper 
        elevation={3} 
        sx={{ 
          p: 2, 
          mb: 2,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          alignItems: 'center',
          flexWrap: 'wrap'
        }}
      >
        <ToggleButtonGroup
          value={selectedTool.name}
          exclusive
          onChange={handleToolChange}
          aria-label="drawing tools"
          size="small"
        >
          {tools.map((tool) => (
            <ToggleButton 
              key={tool.name} 
              value={tool.name}
              aria-label={tool.name}
              onClick={tool.name === 'Xóa' ? handleEraserButtonClick : undefined}
            >
              <Tooltip title={tool.name}>
                {tool.icon}
              </Tooltip>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Tooltip title="Chọn màu">
            <IconButton onClick={handleColorPickerClick}>
              <ColorizeIcon />
            </IconButton>
          </Tooltip>
          <Box
            sx={{
              width: 24,
              height: 24,
              backgroundColor: selectedColor,
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </Box>

        <Stack direction="row" spacing={1}>
          <Tooltip title="Hoàn tác">
            <span>
              <IconButton 
                onClick={handleUndo} 
                color="primary"
                disabled={!canUndo}
              >
                <UndoIcon />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title="Làm lại">
            <span>
              <IconButton 
                onClick={handleRedo} 
                color="primary"
                disabled={!canRedo}
              >
                <RedoIcon />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title="Xóa bảng">
            <IconButton onClick={clearCanvas} color="error">
              <DeleteIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Lưu bảng">
            <IconButton onClick={saveDrawing} color="primary">
              <SaveIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Danh sách bảng đã lưu">
            <IconButton onClick={() => setShowSavedDrawingsDialog(true)} color="info">
              <HistoryIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Hiện chữ">
            <IconButton onClick={getRandomWord} color="secondary">
              <TextFieldsIcon />
            </IconButton>
          </Tooltip>

          <FormControlLabel
            control={
              <Switch
                checked={showGrid}
                onChange={(e) => setShowGrid(e.target.checked)}
                color="primary"
                size="small"
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <GridOnIcon fontSize="small" />
                <Typography variant="body2">Lưới</Typography>
              </Box>
            }
          />

          <Tooltip title="Xuất file">
            <IconButton
              onClick={handleExportClick}
              color="primary"
            >
              <ExportIcon />
            </IconButton>
          </Tooltip>
        </Stack>

        <Popover
          open={openEraser}
          anchorEl={eraserAnchorEl}
          onClose={handleEraserClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          PaperProps={{
            sx: {
              p: 1.5,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              boxShadow: theme.shadows[3],
            }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 200 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Kích thước
              </Typography>
              <Typography variant="body2" color="primary" sx={{ minWidth: 30, textAlign: 'center' }}>
                {eraserSize}px
              </Typography>
            </Box>
            <Slider
              value={eraserSize}
              onChange={handleEraserSizeChange}
              min={5}
              max={50}
              size="small"
              sx={{
                width: 120,
                '& .MuiSlider-thumb': {
                  width: 12,
                  height: 12,
                },
                '& .MuiSlider-track': {
                  height: 2,
                },
                '& .MuiSlider-rail': {
                  height: 2,
                },
              }}
            />
          </Box>
        </Popover>
      </Paper>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleColorPickerClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2 }}>
          <HexColorPicker color={customColor} onChange={handleCustomColorChange} />
          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {colors.map((color) => (
              <Box
                key={color}
                sx={{
                  width: 24,
                  height: 24,
                  backgroundColor: color,
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
                onClick={() => {
                  setSelectedColor(color);
                  handleColorPickerClose();
                }}
              />
            ))}
          </Box>
        </Box>
      </Popover>

      {currentWord && (
        <Paper 
          elevation={3} 
          sx={{ 
            p: 2, 
            mb: 2, 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
          }}
        >
          <Typography variant="h2" sx={{ fontFamily: 'Noto Sans Lao' }}>
            {currentWord.letter}
          </Typography>
        </Paper>
      )}

      <Paper
        elevation={3}
        sx={{
          width: '100%',
          height: '70vh',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
        }}
      >
        <canvas
          ref={gridCanvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            cursor: selectedTool.name === 'Xóa' ? 'none' : 'crosshair',
          }}
          onMouseDown={startDrawing}
          onMouseMove={(e) => {
            draw(e);
            handleMouseMove(e);
          }}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
        {selectedTool.name === 'Xóa' && (
          <Box
            sx={{
              position: 'absolute',
              left: cursorPosition.x,
              top: cursorPosition.y,
              width: eraserSize,
              height: eraserSize,
              borderRadius: '50%',
              border: '2px solid #666',
              pointerEvents: 'none',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000,
            }}
          />
        )}
      </Paper>

      {/* Dialog lưu bảng */}
      <Dialog open={showSaveDialog} onClose={() => setShowSaveDialog(false)}>
        <DialogTitle>Lưu bảng vẽ</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên bảng"
            fullWidth
            value={drawingName}
            onChange={(e) => setDrawingName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSaveDialog(false)}>Hủy</Button>
          <Button onClick={handleSaveConfirm} disabled={!drawingName.trim()}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog xác nhận rời đi */}
      <Dialog open={showConfirmDialog} onClose={() => setShowConfirmDialog(false)}>
        <DialogTitle>Xác nhận</DialogTitle>
        <DialogContent>
          <Typography>Bạn có muốn rời khỏi bảng vẽ không?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmDialog(false)}>Hủy</Button>
          <Button onClick={handleConfirmNavigation} color="primary">
            Rời đi không cần lưu
          </Button>
          <Button onClick={handleSaveAndNavigate} color="secondary">
            Lưu và rời đi
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog danh sách bảng đã lưu */}
      <Dialog 
        open={showSavedDrawingsDialog} 
        onClose={() => setShowSavedDrawingsDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Danh sách bảng đã lưu</DialogTitle>
        <DialogContent>
          {savedDrawings.length === 0 ? (
            <Typography>Chưa có bảng nào được lưu</Typography>
          ) : (
            <List>
              {savedDrawings.map((drawing) => (
                <React.Fragment key={drawing.timestamp}>
                  <ListItem button onClick={() => loadSelectedDrawing(drawing)}>
                    <ListItemText
                      primary={drawing.name}
                      secondary={formatDate(drawing.timestamp)}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSavedDrawing(drawing.timestamp);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSavedDrawingsDialog(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>

      <Menu
        anchorEl={exportAnchorEl}
        open={Boolean(exportAnchorEl)}
        onClose={handleExportClose}
      >
        <MenuItem onClick={() => handleExport('png')}>PNG</MenuItem>
        <MenuItem onClick={() => handleExport('jpg')}>JPG</MenuItem>
        <MenuItem onClick={() => handleExport('svg')}>SVG</MenuItem>
      </Menu>
    </Box>
  );
};

export default WritingBoard; 