<script setup lang="ts">
useSeoMeta({
  title: 'Projects',
  description: 'yaito3014 が GitHub で公開しているプロジェクトの一覧。',
  ogTitle: 'Projects | yai.to',
})

const { data: repos, error } = await useFetch('/api/repos', { default: () => [] })

type SortKey = 'pushed' | 'stars' | 'name'
const sortKey = ref<SortKey>('pushed')
const language = ref<string | null>(null)
const showArchived = ref(false)

const languages = computed(() => {
  const counts = new Map<string, number>()
  for (const repo of repos.value) {
    if (repo.language) counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1)
  }
  return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
})

const visible = computed(() => {
  const list = repos.value.filter(
    (r) => (showArchived.value || !r.archived) && (!language.value || r.language === language.value),
  )
  switch (sortKey.value) {
    case 'stars':
      return list.sort((a, b) => b.stars - a.stars || b.pushedAt.localeCompare(a.pushedAt))
    case 'name':
      return list.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return list.sort((a, b) => b.pushedAt.localeCompare(a.pushedAt))
  }
})

const archivedCount = computed(() => repos.value.filter((r) => r.archived).length)
</script>

<template>
  <div class="container page">
    <header class="page-header">
      <p class="eyebrow">Projects</p>
      <h1>プロジェクト</h1>
      <p class="page-header__lead">
        GitHub で公開しているリポジトリの一覧です（フォークを除く）。ビルド時に GitHub API から取得しています。
      </p>
    </header>

    <template v-if="repos.length">
      <div class="toolbar">
        <div class="chip-row" role="group" aria-label="言語で絞り込み">
          <button type="button" class="chip" :class="{ 'chip--active': language === null }" @click="language = null">
            すべて
          </button>
          <button
            v-for="[lang, count] in languages"
            :key="lang"
            type="button"
            class="chip"
            :class="{ 'chip--active': language === lang }"
            @click="language = language === lang ? null : lang"
          >
            {{ lang }} <span class="chip__count">{{ count }}</span>
          </button>
        </div>
        <div class="toolbar__controls">
          <label class="checkbox">
            <input v-model="showArchived" type="checkbox" />
            アーカイブ済みも表示 ({{ archivedCount }})
          </label>
          <label class="select">
            <span class="sr-only">並び順</span>
            <select v-model="sortKey">
              <option value="pushed">更新が新しい順</option>
              <option value="stars">スターが多い順</option>
              <option value="name">名前順</option>
            </select>
          </label>
        </div>
      </div>

      <p class="result-count">{{ visible.length }} 件</p>

      <div class="card-grid">
        <RepoCard v-for="repo in visible" :key="repo.name" :repo="repo" />
      </div>
    </template>

    <EmptyState
      v-else
      :message="error ? 'GitHub からの取得に失敗しました。' : 'プロジェクトはまだありません。'"
      link-href="https://github.com/yaito3014?tab=repositories"
      link-label="GitHub で見る"
    />
  </div>
</template>
