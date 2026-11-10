/**
 * Возвращает путь к файлу из public/ с учётом base URL сборки.
 * При обычной сборке base = "/", при публикации в подкаталоге — "/apps/sodeystvie/".
 */
export const asset = (path: string) => {
  const base = import.meta.env.BASE_URL;
  return `${base}${path.replace(/^\/+/, '')}`;
};
