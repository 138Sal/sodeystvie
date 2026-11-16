import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { useRouter, type PageId } from '../../context/RouterContext';

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  page: PageId;
};

/** Внутренняя ссылка: настоящий href для поиска и Ctrl/средней кнопки, SPA-переход по клику. */
export const Link = ({ page, onClick, children, ...rest }: LinkProps) => {
  const { hrefFor, navigate } = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    navigate(page);
  };

  return (
    <a href={hrefFor(page)} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};
