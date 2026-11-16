import { describe, expect, it } from 'vitest';
import { canonicalPath, resolveLegacyHash, resolvePage } from './routes';

describe('resolvePage', () => {
  it('разбирает корень и подкаталог GitHub Pages', () => {
    expect(resolvePage('/', '/')).toBe('home');
    expect(resolvePage('/sodeystvie/', '/sodeystvie/')).toBe('home');
  });

  it('понимает маршруты со слэшем и без', () => {
    expect(resolvePage('/funerals/', '/')).toBe('funerals');
    expect(resolvePage('/sodeystvie/funerals', '/sodeystvie/')).toBe('funerals');
    expect(resolvePage('/sodeystvie/care/', '/sodeystvie/')).toBe('care');
  });

  it('переводит старые адреса на новые разделы', () => {
    expect(resolvePage('/services', '/')).toBe('funerals');
    expect(resolvePage('/sodeystvie/calculator', '/sodeystvie/')).toBe('monuments');
    expect(resolvePage('/info', '/')).toBe('contacts');
  });

  it('отдаёт 404 для неизвестного пути', () => {
    expect(resolvePage('/unknown-page', '/')).toBe('notfound');
    expect(resolvePage('/sodeystvie/404.html', '/sodeystvie/')).toBe('notfound');
  });
});

describe('legacy hash', () => {
  it('поддерживает старые hash-ссылки', () => {
    expect(resolveLegacyHash('#care')).toBe('care');
    expect(resolveLegacyHash('#services')).toBe('funerals');
    expect(resolveLegacyHash('#top')).toBeUndefined();
  });
});

describe('canonicalPath', () => {
  it('строит путь с замыкающим слэшем', () => {
    expect(canonicalPath('home')).toBe('/');
    expect(canonicalPath('funerals')).toBe('/funerals/');
  });
});
