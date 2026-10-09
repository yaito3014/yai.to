const formatter = new Intl.DateTimeFormat('ja-JP', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'Asia/Tokyo',
})

/** ISO 8601 文字列を「2026年6月10日」形式に整形する。無効な日付なら空文字。 */
export function formatDateJa(iso: string): string {
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? '' : formatter.format(date)
}
