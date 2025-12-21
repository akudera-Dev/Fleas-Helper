<template>
  <Header>
    <template v-slot:title>{{ router.meta.title }}</template>
    <template v-slot:description>
      {{ router.meta.description }}
    </template>
  </Header>
  <main>
    <slot></slot>
  </main>
  <Footer />
</template>

<script setup lang="ts">
const router = useRoute();
</script>
