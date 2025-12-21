<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="width"
    fill="none"
    viewBox="10 10 28 28"
  >
    <path
      :fill="color"
      fill-rule="evenodd"
      d="m24 16.52-1.5 3.04a3 3 0 0 1-2.26 1.64l-3.355.488 2.428 2.367a3 3 0 0 1 .863 2.655l-.573 3.342 3.001-1.578a3 3 0 0 1 2.792 0l3.001 1.578-.573-3.342a3 3 0 0 1 .863-2.655l2.428-2.367-3.356-.487a3 3 0 0 1-2.258-1.641zm.897-2.703a1 1 0 0 0-1.794 0l-2.397 4.857a1 1 0 0 1-.753.547l-5.36.78a1 1 0 0 0-.555 1.705l3.88 3.781a1 1 0 0 1 .287.885l-.916 5.34a1 1 0 0 0 1.451 1.053l4.795-2.52a1 1 0 0 1 .93 0l4.795 2.52a1 1 0 0 0 1.45-1.054l-.915-5.339a1 1 0 0 1 .288-.885l3.879-3.78A1 1 0 0 0 33.407 20l-5.36-.779a1 1 0 0 1-.753-.547z"
      clip-rule="evenodd"
    />
  </svg>
</template>

<script setup lang="ts">
import type { IProps } from "./iconsInterface";

const { width = "40", color = "currentColor" } = defineProps<IProps>();
</script>
