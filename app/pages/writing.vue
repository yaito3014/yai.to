<script setup lang="ts">
useSeoMeta({
  title: 'Writing',
  description: 'yaito3014 が Zenn で公開している技術記事と本の一覧。',
  ogTitle: 'Writing | yai.to',
})

const { data: posts, error } = await useFetch('/api/zenn', { default: () => [] })

const books = computed(() => posts.value.filter((p) => p.kind === 'book'))
const articles = computed(() => posts.value.filter((p) => p.kind === 'article'))
</script>

<template>
  <div class="container page">
    <header class="page-header">
      <p class="eyebrow">Writing</p>
      <h1>記事と本</h1>
      <p class="page-header__lead">
        Zenn で公開している技術記事と本です。ビルド時に Zenn のフィードから取得しています。
      </p>
    </header>

    <template v-if="posts.length">
      <section v-if="books.length" class="subsection">
        <h2 class="subsection__title">本</h2>
        <div class="card-grid card-grid--wide">
          <ArticleCard v-for="post in books" :key="post.url" :post="post" />
        </div>
      </section>

      <section v-if="articles.length" class="subsection">
        <h2 class="subsection__title">記事</h2>
        <div class="card-grid card-grid--wide">
          <ArticleCard v-for="post in articles" :key="post.url" :post="post" />
        </div>
      </section>
    </template>

    <EmptyState
      v-else
      :message="error ? 'Zenn からの取得に失敗しました。' : '記事はまだありません。'"
      link-href="https://zenn.dev/yaito3014"
      link-label="Zenn で見る"
    />
  </div>
</template>
