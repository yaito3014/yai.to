<script setup lang="ts">
import type { Post } from '#shared/types/content'

defineProps<{ post: Post }>()
</script>

<template>
  <article class="card post-card">
    <div class="post-card__head">
      <span class="badge" :class="post.kind === 'book' ? 'badge--book' : 'badge--article'">
        {{ post.kind === 'book' ? '本' : '記事' }}
      </span>
      <time :datetime="post.publishedAt" class="post-card__date">{{ post.publishedAtLabel }}</time>
    </div>
    <h3 class="post-card__title">
      <a :href="post.url" target="_blank" rel="noopener">{{ post.title }}</a>
    </h3>
    <p v-if="post.description" class="post-card__desc">{{ post.description }}</p>
  </article>
</template>
