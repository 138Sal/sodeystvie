import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type PageId = 'home' | 'care' | 'monuments' | 'reviews' | 'contacts';

interface RouterContextType {
  currentPage: PageId;
  navigate: (page: PageId) => void;
}

const RouterContext = createContext<RouterContextType | null>(null);

/**
 * Публикация в подкаталоге (например, ni-os.ru/apps/sodeystvie/) не может
 * использовать history.pushState с абсолютными путями — переходим на hash-навигацию.
 */
const HASH_MODE = import.meta.env.VITE_HASH_ROUTER === '1';

const pathToPage: Record<string, PageId> = {
  '/': 'home',
  '': 'home',
  '/care': 'care',
  '/monuments': 'monuments',
  '/reviews': 'reviews',
  '/contacts': 'contacts',
  // старые адреса удалённых разделов ведут на главную
  '/services': 'home',
  '/calculator': 'home',
  '/info': 'home',
};

const hashToPage: Record<string, PageId> = {
  '#home': 'home',
  '#care': 'care',
  '#monuments': 'monuments',
  '#reviews': 'reviews',
  '#contacts': 'contacts',
  // backward-compat hashes
  '#monument-care': 'care',
  '#services': 'home',
  '#calculator': 'home',
  '#info': 'home',
  '#articles': 'home',
};

const pageToPath: Record<PageId, string> = {
  home: '/',
  care: '/care',
  monuments: '/monuments',
  reviews: '/reviews',
  contacts: '/contacts',
};

const resolveInitialPage = (): PageId => {
  if (typeof window === 'undefined') return 'home';

  const hash = window.location.hash.toLowerCase();
  if (hash && hashToPage[hash]) return hashToPage[hash];

  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  if (pathToPage[pathname]) return pathToPage[pathname];

  return 'home';
};

export const RouterProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState<PageId>(resolveInitialPage);

  const navigate = (page: PageId) => {
    setCurrentPage(page);

    if (HASH_MODE) {
      const targetHash = `#${page}`;
      if (window.location.hash !== targetHash) {
        window.history.pushState(
          null,
          '',
          `${window.location.pathname}${window.location.search}${targetHash}`
        );
      }
    } else {
      const targetPath = pageToPath[page];
      if (window.location.pathname !== targetPath) {
        window.history.pushState(null, '', targetPath);
      }
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffect(() => {
    const handlePopState = () => {
      const page = resolveInitialPage();
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  return (
    <RouterContext.Provider value={{ currentPage, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const ctx = useContext(RouterContext);
  if (!ctx) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return ctx;
};
