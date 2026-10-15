<script setup lang="ts">
const { app } = useRuntimeConfig()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container site-footer__inner">
      <p class="site-footer__copy">© {{ year }} yaito3014</p>
      <ul class="site-footer__links">
        <li><a href="https://github.com/yaito3014" target="_blank" rel="noopener">GitHub</a></li>
        <li><a href="https://zenn.dev/yaito3014" target="_blank" rel="noopener">Zenn</a></li>
        <li>
          <a :href="`${app.baseURL}yaitoPages/abeHiroshi/index.html`" title="阿部寛のホームページ風ページ">阿部寛風ページ</a>
        </li>
        <li>
          <a href="https://github.com/yaito3014/yai.to" target="_blank" rel="noopener">ソースコード</a>
        </li>
      </ul>
    </div>
  </footer>
</template>
