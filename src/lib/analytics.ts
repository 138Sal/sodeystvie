declare global {
  interface Window {
    ym?: ((...args: unknown[]) => void) & { a?: unknown[][] };
  }
}

const YM_ID = import.meta.env.VITE_YM_ID as string | undefined;
let initialized = false;

/** Подключает Яндекс.Метрику, только если в окружении задан VITE_YM_ID. */
export const initAnalytics = () => {
  if (!YM_ID || initialized || typeof window === 'undefined') return;
  initialized = true;

  const stub = (...args: unknown[]) => {
    const target = window.ym;
    if (!target) return;
    target.a = target.a ?? [];
    target.a.push(args);
  };
  window.ym = window.ym ?? stub;

  window.ym(YM_ID, 'init', {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
  });

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://mc.yandex.ru/metrika/tag.js';
  document.head.appendChild(script);

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const link = target.closest<HTMLAnchorElement>('a[href]');
    if (!link) return;
    const href = link.getAttribute('href') ?? '';
    if (href.startsWith('tel:')) trackGoal('phone_click');
    else if (href.includes('wa.me')) trackGoal('whatsapp_click');
    else if (href.includes('t.me')) trackGoal('telegram_click');
  });
};

export const trackGoal = (goal: string, params?: Record<string, unknown>) => {
  if (!YM_ID || !window.ym) return;
  window.ym(YM_ID, 'reachGoal', goal, params ?? {});
};

export const trackPageView = (url: string, title: string) => {
  if (!YM_ID || !window.ym) return;
  window.ym(YM_ID, 'hit', url, { title });
};
