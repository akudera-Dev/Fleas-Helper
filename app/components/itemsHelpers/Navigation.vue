<template>
  <nav class="navigation">
    <NuxtLink to="/fleas" class="link">Fleas</NuxtLink>
    <NuxtLink to="/masks" class="link">Mask Shards</NuxtLink>
  </nav>
</template>

<style scoped lang="scss">
@use "~/styles/mixins.scss" as *;

.navigation {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-family: var(--font-accent);
}

.link {
  @include fluid-text(18, 20);
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color var(--transition-duration);
  width: 100%;
  justify-content: flex-end;

  &.router-link-active {
    color: var(--color-text-primary);
  }
}
</style>
