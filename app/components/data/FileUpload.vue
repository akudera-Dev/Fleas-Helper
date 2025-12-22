<template>
  <Teleport to="body">
    <div class="overlay" v-if="isOverDropZone">
      <IconsUploadSVG class="label-icon label-icon--uploading" width="150" />
    </div>
  </Teleport>
  <section class="file-container container">
    <DataFileInfo v-if="isFileUploaded || errorMessage" @clear-errors="clearErrors">{{
      errorMessage
    }}</DataFileInfo>
    <template v-else>
      <label for="file-upload" class="label">
        <IconsUploadSVG class="label-icon" />
        <h2 class="label-title">Upload Save File</h2>
        <span class="description">Drag and drop or chose your save file</span>
        <input type="file" id="file-upload" class="visually-hidden" @change="onChange" />
      </label>
    </template>
  </section>
</template>

<script setup lang="ts">
import { useDropZone } from "@vueuse/core";
import z from "zod";
import { fileContextScheme } from "~/schemes/fileData";
import { useFileData } from "~/stores/fileData";

const props = defineProps<{
  dataUpdate: () => any;
}>();

const fileDataStore = useFileData();
const { file, fileContext } = storeToRefs(fileDataStore);

const isFileUploaded = computed(() => !!file.value);
const errorMessage = ref<string | null>();

const { isOverDropZone } = useDropZone(document, { onDrop: fileHandle });

function clearErrors() {
  errorMessage.value = null;
}

function onChange(event: Event) {
  const target = event.target as HTMLInputElement;

  const files = target.files;
  if (!files) return;

  const filesArray = Array.from(files);
  fileHandle(filesArray);
}

async function fileHandle(files: File[] | null) {
  if (!files || files.length < 1) return;

  const uploadedFile = files[0]!;
  try {
    errorMessage.value = null;

    const context = await FileDecode.getDecode(uploadedFile);
    const parsedContext = fileContextScheme.parse(context);

    if (parsedContext) {
      file.value = uploadedFile;
      fileContext.value = parsedContext;
      props.dataUpdate();
    }
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      errorMessage.value =
        "Error: It seems to your save file is corrupted. Its structure is broken";
    } else {
      errorMessage.value = "Error: File is corrupted or you uploaded not a *.dat file";
    }
  }
}
</script>

<style scoped lang="scss">
@use "@/styles/mixins.scss" as *;
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
}

.file-container {
  margin-top: 30px;
}

.label {
  @include plate-style;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 300px;
  width: 100%;
  height: 100%;
  padding-block: 60px;
  border-style: dashed;
  transition: border-color var(--transition-duration), transform var(--transition-duration),
    background-color var(--transition-duration-short);
  -webkit-tap-highlight-color: transparent;

  @include only-desktop-hover {
    border-color: var(--color-accent);
    transform: scale(1.01);
  }

  &:active {
    background-color: var(--color-hover-bg);
  }

  &:has(input:focus-visible) {
    border-color: var(--color-accent);
    transform: scale(1.01);
  }

  &-icon {
    color: var(--color-text-accent);
    margin-bottom: 15px;

    &--uploading {
      animation: 0.7s ease-out infinite both jumping;
    }
  }

  &-title {
    font-family: var(--font-primary);
    @include fluid-text(32, 40);
    font-weight: 300;
    color: var(--color-text-primary);
    text-align: center;
  }

  & .description {
    font-family: var(--font-primary);
    @include fluid-text(14, 16);
    font-weight: 300;
    color: var(--color-text-muted);
    text-align: center;
  }
}

@keyframes jumping {
  25% {
    transform: translateY(4%);
  }
  75% {
    transform: translateY(-4%);
  }
  100% {
    transform: translateY(0%);
  }
}
</style>
