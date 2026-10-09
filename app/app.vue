<script setup lang="ts">
const { app } = useRuntimeConfig()

useHead({
  link: [{ rel: 'icon', type: 'image/svg+xml', href: `${app.baseURL}favicon.svg` }],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
