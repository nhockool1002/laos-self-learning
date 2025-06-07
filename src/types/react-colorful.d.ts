declare module 'react-colorful' {
  import { FC } from 'react';

  interface HexColorPickerProps {
    color: string;
    onChange: (color: string) => void;
  }

  export const HexColorPicker: FC<HexColorPickerProps>;
} 