# Ứng dụng Học Tiếng Lào

Ứng dụng web học tiếng Lào với giao diện thân thiện và các tính năng tương tác.

## Tính năng chính

- Học bảng chữ cái tiếng Lào (phụ âm, nguyên âm, thanh)
- Bài học theo chủ đề từ cơ bản đến nâng cao
- Bài tập tương tác và luyện tập
- Kiểm tra kiến thức
- Hỗ trợ đa ngôn ngữ (Tiếng Việt và Tiếng Anh)
- Giao diện tối (Dark theme)
- Có thể đóng gói thành ứng dụng desktop cho Windows và MacOS

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

4. Đóng gói ứng dụng:
```bash
npm run electron-pack
```

## Cấu trúc dự án

```
laos-learning/
├── public/
│   ├── index.html
│   └── assets/
├── src/
│   ├── components/
│   │   └── Layout.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Alphabet.tsx
│   │   ├── Lessons.tsx
│   │   ├── Practice.tsx
│   │   └── Tests.tsx
│   ├── App.tsx
│   ├── index.tsx
│   └── i18n.ts
├── electron.js
├── package.json
└── README.md
```

## Công nghệ sử dụng

- ReactJS với TypeScript
- Material UI
- i18next cho đa ngôn ngữ
- Electron cho đóng gói ứng dụng desktop

## Đóng góp

Mọi đóng góp đều được hoan nghênh! Vui lòng tạo issue hoặc pull request để đóng góp.

## Giấy phép

MIT License 