import { asset } from '../../lib/asset';
import { images, type ImageName } from '../../data/images.generated';

interface PictureProps {
  name: ImageName;
  alt: string;
  sizes?: string;
  className?: string;
  pictureClassName?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

/**
 * Отдаёт AVIF/WebP с srcset и сохраняет пропорции.
 * display: contents на <picture>, чтобы классы позиционирования работали на <img>.
 */
export const Picture = ({
  name,
  alt,
  sizes = '100vw',
  className,
  pictureClassName = 'contents',
  priority = false,
  width,
  height,
}: PictureProps) => {
  const image = images[name];
  const srcSet = (format: 'avif' | 'webp') =>
    image.sources.map((source) => `${asset(source[format])} ${source.width}w`).join(', ');

  return (
    <picture className={pictureClassName}>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img
        src={asset(image.src)}
        alt={alt}
        width={width ?? image.width}
        height={height ?? image.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={className}
      />
    </picture>
  );
};
