<script setup lang="ts">
const links = [
  { to: '/', label: 'ホーム' },
  { to: '/projects', label: 'Projects' },
  { to: '/writing', label: 'Writing' },
]
</script>

<template>
  <header class="site-header">
    <div class="container site-header__inner">
      <NuxtLink to="/" class="brand" aria-label="yai.to ホーム">
        yai<span class="brand__dot">.</span>to
      </NuxtLink>
      <div class="site-header__right">
        <nav class="site-nav" aria-label="メインナビゲーション">
          <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="site-nav__link">
            {{ link.label }}
          </NuxtLink>
        </nav>
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>
