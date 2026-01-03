<template>
  <div class="masks-page">
    <NuxtLayout name="helper" icon-path="/icons/mask.png" icon-alt="Masks">
      <DataFileUpload :data-update="dataUpdate" />
      <DataChecklist
        title="Flea checklist"
        :items="FILE_DATA.masks"
        :items-status="fileDataStatus.masks"
        @toggle-status="toggleItem"
      />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "with-sidenav",
  pageTransition: { name: "page", mode: "out-in" },
  titleDesc: "Masks",
  description: "Track mask shards and view them on the interactive map",
});

const fileDataStore = useFileData();
const { fileDataStatus, fileContext } = storeToRefs(fileDataStore);

function toggleItem(key: string) {
  if (Object.hasOwn(fileDataStatus.value.masks, key)) {
    fileDataStatus.value.masks[key] = !fileDataStatus.value.masks[key];
  }
}

const sceneDataIDs = {
  standard: "Heart Piece",
  secondHeartPiece: "Heart Piece (1)",
};

function dataUpdate() {
  if (fileContext.value) {
    const bought = fileContext.value.playerData;
    const found = fileContext.value.sceneData.persistentBools.serializedList;
    const reward = fileContext.value.playerData.QuestCompletionData.savedData;

    if (bought) {
      Object.entries(bought).forEach(([key, value]) => {
        if (key in fileDataStatus.value.masks) {
          fileDataStatus.value.masks[key] = value as boolean;
        }
      });
    }
    if (found) {
      found.forEach((sceneData) => {
        if (
          sceneData.ID === sceneDataIDs.standard ||
          sceneData.ID === sceneDataIDs.secondHeartPiece
        ) {
          fileDataStatus.value.masks[sceneData.SceneName] = sceneData.Value as boolean;
        }
      });
    }
    if (reward) {
      reward.forEach((sceneData) => {
        if (sceneData.Name in fileDataStatus.value.masks) {
          fileDataStatus.value.masks[sceneData.Name] = sceneData.Data.IsCompleted as boolean;
        }
      });
    }
  }
}

useHead({
  htmlAttrs: {
    lang: "en",
  },
  title: "Silksong Mask shards Helper | Interactive Tracker & Checklist",
  link: [
    {
      rel: "canonical",
      href: "https://fleas-helper.vercel.app/masks",
    },
  ],
});

useSeoMeta({
  description:
    "Web tool to help Hollow Knight: Silksong players track their mask shards find progress",
  ogTitle: "Silksong Mask shards Helper | Interactive Tracker & Checklist",
  ogDescription:
    "Web tool to help Hollow Knight: Silksong players track their mask shards find progress",
  // ogImage: "https://fleas-helper.vercel.app/preview-mini.jpg",
  ogType: "website",
  ogUrl: "https://fleas-helper.vercel.app/masks",
  // twitterCard: "summary_large_image",
  twitterTitle: "Silksong Mask shards Helper | Interactive Tracker & Checklist",
  twitterDescription:
    "Web tool to help Hollow Knight: Silksong players track their mask shards find progress",
  // twitterImage: "https://fleas-helper.vercel.app/preview-mini.jpg",
});
</script>

<style lang="scss">
body:has(.masks-page) {
  --color-root: #101012;
  --color-accent: #ffffff;
  --color-button: #ffffff;
  --color-button-active: #27272a;
  --color-hover-accent: #29292e;
  --color-hover-light: #8c8c94;
  --color-plate-bg: #18181b;
  --color-found: #ffffff;
  --color-found-bg: #ffffff33;
  --color-hover-found-bg: #ffffff59;
  --color-active-found-bg: #ffffff47;
  --color-missing: #444446;
  --color-missing-bg: #44444633;
  --color-hover-missing-bg: #44444659;
  --color-active-missing-bg: #44444647;
  --color-light: #ffffff;
  --color-dark: #000000;

  --color-hover-bg: #1c1c1f;

  --color-text-primary: #eaeaea;
  --color-text-accent: #ffffff;
  --color-text-hover: #8c8c94;
  --color-text-muted: #a1a1aa;
  --color-text-secondary: #060c11;
  --color-text-error: #9f1e1e;

  --color-border: #ffffff0d;

  --border-primary: 2px solid var(--color-border);
}
</style>
