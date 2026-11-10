import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Phone } from 'lucide-react';
import { OrthodoxCross } from '../icons/OrthodoxCross';
import { useRouter, type PageId } from '../../context/RouterContext';

export interface NavItem {
  id: PageId;
  label: string;
}

export const navItems: NavItem[] = [
  { id: 'home', label: 'Главная' },
  { id: 'care', label: 'Благоустройство' },
  { id: 'monuments', label: 'Памятники' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'contacts', label: 'Контакты' },
];

export const Header = () => {
  const { currentPage, navigate } = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSelect = (page: PageId) => {
    navigate(page);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/95 backdrop-blur-md">
      <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-24">
        <div className="flex h-[80px] items-center justify-between gap-6 sm:h-[88px] 2xl:h-[96px]">
          {/* Logo — strict architectural lockup */}
          <button
            type="button"
            onClick={() => handleSelect('home')}
            className="flex items-center gap-3.5 text-left transition-opacity hover:opacity-85 sm:gap-4"
          >
            <span className="flex h-11 shrink-0 items-center">
              <OrthodoxCross className="h-8 w-8 text-paper sm:h-9 sm:w-9" />
            </span>
            <span className="h-9 w-px bg-line sm:h-10" aria-hidden="true" />
            <span className="flex flex-col justify-center">
              <span className="church text-[20px] leading-none tracking-[0.06em] text-paper sm:text-[23px] 2xl:text-[25px]">
                СОДЕЙСТВИЕ
              </span>
              <span className="mt-1.5 text-[9.5px] font-medium uppercase tracking-[0.24em] text-dim 2xl:text-[10.5px]">
                Ритуальная служба · Челябинск
              </span>
            </span>
          </button>

          {/* Desktop tabs */}
          <nav
            role="tablist"
            aria-label="Разделы сайта"
            className="hidden items-center gap-7 xl:flex 2xl:gap-10"
          >
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleSelect(item.id)}
                  className={`relative px-3 py-2.5 text-[14.5px] transition-colors 2xl:px-4 2xl:text-[16px] ${
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
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Phone */}
          <div className="hidden items-center gap-4 xl:flex">
            <a
              href="tel:+79517767747"
              className="group inline-flex items-center gap-2.5 text-[14px] font-bold text-paper 2xl:text-[15.5px]"
            >
              <Phone className="h-3.5 w-3.5 shrink-0 text-dim transition-colors group-hover:text-paper" />
              <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-paper/40">
                +7 (951) 776-77-47
              </span>
            </a>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-5 xl:hidden">
            <a
              href="tel:+79517767747"
              aria-label="Позвонить: +7 (951) 776-77-47"
              className="flex h-11 items-center gap-2 text-[13px] font-semibold text-paper transition-opacity hover:opacity-70"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">Позвонить</span>
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={mobileOpen}
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

      {/* Mobile drawer */}
      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-ink xl:hidden"
          >
            <motion.div
              initial={{ y: -8 }}
              animate={{ y: 0 }}
              exit={{ y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full px-5 py-5 sm:px-8"
            >
              <nav className="flex flex-col">
                {navItems.map((item, index) => {
                  const isActive = currentPage === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelect(item.id)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.28,
                        delay: 0.04 + index * 0.025,
                        ease: [0.16, 1, 0.3, 1],
                      }}
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
                    </motion.button>
                  );
                })}
              </nav>

              <div className="mt-5 flex flex-col gap-3 pt-3">
                <a
                  href="tel:+79517767747"
                  className="flex h-12 items-center justify-center gap-2 bg-paper px-4 text-[14px] font-bold text-ink"
                >
                  <Phone className="h-4 w-4" />
                  +7 (951) 776-77-47
                </a>
                <span className="text-center text-[12px] text-dim">
                  Челябинск: ул. 50-летия ВЛКСМ 22
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
