/** Invalid pagination is a missing resource, not another copy of page one. */
export function parseBlogPage(value?: string): number | null {
  if (value === undefined) return 1;
  if (!/^[1-9]\d*$/.test(value)) return null;
  const page = Number(value);
  return Number.isSafeInteger(page) ? page : null;
}
