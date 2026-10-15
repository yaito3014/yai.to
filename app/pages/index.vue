<script setup lang="ts">
import avatar from '~/assets/img/avatar.jpg'

const description =
  '掛山夜糸（yaito3014）の個人サイト。C++ を中心としたライブラリ・ツールの開発と、Zenn での技術記事執筆について。'

useHead({ title: 'yai.to | 掛山夜糸', titleTemplate: '%s' })
useSeoMeta({
  description,
  ogTitle: 'yai.to | 掛山夜糸',
  ogDescription: description,
})

const { data: repos, error: reposError } = await useFetch('/api/repos', { default: () => [] })
const { data: posts, error: postsError } = await useFetch('/api/zenn', { default: () => [] })

const featured = computed(() =>
  [...repos.value]
    .filter((r) => !r.archived)
    .sort((a, b) => b.stars - a.stars || b.pushedAt.localeCompare(a.pushedAt))
    .slice(0, 6),
)

const latestPosts = computed(() => posts.value.slice(0, 3))
</script>

<template>
  <div>
    <section class="hero">
      <div class="container hero__inner">
        <img :src="avatar" alt="" class="hero__avatar" width="160" height="160" />
        <div class="hero__body">
          <p class="eyebrow">Kakeyama Yaito</p>
          <h1 class="hero__title">掛山夜糸</h1>
          <p class="hero__handle">@yaito3014</p>
          <p class="hero__lead">
            C++ を中心に、ライブラリや開発ツールを作っています。<br class="br-wide" />
            Zenn では C++23 入門シリーズなどの技術記事を書いています。
          </p>
          <div class="hero__actions">
            <a class="button" href="https://github.com/yaito3014" target="_blank" rel="noopener">GitHub</a>
            <a class="button button--ghost" href="https://zenn.dev/yaito3014" target="_blank" rel="noopener">Zenn</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <SectionHeading eyebrow="Projects" title="主なプロジェクト" more-to="/projects" />
        <div v-if="featured.length" class="card-grid">
          <RepoCard v-for="repo in featured" :key="repo.name" :repo="repo" />
        </div>
        <EmptyState
          v-else
          :message="reposError ? 'GitHub からの取得に失敗しました。' : 'プロジェクトはまだありません。'"
          link-href="https://github.com/yaito3014?tab=repositories"
          link-label="GitHub で見る"
        />
      </div>
    </section>

    <section class="section section--alt">
      <div class="container">
        <SectionHeading eyebrow="Writing" title="最近の記事" more-to="/writing" />
        <div v-if="latestPosts.length" class="card-grid card-grid--wide">
          <ArticleCard v-for="post in latestPosts" :key="post.url" :post="post" />
        </div>
        <EmptyState
          v-else
          :message="postsError ? 'Zenn からの取得に失敗しました。' : '記事はまだありません。'"
          link-href="https://zenn.dev/yaito3014"
          link-label="Zenn で見る"
        />
      </div>
    </section>

    <section class="section">
      <div class="container">
        <SectionHeading eyebrow="Links" title="リンク" />
        <ul class="link-list">
          <li>
            <a href="https://github.com/yaito3014" target="_blank" rel="noopener">
              <span class="link-list__label">GitHub</span>
              <span class="link-list__desc">ソースコードと開発中のプロジェクト</span>
            </a>
          </li>
          <li>
            <a href="https://zenn.dev/yaito3014" target="_blank" rel="noopener">
              <span class="link-list__label">Zenn</span>
              <span class="link-list__desc">C++ を中心とした技術記事と本</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
