import type { Post } from '#shared/types/content'
import { formatDateJa } from '#shared/utils/date'

const FEED_URL = 'https://zenn.dev/yaito3014/feed'

function pick(block: string, tag: string): string {
  // `[^]` matches any character including newlines.
  const match = block.match(new RegExp('<' + tag + '(?:\\s[^>]*)?>([^]*?)</' + tag + '>'))
  if (!match) return ''
  return match[1].replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/, '$1').trim()
}

function decodeEntities(text: string): string {
  return text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
}

export default defineEventHandler(async (): Promise<Post[]> => {
  const xml = await $fetch<string>(FEED_URL, {
    responseType: 'text',
    headers: { 'User-Agent': 'yai.to' },
  })

  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1])

  return items
    .map((block): Post | null => {
      const url = pick(block, 'link')
      const pubDate = new Date(pick(block, 'pubDate'))
      if (!url || Number.isNaN(pubDate.getTime())) return null
      const publishedAt = pubDate.toISOString()
      return {
        title: decodeEntities(pick(block, 'title')),
        description: decodeEntities(pick(block, 'description')),
        url,
        kind: url.includes('/books/') ? 'book' : 'article',
        publishedAt,
        publishedAtLabel: formatDateJa(publishedAt),
      }
    })
    .filter((p): p is Post => p !== null)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
})
