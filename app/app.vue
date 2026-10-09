<script setup lang="ts">
const { app } = useRuntimeConfig()

useHead({
  link: [
    { rel: 'icon', href: `${app.baseURL}favicon.ico`, sizes: '48x48' },
    { rel: 'icon', type: 'image/png', href: `${app.baseURL}favicon.png`, sizes: '64x64' },
    { rel: 'apple-touch-icon', href: `${app.baseURL}apple-touch-icon.png`, sizes: '180x180' },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
