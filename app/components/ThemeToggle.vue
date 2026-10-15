<script setup lang="ts">
const { preference, cycle } = useTheme()

const labels = {
  auto: 'テーマ: 自動（システム設定に従う）',
  light: 'テーマ: ライト',
  dark: 'テーマ: ダーク',
} as const

const label = computed(() => labels[preference.value])
</script>

<template>
  <button type="button" class="theme-toggle" :title="label" :aria-label="`${label}。クリックで切り替え`" @click="cycle">
    <!-- auto: half-filled circle -->
    <svg v-if="preference === 'auto'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none" />
    </svg>
    <!-- light: sun -->
    <svg v-else-if="preference === 'light'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
    <!-- dark: moon -->
    <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
    </svg>
  </button>
</template>
