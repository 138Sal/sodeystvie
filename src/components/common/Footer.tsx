import { OrthodoxCross } from '../icons/OrthodoxCross';
import { useRouter, type PageId } from '../../context/RouterContext';
import { asset } from '../../lib/asset';

const siteLinks: { page: PageId; label: string }[] = [
  { page: 'care', label: 'Благоустройство' },
  { page: 'monuments', label: 'Каталог памятников' },
  { page: 'reviews', label: 'Отзывы' },
  { page: 'contacts', label: 'Контакты и филиалы' },
];

export const Footer = () => {
  const { navigate } = useRouter();

  return (
    <footer className="border-t border-line bg-ink">
      {/* Sleek compact warning banner */}
      <div className="w-full border-b border-line px-5 py-3 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-24">
        <p className="text-[11.5px] leading-relaxed text-dim">
          <span className="font-semibold text-mute">Официальное предупреждение:</span>{' '}
          Остерегайтесь посредников. Сотрудники службы «Содействие» выезжают исключительно по
          прямому звонку родственников. Если к вам без вызова пришёл агент — вы вправе его не впускать.
        </p>
      </div>

      {/* Main compact wide content */}
      <div className="w-full px-5 py-7 sm:px-8 sm:py-8 md:px-10 lg:px-12 xl:px-16 2xl:px-24">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-12 lg:items-start xl:gap-x-12">
          {/* Col 1: Logo & Mission (3 cols) */}
          <div className="lg:col-span-3">
            <button
              type="button"
              onClick={() => navigate('home')}
              className="flex items-center gap-3 text-left transition-opacity hover:opacity-85"
            >
              <OrthodoxCross className="h-6 w-6 shrink-0 text-paper" />
              <div className="flex flex-col">
                <span className="church text-[22px] leading-none tracking-[0.06em] text-paper">
                  СОДЕЙСТВИЕ
                </span>
                <span className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-dim">
                  Челябинск
                </span>
              </div>
            </button>
            <p className="mt-2.5 max-w-[28ch] text-[11.5px] leading-relaxed text-dim">
              Городская ритуальная служба. Полный комплекс от документов до гранитных мемориалов.
            </p>
          </div>

          {/* Col 2: Navigation in 2 columns (4 cols) */}
          <div className="lg:col-span-4">
            <span className="eyebrow block">Разделы сайта</span>
            <ul className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[12.5px]">
              {siteLinks.map((link) => (
                <li key={link.page}>
                  <button
                    type="button"
                    onClick={() => navigate(link.page)}
                    className="text-left text-mute transition-colors hover:text-paper"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contacts (3 cols) */}
          <div className="lg:col-span-3">
            <span className="eyebrow block">Связь</span>
            <div className="mt-2.5 space-y-1.5 text-[12.5px]">
              <div>
                <a
                  href="tel:+79517767747"
                  className="font-bold text-paper transition-colors hover:text-white"
                >
                  +7 (951) 776-77-47
                </a>
                <span className="ml-2 text-[11px] text-dim">WhatsApp / Telegram</span>
              </div>
              <div className="text-[11.5px] text-dim">
                sizareva91@gmail.com
              </div>
            </div>
          </div>

          {/* Col 4: Branches (2 cols) */}
          <div className="lg:col-span-2">
            <span className="eyebrow block">Филиал</span>
            <div className="mt-2.5 space-y-1.5 text-[11.5px]">
              <div>
                <span className="block font-semibold text-paper">ул. 50-летия ВЛКСМ, 22</span>
                <span className="text-dim">10:00–17:00, ежедневно</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-6 flex flex-col gap-2 border-t border-line/60 pt-4 text-[11px] text-dim sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Городская ритуальная служба «Содействие», Челябинск</span>
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>Информация на сайте не является публичной офертой</span>
            <a
              href={asset('/privacy.html')}
              className="text-mute underline decoration-line underline-offset-2 transition-colors hover:text-paper"
            >
              Политика конфиденциальности
            </a>
            <a
              href={asset('/image-credits.html')}
              className="text-mute underline decoration-line underline-offset-2 transition-colors hover:text-paper"
            >
              Источники фотографий
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};
