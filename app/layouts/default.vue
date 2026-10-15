<template>
  <div class="site">
    <a class="skip-link" href="#main">本文へスキップ</a>
    <SiteHeader />
    <main id="main" class="site-main">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
