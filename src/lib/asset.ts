/**
 * Возвращает путь к файлу из public/ с учётом base URL сборки.
 * Для GitHub Pages base = "/sodeystvie/", для корневого домена — "/".
 */
export const asset = (path: string) => {
  const base = import.meta.env.BASE_URL;
  return `${base}${path.replace(/^\/+/, '')}`;
};
