interface IconProps {
  className?: string;
  size?: number | string;
}

/**
 * Конверт — «заявка/письмо». Рисуется вручную, штрихом, под стиль сайта.
 */
export const EnvelopeIcon = ({ className = 'h-4 w-4', size = 16 }: IconProps) => (
  <svg
    role="img"
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2.75" y="5" width="18.5" height="14" rx="2.25" />
    <path d="M3.4 6.6 12 13.1l8.6-6.5" />
  </svg>
);
