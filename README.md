# Ứng dụng Học Tiếng Lào

Ứng dụng web học tiếng Lào hiện đại, đa nền tảng, giao diện đẹp, hỗ trợ đa ngôn ngữ, luyện tập tương tác và bảng xếp hạng.

## Tính năng nổi bật

- **Học bảng chữ cái tiếng Lào**
  - Học phụ âm, nguyên âm, thanh điệu với hình ảnh minh họa, phát âm chuẩn
  - Flashcard, quiz, chuyển đổi giữa phiên âm và chữ cái

- **Luyện tập đa dạng**
  - Luyện tập trắc nghiệm (quiz) với tính điểm, thời gian, bảng xếp hạng
  - Luyện tập với trò chơi tương tác (Wordwall, mini game)
  - Luyện tập với bảng viết (vẽ, luyện viết chữ Lào trực tiếp)
  - Theo dõi số lần luyện tập, thống kê tiến độ

- **Bảng xếp hạng & Huy hiệu**
  - Bảng xếp hạng realtime, giao diện đẹp, hiệu ứng top 3 nổi bật
  - Hệ thống huy hiệu (badges) cho thành tích

- **Hệ thống người dùng**
  - Đăng ký, đăng nhập, lưu trữ tiến độ học tập
  - Theo dõi thành tích, hiển thị huy hiệu đạt được

- **Giao diện & Trải nghiệm**
  - Giao diện hiện đại, chủ đạo màu tím xanh (#667eea, #764ba2)
  - Theme sáng/tối tự động, tối ưu UX/UI, hiệu ứng mượt mà
  - Responsive trên mọi thiết bị (PC, tablet, mobile)
  - Menu trái thu gọn/mở rộng, lưu trạng thái, dropdown thông minh
  - Đa ngôn ngữ (Tiếng Việt, Tiếng Anh), dễ mở rộng

## Yêu cầu hệ thống

- Node.js >= 14
- npm >= 6

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
│   ├── badges/         # Hình ảnh huy hiệu
│   └── assets/         # Hình ảnh, icon, flag, ...
├── src/
│   ├── components/     # Component tái sử dụng, layout, menu, modal
│   ├── contexts/       # React contexts
│   ├── pages/          # Các trang chính (Home, Practice, Game, Tests...)
│   ├── services/       # Service xử lý logic, i18n, API
│   ├── config/         # Cấu hình ứng dụng, supabase, theme
│   ├── data/           # Dữ liệu tĩnh, bảng chữ cái, bài học
│   ├── locales/        # File đa ngôn ngữ (vi, en...)
│   ├── App.tsx
│   └── index.tsx
├── document/           # Release notes, tài liệu kỹ thuật
├── package.json
└── README.md
```

## Công nghệ sử dụng

- **Frontend**
  - ReactJS + TypeScript
  - Material UI (MUI) cho giao diện
  - i18next cho đa ngôn ngữ
  - React Router v6
  - Animation: CSS keyframes, MUI transitions

- **Backend & Storage**
  - Supabase (PostgreSQL) cho bảng xếp hạng, user, badge
  - Firebase Authentication cho xác thực người dùng
  - Google Sheets API (tùy chọn)

## Đóng góp

Mọi đóng góp đều được hoan nghênh! Vui lòng tạo issue hoặc pull request để đóng góp.

## Giấy phép

MIT License 