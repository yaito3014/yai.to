import type { Repo } from '#shared/types/content'
import { formatDateJa } from '#shared/utils/date'

const GITHUB_USER = 'yaito3014'

interface GitHubRepo {
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  pushed_at: string
  archived: boolean
  fork: boolean
  topics?: string[]
}

export default defineEventHandler(async (event): Promise<Repo[]> => {
  const { githubToken } = useRuntimeConfig(event)
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'yai.to',
  }
  if (githubToken) headers.Authorization = `Bearer ${githubToken}`

  const raw = await $fetch<GitHubRepo[]>(`https://api.github.com/users/${GITHUB_USER}/repos`, {
    query: { per_page: 100, sort: 'pushed' },
    headers,
  })

  return raw
    .filter((r) => !r.fork)
    .map((r) => ({
      name: r.name,
      description: r.description,
      url: r.html_url,
      homepage: r.homepage || null,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      pushedAt: r.pushed_at,
      pushedAtLabel: formatDateJa(r.pushed_at),
      archived: r.archived,
      topics: r.topics ?? [],
    }))
})
