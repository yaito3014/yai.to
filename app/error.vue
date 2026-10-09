<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const isNotFound = computed(() => props.error.statusCode === 404)

useHead({ title: isNotFound.value ? 'ページが見つかりません' : 'エラー' })
</script>

<template>
  <NuxtLayout>
    <div class="container page error-page">
      <p class="eyebrow">{{ error.statusCode }}</p>
      <h1>{{ isNotFound ? 'ページが見つかりません' : 'エラーが発生しました' }}</h1>
      <p class="page-header__lead">
        {{ isNotFound ? 'お探しのページは移動したか、削除された可能性があります。' : error.statusMessage }}
      </p>
      <button type="button" class="button" @click="clearError({ redirect: '/' })">ホームへ戻る</button>
    </div>
  </NuxtLayout>
</template>
