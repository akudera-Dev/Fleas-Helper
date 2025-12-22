<template>
  <footer class="container">
    <div class="footer-inner">
      <p>
        Site design and code © <time datetime="2025">2025</time> by
        <a href="https://github.com/akudera" target="_blank">akudera</a>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use '@/styles/mixins.scss' as *;

footer {
  padding-top: 25px;
  margin-top: auto;
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  @include plate-style;
  padding: 24px 20px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  color: var(--color-text-primary);
  font-family: var(--font-primary);

  & a {
    color: currentColor;
    transition: color var(--transition-duration);

    @include hover {
      color: var(--color-accent);
    }
  }
}
</style>
