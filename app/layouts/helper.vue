<template>
  <div class="helper-layout">
    <ItemsHelpersHeader>
      <template #titleDesc>
        <template v-if="iconPath && !imageError">
          <img
            v-show="imageLoaded"
            ref="imageRef"
            :src="iconPath"
            :alt="iconAlt"
            width="40"
            class="page-icon"
            @load="imageLoaded = true"
            @error="imageError = true"
          />
          <template v-if="!imageLoaded">
            {{ router.meta.titleDesc }}
          </template>
        </template>
        <template v-else>
          {{ router.meta.titleDesc }}
        </template>
      </template>
      <template #description>
        {{ router.meta.description }}
      </template>
    </ItemsHelpersHeader>
    <main>
      <slot></slot>
    </main>
    <ItemsHelpersFooter />
  </div>
</template>

<script setup lang="ts">
const router = useRoute();

const props = defineProps<{
  iconPath: string;
  iconAlt: string;
}>();

const imageLoaded = ref(false);
const imageError = ref(false);
const imageRef = ref<HTMLImageElement | null>();

onMounted(() => {
  if (imageRef.value?.complete && imageRef.value?.naturalWidth > 0) {
    imageLoaded.value = true;
  } else {
    imageLoaded.value = false;
    imageError.value = true;
  }
});

watch(
  () => props.iconPath,
  () => {
    imageLoaded.value = false;
    imageError.value = false;
  }
);
</script>

<style lang="scss">
.helper-layout {
  display: flex;
  flex-direction: column;
  min-height: 100lvh;
}
body {
  position: relative;
  background-color: var(--color-root);
  transition: background-color var(--transition-duration-long) ease-in-out;
  &:has(.overlay) {
    overflow: hidden;
  }
  & div#__nuxt,
  & div#__nuxt > div {
    min-height: 100lvh;
  }
}
</style>
