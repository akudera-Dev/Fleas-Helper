<template>
  <header class="header container">
    <h1 class="title">SilkSong Fleas Helper</h1>
    <span class="subtitle">Track missing fleas and view them on the interactive map</span>
    <hr />
  </header>
</template>

<style scoped lang="scss">
@use '@/styles/mixins.scss' as *;

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 8px;
}

.title {
  font-family: var(--font-accent);
  @include fluid-text(32, 40);
  font-weight: 700;
  color: var(--color-accent);
  text-align: center;
}

.subtitle {
  font-family: var(--font-primary);
  @include fluid-text(14, 16);
  font-weight: 500;
  color: var(--color-muted);
  text-align: center;
}

hr {
  width: 100%;
  height: 1px;
  margin-block: 40px 0;
  border: none;
  background-color: var(--color-accent);
}

@media (max-width: 620px) {
  .header {
    row-gap: 4px;
  }

  hr {
    margin-top: 20px;
  }
}
</style>
