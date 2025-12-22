<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style="fill: none"
    viewBox="0 0 24 24"
    :width="width"
    :height="width"
  >
    <path
      :stroke="color"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M3 19.382V5.721a1 1 0 0 1 .684-.949l4.684-1.561a2 2 0 0 1 1.264 0l4.736 1.578a2 2 0 0 0 1.265 0l4.05-1.35A1 1 0 0 1 21 4.387v12.995a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381M15 5v15.5M9 4v14"
    />
  </svg>
</template>

<script setup lang="ts">
import type { IProps } from './iconsInterface';

const { width = '48', color = 'currentColor' } = defineProps<IProps>();
</script>
