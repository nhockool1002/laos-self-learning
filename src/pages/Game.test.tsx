import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Game from './Game';
import '@testing-library/jest-dom';

describe('Game page', () => {
  it('hiển thị đúng các tab chính', () => {
    render(<Game />);
    expect(screen.getByText('Trò chơi Phụ âm đầu')).toBeInTheDocument();
    expect(screen.getByText('Trò chơi Phụ âm giữa')).toBeInTheDocument();
    expect(screen.getByText('Trò chơi Phụ âm cuối')).toBeInTheDocument();
  });

  it('hiển thị đúng tiêu đề trò chơi ở tab đầu', () => {
    render(<Game />);
    expect(screen.getByText('Trò chơi nối từ')).toBeInTheDocument();
    expect(screen.getByText('Nổ Bóng bay')).toBeInTheDocument();
    expect(screen.getByText('Tìm đáp án phù hợp')).toBeInTheDocument();
  });

  it('chuyển tab và kiểm tra tiêu đề trò chơi ở tab giữa', () => {
    render(<Game />);
    fireEvent.click(screen.getByText('Trò chơi Phụ âm giữa'));
    expect(screen.getByText('Trò chơi Nổ Bóng Bay')).toBeInTheDocument();
    expect(screen.getByText('Trò chơi tìm đáp án phù hợp 1')).toBeInTheDocument();
    expect(screen.getByText('Trò chơi tìm đáp án phù hợp 2')).toBeInTheDocument();
    expect(screen.getByText('Trò chơi Nối từ')).toBeInTheDocument();
  });

  it('chuyển tab và kiểm tra tiêu đề trò chơi ở tab cuối', () => {
    render(<Game />);
    fireEvent.click(screen.getByText('Trò chơi Phụ âm cuối'));
    expect(screen.getByText('Trò chơi Tìm đáp án phù hợp')).toBeInTheDocument();
    expect(screen.getByText('Trò chơi nổ bóng bay')).toBeInTheDocument();
  });

  it('có iframe trong mỗi phần trò chơi', () => {
    render(<Game />);
    // Kiểm tra có ít nhất 1 iframe ở tab đầu
    expect(screen.getAllByTitle(/Trò chơi|Nổ Bóng bay|Tìm đáp án phù hợp/i).length).toBeGreaterThan(0);
  });
}); 