export interface Repo {
  name: string
  description: string | null
  url: string
  homepage: string | null
  language: string | null
  stars: number
  forks: number
  pushedAt: string
  pushedAtLabel: string
  archived: boolean
  topics: string[]
}

export type PostKind = 'book' | 'article'

export interface Post {
  title: string
  description: string
  url: string
  kind: PostKind
  publishedAt: string
  publishedAtLabel: string
}
