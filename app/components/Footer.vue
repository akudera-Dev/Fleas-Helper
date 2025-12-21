<template>
  <footer class="container">
    <div class="footer-inner">
      <p class="copyright">
        Site design and code ©
        <time datetime="2025">2025</time>
        by
        <a href="https://github.com/akudera" target="_blank">akudera</a>
      </p>
      <p class="evaluation">
        Give
        <IconsStar width="25" />
        to project on
        <a href="https://github.com/akudera-Dev/Fleas-Helper" target="_blank">GitHub</a>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use "@/styles/mixins.scss" as *;

footer {
  padding-top: 25px;
  margin-top: auto;
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  row-gap: 8px;
  @include plate-style;
  padding: 24px 20px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  color: var(--color-text-primary);
  font-family: var(--font-primary);

  & p {
    display: inline-block;
    margin: 0;

    & svg {
      vertical-align: middle;
    }
  }

  & a {
    color: currentColor;
    transition: color var(--transition-duration);

    @include hover {
      color: var(--color-text-hover);
    }
  }
}

@media (max-width: 600px) {
  .footer-inner {
    flex-wrap: wrap;

    & p {
      width: 100%;

      &.evaluation {
        text-align: right;
      }
    }
  }
}

@media (max-width: 400px) {
  .footer-inner {
    p.evaluation {
      text-align: left;
    }
  }
}
</style>
