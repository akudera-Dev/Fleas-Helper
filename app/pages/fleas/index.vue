<template>
  <NuxtLayout name="helper">
    <DataFileUpload />
    <DataChecklist
      title="Flea checklist"
      :items="FILE_DATA.fleas"
      :items-status="fileDataStatus"
      @toggle-status="toggleItem"
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useFileData } from "~/stores/fileData";
import { FILE_DATA } from "~/utils/fileData";

definePageMeta({
  title: "SilkSong Fleas Helper",
  description: "Track missing fleas and view them on the interactive map",
});

const fileDataStore = useFileData();
const { fileDataStatus } = storeToRefs(fileDataStore);

function toggleItem(key: string) {
  if (Object.hasOwn(fileDataStatus.value, key)) {
    fileDataStatus.value[key] = !fileDataStatus.value[key];
  }
}

useHead({
  htmlAttrs: {
    lang: "en",
  },
  bodyAttrs: {
    class: "fleas-page",
  },
  title: "Silksong Flea Helper | Interactive Tracker & Checklist",
  link: [
    {
      rel: "canonical",
      href: "https://fleas-helper.vercel.app/fleas",
    },
  ],
});

useSeoMeta({
  description: "Web tool to help Hollow Knight: Silksong players track their fleas rescue progress",
  ogTitle: "Silksong Flea Helper | Interactive Tracker & Checklist",
  ogDescription:
    "Web tool to help Hollow Knight: Silksong players track their fleas rescue progress",
  ogImage: "https://fleas-helper.vercel.app/preview-mini.jpg",
  ogType: "website",
  ogUrl: "https://fleas-helper.vercel.app/fleas",
  twitterCard: "summary_large_image",
  twitterTitle: "Silksong Flea Helper | Interactive Tracker & Checklist",
  twitterDescription:
    "Web tool to help Hollow Knight: Silksong players track their fleas rescue progress",
  twitterImage: "https://fleas-helper.vercel.app/preview-mini.jpg",
});
</script>

<style lang="scss">
body.fleas-page {
  position: relative;
  background-color: var(--color-root);

  &:has(.overlay) {
    overflow: hidden;
  }

  & div#__nuxt,
  & div#__nuxt > div {
    display: flex;
    flex-direction: column;
    min-height: 100lvh;
  }

  --color-root: #0b1a24;
  --color-accent: #c48259;
  --color-button: #ffffff;
  --color-button-active: #c48259;
  --color-hover-accent: #c482594d;
  --color-hover-light: #d7cac2;
  --color-plate-bg: #132634;
  --color-found: #50977b;
  --color-found-bg: #50977b33;
  --color-hover-found-bg: #50977b59;
  --color-active-found-bg: #50977b47;
  --color-missing: #7d5174;
  --color-missing-bg: #7d517433;
  --color-hover-missing-bg: #7b517359;
  --color-active-missing-bg: #7b517347;
  --color-light: #ffffff;
  --color-dark: #000000;

  --color-hover-bg: #0f202c;

  --color-text-primary: #eaeaea;
  --color-text-accent: #c48259;
  --color-text-hover: #c48259;
  --color-text-muted: #a0a0a0;
  --color-text-secondary: #060c11;
  --color-text-error: #9f1e1e;

  --color-border: #ffffff0d;

  --border-primary: 2px solid var(--color-border);
}
</style>
