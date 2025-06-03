import { describe, it, expect } from '@jest/globals';
import practiceConfig from '../practiceConfig.json';

// Hàm sinh đáp án giống logic trong Practice.tsx
function getOptions(correct: string, pool: string[]): string[] {
  const uniquePool = Array.from(new Set(pool.filter(x => x !== correct)));
  const wrongOptions = uniquePool.sort(() => Math.random() - 0.5).slice(0, practiceConfig.numOptions - 1);
  const insertIdx = Math.floor(Math.random() * practiceConfig.numOptions);
  const options = [...wrongOptions];
  options.splice(insertIdx, 0, correct);
  return options;
}

describe('Luyện tập - sinh đáp án', () => {
  const pool = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  it('phải luôn có đúng 1 đáp án đúng', () => {
    for (let i = 0; i < 10; i++) {
      const options = getOptions('A', pool);
      expect(options.filter(x => x === 'A').length).toBe(1);
    }
  });
  it('không có đáp án lặp', () => {
    for (let i = 0; i < 10; i++) {
      const options = getOptions('A', pool);
      const set = new Set(options);
      expect(set.size).toBe(options.length);
    }
  });
  it('luôn đủ số lượng đáp án', () => {
    for (let i = 0; i < 10; i++) {
      const options = getOptions('A', pool);
      expect(options.length).toBe(practiceConfig.numOptions);
    }
  });
}); 