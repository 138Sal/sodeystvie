# Содействие — сайт ритуальной службы

Статический сайт-визитка и каталог услуг: организация похорон, памятники,
благоустройство захоронений. Челябинск и вся Россия.

Стек: React 19, TypeScript, Vite 8, Tailwind CSS 4, Motion, lucide-react.
Сборка статическая, без бэкенда; заявки уходят напрямую в Web3Forms.

## Быстрый старт

```bash
npm ci
npm run dev          # http://localhost:5173/
npm run build        # images + tsc + vite build + prerender
npm run preview      # локальный просмотр dist
npm run lint
npm test
```

`npm run build` собирает production-версию в `dist/` и пререндерит все
страницы в отдельные HTML-файлы. Без Chrome можно собрать только SPA:

```bash
SKIP_PRERENDER=1 npm run build
```

## Страницы и URL

| Страница | URL |
|---|---|
| Главная | `/` |
| Похороны | `/funerals/` |
| Благоустройство | `/care/` |
| Памятники | `/monuments/` |
| Отзывы | `/reviews/` |
| Контакты | `/contacts/` |

Навигация — обычные ссылки + `history.pushState`; hash-роутер удалён.
Для GitHub Pages base задаётся в `.env.production` (`VITE_BASE=/sodeystvie/`).
Для отдельного домена поставьте `VITE_BASE=/` и обновите `siteUrl`
в `site.config.json`.

## Контент и контакты

- `site.config.json` — единый источник телефона, адреса, почты, координат,
  ссылок на 2ГИС/Яндекс. Не дублируйте контакты в компонентах.
- `src/data/content.ts` — отзывы, кладбища, услуги, цены, команда, работы.
- `site.config.json` → `priceFrom` — цена «от» на странице похорон (одно место для замены).
  Значение `priceRange` в JSON-LD внутри `index.html` при смене цены тоже обновите.
- `src/components/sections/FuneralSection.tsx` — страница «Похороны».
- Старые URL `/services/`, `/calculator/`, `/info/`, `/articles/` получают
  статические redirect-заглушки с canonical на новые разделы.

## SEO

- `src/lib/seo.ts` — title/description/canonical/OG/JSON-LD для каждого маршрута.
- `scripts/prerender.mjs` — рендерит страницы в `dist/*/index.html`,
  генерирует `sitemap.xml` и `robots.txt`.
- `index.html` содержит разметку `FuneralHome` (LocalBusiness) и `noscript`-fallback.
- `siteUrl` в `site.config.json` влияет на canonical, OG и sitemap.

## Изображения

Исходники лежат в `assets-src/images`. Скрипт `npm run images` создаёт:

- адаптивные AVIF/WebP 480/960/1600 px в `public/images`;
- маленькие превью для `image-credits.html`;
- `og-image.jpg` 1200×630 и `apple-touch-icon.png`;
- `src/data/images.generated.ts` — манифест для компонента `<Picture>`.

Компонент `<Picture>` отдаёт `<picture>` с AVIF/WebP и `srcset`, поэтому
на телефоне грузится вариант 480 px, а на десктопе — 960/1600.

> Исходники трёх фото работ с читаемыми именами лежат локально в
> `photos-to-blur/` (папка в `.gitignore`). После обработки замените
> `assets-src/images/funeral-*.jpg` и запустите `npm run images`.

## Аналитика

Яндекс.Метрика подключается только при заданном `VITE_YM_ID`:

```bash
VITE_YM_ID=12345678 npm run build
```

Цели: `lead_form_success`, `phone_click`, `whatsapp_click`, `telegram_click`.
Без ID никакие внешние скрипты не загружаются.

## Заявки

Форма отправляет `multipart/form-data` прямо в Web3Forms с публичным
access key. Прокси `/api/lead` удалён вместе с локальным сервером:
на статическом хостинге он не нужен, а открытый прокси позволял спамить.

## Деплой

Пуш в `main` запускает `.github/workflows/deploy.yml`:
линт, тесты, `npm run build`, публикация `dist` в ветку `gh-pages`.
В настройках репозитория Pages должен быть выбран источник «Deploy from a branch»
→ `gh-pages` → `/ (root)`.

Для Метрики в CI добавьте repository variable `VITE_YM_ID`.

## Проверки

- `npm run lint` — oxlint.
- `npm test` — unit-тесты (формат телефона, разбор URL).
- `npm run build` — типы + сборка + пререндер.

## Лицензии

Шрифты Manrope, Oswald — SIL OFL; Konstruktor и SPSL RussiaChurch — по
лицензиям правообладателей. Фотографии кладбищ — Wikimedia Commons,
авторы и лицензии перечислены в `public/image-credits.html`.
