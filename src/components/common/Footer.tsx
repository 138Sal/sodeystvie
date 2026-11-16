import { OrthodoxCross } from '../icons/OrthodoxCross';
import { Link } from './Link';
import { asset } from '../../lib/asset';
import { siteConfig } from '../../data/site';

const siteLinks = [
  { page: 'funerals' as const, label: 'Похороны' },
  { page: 'care' as const, label: 'Благоустройство' },
  { page: 'monuments' as const, label: 'Каталог памятников' },
  { page: 'reviews' as const, label: 'Отзывы' },
  { page: 'contacts' as const, label: 'Контакты и адрес' },
];

export const Footer = () => {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="w-full border-b border-line px-5 py-3 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-24">
        <p className="text-[12.5px] leading-relaxed text-dim">
          <span className="font-semibold text-mute">Официальное предупреждение:</span>{' '}
          Остерегайтесь посредников. Сотрудники службы «Содействие» выезжают исключительно по
          прямому звонку родственников. Если к вам без вызова пришёл агент — вы вправе его не впускать.
        </p>
      </div>

      <div className="w-full px-5 py-7 sm:px-8 sm:py-8 md:px-10 lg:px-12 xl:px-16 2xl:px-24">
        <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-12 lg:items-start xl:gap-x-12">
          <div className="lg:col-span-3">
            <Link
              page="home"
              className="flex items-center gap-3 text-left transition-opacity hover:opacity-85"
            >
              <OrthodoxCross className="h-6 w-6 shrink-0 text-paper" />
              <div className="flex flex-col">
                <span className="church text-[22px] leading-[1.2] tracking-[0.06em] text-paper">
                  СОДЕЙСТВИЕ
                </span>
                <span className="mt-0.5 text-[10.5px] uppercase tracking-[0.16em] text-dim">
                  Челябинск
                </span>
              </div>
            </Link>
            <p className="mt-3 max-w-[30ch] text-[13px] leading-relaxed text-dim">
              Ритуальная служба полного цикла: от документов и перевозки до гранитных
              мемориалов. Работаем в Челябинске и по всей России.
            </p>
          </div>

          <div className="lg:col-span-4">
            <span className="eyebrow block">Разделы сайта</span>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-[13.5px]">
              {siteLinks.map((link) => (
                <li key={link.page}>
                  <Link
                    page={link.page}
                    className="text-left text-mute transition-colors hover:text-paper"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <span className="eyebrow block">Связь</span>
            <div className="mt-3 space-y-2 text-[13.5px]">
              <div>
                <a
                  href={`tel:${siteConfig.phoneHref}`}
                  className="font-bold text-paper transition-colors hover:text-white"
                >
                  {siteConfig.phone}
                </a>
                <span className="ml-2 text-[12px] text-dim">WhatsApp / Telegram</span>
              </div>
              <div className="text-[12.5px] text-dim">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors hover:text-paper"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <span className="eyebrow block">Адрес</span>
            <div className="mt-3 space-y-1.5 text-[12.5px]">
              <div>
                <span className="block font-semibold text-paper">{siteConfig.address}</span>
                <span className="text-dim">{siteConfig.hours}</span>
              </div>
              <div className="text-dim">Выезд по всей России</div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-line/60 pt-4 text-[12px] text-dim sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 {siteConfig.name}, Челябинск</span>
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
