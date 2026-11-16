import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { applySeo } from '../lib/seo';
import { trackPageView } from '../lib/analytics';
import {
  resolveLegacyHash,
  resolvePage,
  routeById,
  type PageId,
} from '../lib/routes';

export type { PageId } from '../lib/routes';

interface RouterContextType {
  currentPage: PageId;
  navigate: (page: PageId) => void;
  hrefFor: (page: PageId) => string;
}

const RouterContext = createContext<RouterContextType | null>(null);

const BASE = import.meta.env.BASE_URL;

const hrefFor = (page: PageId) => {
  if (page === 'notfound') return `${BASE}404.html`;
  const path = routeById(page)?.path ?? '';
  return path ? `${BASE}${path}/` : BASE;
};

const currentPageFromLocation = (): PageId => {
  const legacy = resolveLegacyHash(window.location.hash);
  if (legacy) return legacy;
  return resolvePage(window.location.pathname, BASE);
};

export const RouterProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState<PageId>(currentPageFromLocation);
  const isFirstRender = useRef(true);

  useEffect(() => {
    applySeo(currentPage);
    trackPageView(window.location.href, document.title);

    const canonical = hrefFor(currentPage);
    const current = `${window.location.pathname}${window.location.hash}`;
    const legacyHash = resolveLegacyHash(window.location.hash);
    const shouldCanonicalize =
      current !== canonical && (!window.location.hash || Boolean(legacyHash));
    if (shouldCanonicalize) {
      window.history.replaceState(null, '', canonical);
    }

    if (!isFirstRender.current) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      const announcer = document.getElementById('route-announcer');
      if (announcer) announcer.textContent = `Открыта страница: ${document.title}`;
      requestAnimationFrame(() => {
        const heading = document.querySelector<HTMLElement>('main h1');
        if (!heading) return;
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      });
    }
    isFirstRender.current = false;
  }, [currentPage]);

  useEffect(() => {
    const handlePopState = () => setCurrentPage(currentPageFromLocation());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((page: PageId) => {
    setCurrentPage(page);
    const target = hrefFor(page);
    if (`${window.location.pathname}${window.location.hash}` !== target) {
      window.history.pushState(null, '', target);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <RouterContext.Provider value={{ currentPage, navigate, hrefFor }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
