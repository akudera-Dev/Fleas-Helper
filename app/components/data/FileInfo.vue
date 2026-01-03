<template>
  <div class="file-info">
    <span v-if="!!file" class="save-file">{{ file.name }}</span>
    <div v-else class="error-message"><slot></slot></div>
    <button
      type="button"
      class="close-button"
      aria-label="Close uploaded file details"
      @click="closeFileInfo"
    >
      <IconsCross />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useFileData } from "~/stores/fileData";

const fileDataStore = useFileData();
const { file } = storeToRefs(fileDataStore);

const emits = defineEmits(["clear-errors"]);

function closeFileInfo() {
  emits("clear-errors");
  file.value = null;
}
</script>

<style scoped lang="scss">
@use "@/styles/mixins.scss" as *;

.file-info {
  @include plate-style;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 30px;
  padding: 17px 20px;
  color: var(--color-text-primary);
  font-family: var(--font-primary);
  @include fluid-text(18, 20);
}

.error-message {
  @include fluid-text(16, 18);
  color: var(--color-text-error);
}

.close-button {
  @include button-reset;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-primary);
  transition: color var(--transition-duration);

  @include hover {
    color: var(--color-text-accent);
  }
}
</style>
