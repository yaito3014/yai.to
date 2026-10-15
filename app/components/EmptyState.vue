<script setup lang="ts">
defineProps<{
  message: string
  linkHref: string
  linkLabel: string
}>()
</script>

<template>
  <div class="empty-state">
    <p>{{ message }}</p>
    <a class="button button--ghost" :href="linkHref" target="_blank" rel="noopener">{{ linkLabel }}</a>
  </div>
</template>
