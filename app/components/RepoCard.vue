<script setup lang="ts">
import type { Repo } from '#shared/types/content'

defineProps<{ repo: Repo }>()

const languageColors: Record<string, string> = {
  'C++': '#f34b7d',
  'C#': '#178600',
  C: '#555555',
  CMake: '#da3434',
  Rust: '#dea584',
  Python: '#3572a5',
  Shell: '#89e051',
  HTML: '#e34c26',
  CSS: '#663399',
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Vue: '#41b883',
}

const colorOf = (language: string | null) => (language && languageColors[language]) || '#8b949e'
</script>

<template>
  <article class="card repo-card" :class="{ 'repo-card--archived': repo.archived }">
    <div class="repo-card__head">
      <h3 class="repo-card__name">
        <a :href="repo.url" target="_blank" rel="noopener">{{ repo.name }}</a>
      </h3>
      <span v-if="repo.archived" class="badge badge--muted">Archived</span>
    </div>
    <p class="repo-card__desc" :class="{ 'repo-card__desc--empty': !repo.description }">
      {{ repo.description || '説明はまだありません。' }}
    </p>
    <ul class="repo-card__meta">
      <li v-if="repo.language">
        <span class="lang-dot" :style="{ background: colorOf(repo.language) }" aria-hidden="true" />
        {{ repo.language }}
      </li>
      <li v-if="repo.stars > 0" :title="`スター ${repo.stars}`">
        <span aria-hidden="true">★</span> {{ repo.stars }}
      </li>
      <li>
        <time :datetime="repo.pushedAt">{{ repo.pushedAtLabel }}</time> 更新
      </li>
    </ul>
  </article>
</template>
