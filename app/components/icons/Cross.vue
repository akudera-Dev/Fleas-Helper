<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="width"
    viewBox="0 0 40 40"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.82152 8.82152C9.47241 8.17066 10.5277 8.17066 11.1786 8.82152L20 17.643L28.8215 8.82152C29.4724 8.17066 30.5277 8.17066 31.1785 8.82152C31.8294 9.47241 31.8294 10.5277 31.1785 11.1786L22.357 20L31.1785 28.8215C31.8294 29.4724 31.8294 30.5277 31.1785 31.1785C30.5277 31.8294 29.4724 31.8294 28.8215 31.1785L20 22.357L11.1786 31.1785C10.5277 31.8294 9.47241 31.8294 8.82152 31.1785C8.17066 30.5277 8.17066 29.4724 8.82152 28.8215L17.643 20L8.82152 11.1786C8.17066 10.5277 8.17066 9.47241 8.82152 8.82152Z"
      :fill="color"
    />
  </svg>
</template>

<script setup lang="ts">
import type { IProps } from './iconsInterface';

const { width = '40', color = 'currentColor' } = defineProps<IProps>();
</script>
