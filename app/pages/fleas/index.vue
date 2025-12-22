<template>
  <div>
    <FleasHeader />
    <FleasFileUpload />
    <FleasChecklist />
    <FleasFooter />
  </div>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'en',
  },
  bodyAttrs: {
    class: 'fleas-page',
  },
  title: 'Silksong Flea Helper | Interactive Tracker & Checklist',
  link: [
    {
      rel: 'canonical',
      href: 'https://fleas-helper.vercel.app/fleas',
    },
  ],
});

useSeoMeta({
  description: 'Web tool to help Hollow Knight: Silksong players track their fleas rescue progress',
  ogTitle: 'Silksong Flea Helper | Interactive Tracker & Checklist',
  ogDescription:
    'Web tool to help Hollow Knight: Silksong players track their fleas rescue progress',
  ogImage: 'https://fleas-helper.vercel.app/preview-mini.jpg',
  ogType: 'website',
  ogUrl: 'https://fleas-helper.vercel.app/fleas',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Silksong Flea Helper | Interactive Tracker & Checklist',
  twitterDescription:
    'Web tool to help Hollow Knight: Silksong players track their fleas rescue progress',
  twitterImage: 'https://fleas-helper.vercel.app/preview-mini.jpg',
});
</script>

<style lang="scss">
body.fleas-page {
  position: relative;
  background-color: var(--color-root);
  padding-top: 32px;

  &:has(.overlay) {
    overflow: hidden;
  }

  & div#__nuxt,
  & div#__nuxt > div {
    display: grid;
    grid-template-rows: auto auto auto 1fr;
    min-height: 100lvh;
  }
}
</style>
