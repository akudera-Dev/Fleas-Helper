<template>
  <div class="fleas-page">
    <NuxtLayout name="helper" icon-path="/icons/flea.png" icon-alt="Fleas">
      <DataFileUpload :data-update="dataUpdate" />
      <DataChecklist
        title="Flea checklist"
        :items="FILE_DATA.fleas"
        :items-status="fileDataStatus.fleas"
        @toggle-status="toggleItem"
      />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useFileData } from "~/stores/fileData";
import { FILE_DATA } from "~/utils/fileData";

definePageMeta({
  layout: "with-sidenav",
  pageTransition: { name: "page", mode: "out-in" },
  titleDesc: "Fleas",
  description: "Track missing fleas and view them on the interactive map",
});

const fileDataStore = useFileData();
const { fileDataStatus, fileContext } = storeToRefs(fileDataStore);

function toggleItem(key: string) {
  if (Object.hasOwn(fileDataStatus.value.fleas, key)) {
    fileDataStatus.value.fleas[key] = !fileDataStatus.value.fleas[key];
  }
}

function dataUpdate() {
  if (fileContext.value?.playerData) {
    Object.entries(fileContext.value.playerData).forEach(([key, value]) => {
      if (key in fileDataStatus.value.fleas) {
        fileDataStatus.value.fleas[key] = value as boolean;
      }
    });
  }
}

useHead({
  htmlAttrs: {
    lang: "en",
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
body:has(.fleas-page) {
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
