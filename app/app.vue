<template>
  <div>
    <Analytics />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { Analytics } from "@vercel/analytics/nuxt";
</script>
