import { ArrowLeft, Phone } from 'lucide-react';
import { Link } from '../common/Link';
import { siteConfig } from '../../data/site';

export const NotFoundSection = () => {
  return (
    <section className="py-20 sm:py-28">
      <div className="wrap max-w-[760px]">
        <span className="eyebrow">404</span>
        <h1 className="mt-4 text-[clamp(30px,5vw,56px)] font-bold leading-tight tracking-tight text-paper focus:outline-none">
          Страница не найдена
        </h1>
        <p className="prose-muted mt-5">
          Возможно, адрес устарел или в ссылке опечатка. Вернитесь на главную или
          позвоните в диспетчерскую — подскажем, куда обратиться.
        </p>
        <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
          <Link page="home" className="action action--lg">
            <ArrowLeft className="h-4 w-4" />
            На главную
          </Link>
          <a href={`tel:${siteConfig.phoneHref}`} className="action action--muted">
            <Phone className="h-4 w-4" />
            {siteConfig.phone}
          </a>
        </div>
        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-6">
          <Link page="funerals" className="action action--sm action--muted">
            Похороны
          </Link>
          <Link page="monuments" className="action action--sm action--muted">
            Памятники
          </Link>
          <Link page="care" className="action action--sm action--muted">
            Благоустройство
          </Link>
          <Link page="contacts" className="action action--sm action--muted">
            Контакты
          </Link>
        </div>
      </div>
    </section>
  );
};
