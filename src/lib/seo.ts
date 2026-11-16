import { siteConfig } from '../data/site';
import { canonicalPath, routeById, type PageId } from './routes';

interface PageMeta {
  title: string;
  description: string;
  noindex?: boolean;
}

const metadata: Record<PageId, PageMeta> = {
  home: {
    title: 'Ритуальная служба «Содействие» в Челябинске — похороны и памятники',
    description:
      'Организация похорон, изготовление и установка памятников, благоустройство захоронений. Челябинск и вся Россия. Диспетчерская: +7 (951) 776-77-47.',
  },
  funerals: {
    title: `Организация похорон в Челябинске и по всей России — от ${siteConfig.priceFrom} ₽ | Содействие`,
    description: `Похороны под ключ от ${siteConfig.priceFrom} ₽: документы, транспорт, прощание, погребение. Выездная бригада, работаем в Челябинске и по всей России. Позвоните: ${siteConfig.phone}.`,
  },
  care: {
    title: 'Благоустройство захоронений и монтаж памятников в Челябинске | Содействие',
    description:
      'Бетонирование, плитка, ограды, гранитные стелы и реставрация памятников. Работаем на кладбищах Челябинска и области. Гарантия 3 года.',
  },
  monuments: {
    title: 'Изготовление памятников из гранита и мрамора в Челябинске — цены | Содействие',
    description:
      'Каталог памятников из карельского габбро-диабаза и уфалейского мрамора: стелы, кресты, семейные мемориалы. Бесплатный 3D-макет, доставка и монтаж.',
  },
  reviews: {
    title: 'Отзывы о ритуальной службе «Содействие» — Челябинск',
    description:
      'Реальные отзывы семей о службе «Содействие» на Яндекс.Картах и 2ГИС: организация похорон, памятники, благоустройство. Рейтинг 5.0 и 4.9.',
  },
  contacts: {
    title: 'Контакты ритуальной службы «Содействие» — Челябинск',
    description:
      'Диспетчерская: +7 (951) 776-77-47. Адрес выставочного зала: Челябинск, ул. 50-летия ВЛКСМ, 22. Работаем по всей России.',
  },
  notfound: {
    title: 'Страница не найдена — Содействие',
    description: 'Такой страницы нет. Перейдите на главную или позвоните в диспетчерскую.',
    noindex: true,
  },
};

const setMeta = (attribute: 'name' | 'property', key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const setLink = (rel: string, href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
};

const setJsonLd = (data: Record<string, unknown>) => {
  let element = document.getElementById('page-schema') as HTMLScriptElement | null;
  if (!element) {
    element = document.createElement('script');
    element.id = 'page-schema';
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(data);
};

/** Обновляет title, description, canonical, OG и JSON-LD для текущей страницы. */
export const applySeo = (page: PageId) => {
  const meta = metadata[page];
  const path = canonicalPath(page);
  const isNotFound = page === 'notfound';
  const url = isNotFound ? `${siteConfig.siteUrl}/404.html` : `${siteConfig.siteUrl}${path}`;
  const image = `${siteConfig.siteUrl}/og-image.jpg`;
  const route = routeById(page);

  document.title = meta.title;
  setMeta('name', 'description', meta.description);
  setMeta('name', 'robots', meta.noindex ? 'noindex, follow' : 'index, follow');
  setMeta('property', 'og:type', 'website');
  setMeta('property', 'og:site_name', siteConfig.name);
  setMeta('property', 'og:locale', 'ru_RU');
  setMeta('property', 'og:title', meta.title);
  setMeta('property', 'og:description', meta.description);
  setMeta('property', 'og:url', url);
  setMeta('property', 'og:image', image);
  setMeta('property', 'og:image:width', '1200');
  setMeta('property', 'og:image:height', '630');
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', meta.title);
  setMeta('name', 'twitter:description', meta.description);
  setMeta('name', 'twitter:image', image);
  setLink('canonical', isNotFound ? `${siteConfig.siteUrl}/404.html` : url);

  document.documentElement.dataset.page = page;

  if (isNotFound) {
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: meta.title,
      url,
      isPartOf: { '@type': 'WebSite', name: siteConfig.name, url: `${siteConfig.siteUrl}/` },
    });
    return;
  }

  setJsonLd({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: route?.label ? `${route.label} — ${siteConfig.name}` : siteConfig.name,
    description: meta.description,
    url,
    inLanguage: 'ru-RU',
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.name,
      url: `${siteConfig.siteUrl}/`,
    },
    about: {
      '@type': 'FuneralHome',
      name: siteConfig.name,
      telephone: siteConfig.phone,
      url: `${siteConfig.siteUrl}/`,
    },
    primaryImageOfPage: { '@type': 'ImageObject', url: image },
  });
};
