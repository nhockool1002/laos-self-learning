# Ứng dụng Học Tiếng Lào

Ứng dụng web học tiếng Lào với giao diện thân thiện và các tính năng tương tác.

## Tính năng chính

- **Học bảng chữ cái tiếng Lào**
  - Học phụ âm với hình ảnh minh họa
  - Học nguyên âm với hình ảnh minh họa
  - Học thanh với hình ảnh minh họa
  - Phát âm chuẩn cho từng chữ cái

- **Luyện tập phụ âm**
  - Bài tập trắc nghiệm tương tác
  - Chuyển đổi giữa phiên âm và chữ cái
  - Tính điểm và thời gian hoàn thành
  - Bảng xếp hạng người dùng
  - Hệ thống huy hiệu (badges) cho thành tích

- **Hệ thống người dùng**
  - Đăng ký và đăng nhập
  - Lưu trữ tiến độ học tập
  - Theo dõi thành tích
  - Hiển thị huy hiệu đạt được

- **Giao diện**
  - Thiết kế tối (Dark theme) thân thiện với mắt
  - Responsive trên mọi thiết bị
  - Hiệu ứng và animation mượt mà
  - Hỗ trợ đa ngôn ngữ (Tiếng Việt và Tiếng Anh)

## Yêu cầu hệ thống

- Node.js 14.0.0 trở lên
- npm 6.0.0 trở lên

## Cài đặt

1. Clone repository:
```bash
git clone https://github.com/yourusername/laos-learning.git
cd laos-learning
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Chạy ứng dụng ở môi trường development:
```bash
npm start
```

## Cấu trúc dự án

```
laos-learning/
├── public/
│   ├── index.html
│   ├── badges/         # Thư mục chứa hình ảnh huy hiệu
│   └── assets/         # Thư mục chứa hình ảnh và tài nguyên
├── src/
│   ├── components/     # Các component tái sử dụng
│   ├── contexts/       # React contexts
│   ├── pages/          # Các trang chính của ứng dụng
│   ├── services/       # Các service xử lý logic
│   ├── config/         # Cấu hình ứng dụng
│   ├── data/          # Dữ liệu tĩnh
│   ├── App.tsx
│   └── index.tsx
├── package.json
└── README.md
```

## Công nghệ sử dụng

- **Frontend**
  - ReactJS với TypeScript
  - Material UI cho giao diện
  - i18next cho đa ngôn ngữ
  - React Router cho điều hướng

- **Backend & Storage**
  - Google Sheets API cho lưu trữ dữ liệu
  - Firebase Authentication cho xác thực người dùng

## Tính năng đang phát triển

- Luyện tập từ vựng
- Bài học theo chủ đề
- Kiểm tra kiến thức
- Đóng gói thành ứng dụng desktop

## Đóng góp

Mọi đóng góp đều được hoan nghênh! Vui lòng tạo issue hoặc pull request để đóng góp.

## Giấy phép

MIT License 