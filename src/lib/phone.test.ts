import { describe, expect, it } from 'vitest';
import { formatPhone, phoneDigits } from './phone';

describe('formatPhone', () => {
  it('форматирует федеральный номер', () => {
    expect(formatPhone('9517767747')).toBe('+7 (951) 776-77-47');
  });

  it('заменяет 8 на +7', () => {
    expect(formatPhone('8 951 776-77-47')).toBe('+7 (951) 776-77-47');
  });

  it('не даёт ввести больше 11 цифр', () => {
    expect(phoneDigits(formatPhone('+7 951 776-77-47 999'))).toHaveLength(11);
  });

  it('возвращает пустую строку без цифр', () => {
    expect(formatPhone('')).toBe('');
    expect(formatPhone('abc')).toBe('');
  });

  it('достраивает незаконченный номер', () => {
    expect(formatPhone('951')).toBe('+7 (951)');
    expect(formatPhone('9517')).toBe('+7 (951) 7');
  });
});
