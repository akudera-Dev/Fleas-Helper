<template>
  <div class="file-info">
    <span class="save-file" v-if="!!file">{{ file.name }}</span>
    <div class="error-message" v-else><slot></slot></div>
    <button type="button" class="close-button" @click="closeFileInfo">
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
    color: var(--color-accent);
  }
}
</style>
