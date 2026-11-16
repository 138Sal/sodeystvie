export type PageId =
  | 'home'
  | 'funerals'
  | 'care'
  | 'monuments'
  | 'reviews'
  | 'contacts'
  | 'notfound';

export interface RouteDef {
  id: Exclude<PageId, 'notfound'>;
  /** Путь без ведущего и замыкающего слэша. Пустая строка — главная. */
  path: string;
  label: string;
}

export const routes: RouteDef[] = [
  { id: 'home', path: '', label: 'Главная' },
  { id: 'funerals', path: 'funerals', label: 'Похороны' },
  { id: 'care', path: 'care', label: 'Благоустройство' },
  { id: 'monuments', path: 'monuments', label: 'Памятники' },
  { id: 'reviews', path: 'reviews', label: 'Отзывы' },
  { id: 'contacts', path: 'contacts', label: 'Контакты' },
];

export const navRoutes = routes;

/** Старые адреса, которые ещё могут быть в закладках и поиске. */
export const legacyPaths: Record<string, Exclude<PageId, 'notfound'>> = {
  services: 'funerals',
  funeral: 'funerals',
  calculator: 'monuments',
  info: 'contacts',
  articles: 'reviews',
};

const hashAliases: Record<string, Exclude<PageId, 'notfound'>> = {
  '#home': 'home',
  '#funerals': 'funerals',
  '#care': 'care',
  '#monument-care': 'care',
  '#monuments': 'monuments',
  '#reviews': 'reviews',
  '#contacts': 'contacts',
  '#services': 'funerals',
  '#calculator': 'monuments',
  '#info': 'contacts',
  '#articles': 'reviews',
};

export const routeById = (page: PageId): RouteDef | undefined =>
  routes.find((route) => route.id === page);

export const canonicalPath = (page: PageId): string => {
  const route = routeById(page);
  return route && route.path ? `/${route.path}/` : '/';
};

/** Приводит pathname (с учётом base) к идентификатору страницы. */
export const resolvePage = (pathname: string, base = '/'): PageId => {
  const basePath = base.replace(/\/+$/, '');
  let path = pathname;

  if (basePath && path.startsWith(basePath)) {
    path = path.slice(basePath.length);
  }

  path = path.replace(/^\/+|\/+$/g, '').toLowerCase();

  if (!path || path === 'index.html') return 'home';

  const normalized = path.replace(/\/+$/, '');
  const legacy = legacyPaths[normalized];
  if (legacy) return legacy;

  return routes.find((route) => route.path === normalized)?.id ?? 'notfound';
};

/** Поддерживает старые hash-ссылки (#care) из прошлой версии сайта. */
export const resolveLegacyHash = (hash: string): Exclude<PageId, 'notfound'> | undefined =>
  hashAliases[hash.toLowerCase()];
