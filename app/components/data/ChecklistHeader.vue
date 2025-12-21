<template>
  <header class="checklist-header">
    <h2 class="title">{{ title }}</h2>
    <div class="controllers">
      <div class="view-all-link" :class="missingItemsCoordinates ? '' : 'disabled'">
        <a
          :href="`https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=${missingItemsCoordinates}`"
          target="_blank"
          :aria-disabled="!missingItemsCoordinates"
          :tabindex="missingItemsCoordinates ? '0' : '-1'"
        >
          <IconsMap width="25" class="view-all-map" />
          View all missing
        </a>
      </div>
      <div class="filter-group">
        <button
          type="button"
          class="filter-button"
          :class="filter === 'all' ? 'active' : ''"
          @click="emits('update:filter', 'all')"
        >
          All
        </button>
        <button
          type="button"
          class="filter-button"
          :class="filter === 'found' ? 'active' : ''"
          @click="emits('update:filter', 'found')"
        >
          Found
        </button>
        <button
          type="button"
          class="filter-button"
          :class="filter === 'missing' ? 'active' : ''"
          @click="emits('update:filter', 'missing')"
        >
          Missing
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { ItemDetails } from "~/utils/fileData";

type TFilteringBy = "all" | "found" | "missing";

interface IEmits {
  (e: "update:filter", newValue: TFilteringBy): void;
}
const emits = defineEmits<IEmits>();

interface IProps {
  title: string;
  items: Record<string, ItemDetails>;
  itemsStatus: Record<string, boolean>;
  filter: TFilteringBy;
}

const props = defineProps<IProps>();

const missingItemsCoordinates = computed(() => {
  return Object.entries(props.items)
    .flatMap(([key, itemDetails]) =>
      props.itemsStatus[key] === false ? [itemDetails.mapCoordinates] : []
    )
    .join(",");
});
</script>

<style scoped lang="scss">
@use "@/styles/mixins.scss" as *;

.filter-group {
  display: flex;
  align-items: center;
  column-gap: 10px;
}

.view-all-link {
  &.disabled {
    cursor: not-allowed;

    a {
      opacity: 0.6;
      pointer-events: none;
      user-select: none;
    }
  }

  & a {
    display: inline-flex;
    align-items: center;
    column-gap: 4px;
    padding: 4px 17px;
    max-height: 32px;
    border: 1px solid var(--color-accent);
    background-color: transparent;
    font-family: var(--font-primary);
    @include fluid-text(14, 16);
    color: var(--color-text-accent);
    border-radius: var(--border-radius-md);
    transition-property: opacity, background-color;
    transition-duration: var(--transition-duration);
    text-decoration: none;

    @include hover {
      &:not(.disabled) {
        background-color: var(--color-hover-accent);
      }
    }
  }
}

.filter-button {
  --background-color: var(--color-button);
  padding: 4px 17px;
  border: none;
  background-color: var(--background-color);
  font-family: var(--font-primary);
  @include fluid-text(14, 16);
  color: var(--color-text-secondary);
  border-radius: var(--border-radius-md);
  transition-property: background-color, color;
  transition-duration: var(--transition-duration);

  &:not(.active) {
    @include hover {
      background-color: var(--color-hover-light);
    }
  }

  &.active {
    --background-color: var(--color-button-active);
    color: var(--color-text-primary);
  }
}

.checklist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 25px;
  gap: 10px 8px;
}

.title {
  font-family: var(--font-primary);
  @include fluid-text(18, 20);
  color: var(--color-text-accent);
}

.controllers {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
