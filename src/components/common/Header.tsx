import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Phone } from 'lucide-react';
import { OrthodoxCross } from '../icons/OrthodoxCross';
import { useRouter, type PageId } from '../../context/RouterContext';
import { Link } from './Link';
import { navRoutes } from '../../lib/routes';
import { siteConfig } from '../../data/site';

interface NavItem {
  id: PageId;
  label: string;
}

const navItems: NavItem[] = navRoutes;

export const Header = () => {
  const { currentPage } = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;

    const main = document.getElementById('main-content');
    const footer = document.querySelector('footer');
    main?.setAttribute('inert', '');
    footer?.setAttribute('inert', '');
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      drawerRef.current?.focus({ preventScroll: true });
    }, 80);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        menuButtonRef.current?.focus({ preventScroll: true });
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      main?.removeAttribute('inert');
      footer?.removeAttribute('inert');
      document.body.style.overflow = '';
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/95 backdrop-blur-md">
      <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-24">
        <div className="flex h-[80px] items-center justify-between gap-5 sm:h-[88px] 2xl:h-[96px]">
          <Link
            page="home"
            className="flex items-center gap-3.5 text-left transition-opacity hover:opacity-85 sm:gap-4"
          >
            <span className="flex h-11 shrink-0 items-center">
              <OrthodoxCross className="h-8 w-8 text-paper sm:h-9 sm:w-9" />
            </span>
            <span className="h-9 w-px bg-line sm:h-10" aria-hidden="true" />
            <span className="flex flex-col justify-center">
              <span className="church text-[20px] leading-[1.2] tracking-[0.06em] text-paper sm:text-[23px] 2xl:text-[25px]">
                СОДЕЙСТВИЕ
              </span>
              <span className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-dim 2xl:text-[11px]">
                Ритуальная служба · Челябинск
              </span>
            </span>
          </Link>

          <nav aria-label="Основная навигация" className="hidden items-center xl:flex">
            <ul role="list" className="flex items-center gap-5 2xl:gap-8">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <li key={item.id}>
                    <Link
                      page={item.id}
                      aria-current={isActive ? 'page' : undefined}
                      className={`relative inline-block px-2.5 py-2.5 text-[14.5px] transition-colors 2xl:px-3 2xl:text-[15.5px] ${
                        isActive
                          ? 'font-bold text-paper'
                          : 'font-medium text-mute hover:text-paper'
                      }`}
                    >
                      {item.label}
                      {isActive ? (
                        <motion.span
                          layoutId="header-active-tab"
                          className="absolute inset-x-2 -bottom-[23px] h-[2.5px] bg-paper sm:-bottom-[27px] 2xl:-bottom-[31px]"
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-4 xl:flex">
            <a
              href={`tel:${siteConfig.phoneHref}`}
              className="group inline-flex items-center gap-2.5 text-[14px] font-bold text-paper 2xl:text-[15.5px]"
            >
              <Phone className="h-3.5 w-3.5 shrink-0 text-dim transition-colors group-hover:text-paper" />
              <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-paper/40">
                {siteConfig.phone}
              </span>
            </a>
          </div>

          <div className="flex items-center gap-4 xl:hidden">
            <a
              href={`tel:${siteConfig.phoneHref}`}
              aria-label={`Позвонить: ${siteConfig.phone}`}
              className="flex h-11 items-center gap-2 text-[13px] font-semibold text-paper transition-opacity hover:opacity-70"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">Позвонить</span>
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-menu"
              className="flex h-11 w-11 items-center justify-center text-paper transition-opacity hover:opacity-70"
            >
              <span className="relative flex h-3 w-6 flex-col justify-between">
                <motion.span
                  className="block h-[1.5px] w-full bg-current"
                  animate={mobileOpen ? { rotate: 45, y: 5.25 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.span
                  className="block h-[1.5px] w-full bg-current"
                  animate={mobileOpen ? { rotate: -45, y: -5.25 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            ref={drawerRef}
            id="mobile-navigation-menu"
            key="mobile-drawer"
            tabIndex={-1}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="max-h-[calc(100svh-80px)] overflow-y-auto border-t border-line bg-ink xl:hidden"
          >
            <motion.div
              initial={{ y: -8 }}
              animate={{ y: 0 }}
              exit={{ y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full px-5 py-5 sm:px-8"
            >
              <nav aria-label="Мобильная навигация">
                <ul role="list" className="flex flex-col">
                  {navItems.map((item, index) => {
                    const isActive = currentPage === item.id;
                    return (
                      <li key={item.id}>
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.28,
                            delay: 0.04 + index * 0.025,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <Link
                            page={item.id}
                            onClick={closeMenu}
                            aria-current={isActive ? 'page' : undefined}
                            className={`flex items-center justify-between border-b border-line-soft py-3.5 text-left text-[16px] transition-colors ${
                              isActive ? 'font-bold text-paper' : 'text-mute hover:text-paper'
                            }`}
                          >
                            <span>{item.label}</span>
                            {isActive ? (
                              <span className="text-[11px] uppercase tracking-[0.14em] text-dim">
                                открыто
                              </span>
                            ) : null}
                          </Link>
                        </motion.div>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-5 flex flex-col gap-3 pt-3">
                <a
                  href={`tel:${siteConfig.phoneHref}`}
                  className="flex h-12 items-center justify-center gap-2 bg-paper px-4 text-[14px] font-bold text-ink"
                >
                  <Phone className="h-4 w-4" />
                  {siteConfig.phone}
                </a>
                <span className="text-center text-[13px] text-dim">
                  Челябинск: {siteConfig.address}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
