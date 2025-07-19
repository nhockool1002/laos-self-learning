// import React from 'react';
// import { render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import Game from './Game';
// import '@testing-library/jest-dom';

// describe('Game page', () => {
//   it('hiển thị đúng các tab chính', () => {
//     const { getByText } = render(<Game />);
//     expect(getByText('Trò chơi Phụ âm đầu')).toBeInTheDocument();
//     expect(getByText('Trò chơi Phụ âm giữa')).toBeInTheDocument();
//     expect(getByText('Trò chơi Phụ âm cuối')).toBeInTheDocument();
//   });

//   it('hiển thị đúng tiêu đề trò chơi ở tab đầu', () => {
//     const { getByText } = render(<Game />);
//     expect(getByText('Trò chơi nối từ')).toBeInTheDocument();
//     expect(getByText('Nổ Bóng bay')).toBeInTheDocument();
//     expect(getByText('Tìm đáp án phù hợp')).toBeInTheDocument();
//   });

//   it('chuyển tab và kiểm tra tiêu đề trò chơi ở tab giữa', async () => {
//     const { getByText } = render(<Game />);
//     await userEvent.click(getByText('Trò chơi Phụ âm giữa'));
//     expect(getByText('Trò chơi Nổ Bóng Bay')).toBeInTheDocument();
//     expect(getByText('Trò chơi tìm đáp án phù hợp 1')).toBeInTheDocument();
//     expect(getByText('Trò chơi tìm đáp án phù hợp 2')).toBeInTheDocument();
//     expect(getByText('Trò chơi Nối từ')).toBeInTheDocument();
//   });

//   it('chuyển tab và kiểm tra tiêu đề trò chơi ở tab cuối', async () => {
//     const { getByText } = render(<Game />);
//     await userEvent.click(getByText('Trò chơi Phụ âm cuối'));
//     expect(getByText('Trò chơi Tìm đáp án phù hợp')).toBeInTheDocument();
//     expect(getByText('Trò chơi nổ bóng bay')).toBeInTheDocument();
//   });

//   it('có iframe trong mỗi phần trò chơi', () => {
//     const { getAllByTitle } = render(<Game />);
//     // Kiểm tra có ít nhất 1 iframe ở tab đầu
//     expect(getAllByTitle(/Trò chơi|Nổ Bóng bay|Tìm đáp án phù hợp/i).length).toBeGreaterThan(0);
//   });
// }); 