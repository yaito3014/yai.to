<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  moreTo?: string
  moreLabel?: string
}>()
</script>

<template>
  <div class="section-heading">
    <div>
      <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
      <h2 class="section-heading__title">{{ title }}</h2>
    </div>
    <NuxtLink v-if="moreTo" :to="moreTo" class="section-heading__more">
      {{ moreLabel ?? 'すべて見る' }} <span aria-hidden="true">→</span>
    </NuxtLink>
  </div>
</template>
