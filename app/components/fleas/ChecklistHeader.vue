<template>
  <header class="checklist-header">
    <h2 class="title">Flea checklist</h2>
    <div class="controllers">
      <a
        :href="`https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=${Object.entries(
          FLEAS_DATA
        )
          .flatMap(([key, fleaDetails]) =>
            fleasStatus[key] === false ? [fleaDetails.mapCoordinates] : []
          )
          .join(',')}`"
        target="_blank"
        class="view-all-link"
      >
        <IconsMap width="25" class="view-all-map" />
        View all missing
      </a>
      <div class="filter-group">
        <button
          type="button"
          class="filter-button"
          :class="filteringBy === 'all' ? 'active' : ''"
          @click="emits('filteringChange', 'all')"
        >
          All
        </button>
        <button
          type="button"
          class="filter-button"
          :class="filteringBy === 'found' ? 'active' : ''"
          @click="emits('filteringChange', 'found')"
        >
          Found
        </button>
        <button
          type="button"
          class="filter-button"
          :class="filteringBy === 'missing' ? 'active' : ''"
          @click="emits('filteringChange', 'missing')"
        >
          Missing
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
type TFilteringBy = "all" | "found" | "missing";
interface IEmits {
  filteringChange: [newValue: TFilteringBy];
}
const emits = defineEmits<IEmits>();

interface IProps {
  filteringBy: TFilteringBy;
  fleasStatus: Record<string, boolean>;
}

const props = defineProps<IProps>();
</script>

<style scoped lang="scss">
@use "@/styles/mixins.scss" as *;

.filter-group {
  display: flex;
  align-items: center;
  column-gap: 10px;
}

.view-all-link {
  display: inline-flex;
  align-items: center;
  column-gap: 4px;
  padding: 4px 17px;
  border: 1px solid var(--color-accent);
  background-color: transparent;
  font-family: var(--font-primary);
  @include fluid-text(14, 16);
  color: var(--color-accent);
  border-radius: var(--border-radius-md);
  transition: background-color var(--transition-duration);
  text-decoration: none;

  @include hover {
    background-color: rgba(196, 130, 89, 0.3);
  }
}

.filter-button {
  --background-color: var(--color-light);
  padding: 4px 17px;
  border: none;
  background-color: var(--background-color);
  font-family: var(--font-primary);
  @include fluid-text(14, 16);
  border-radius: var(--border-radius-md);
  transition-property: background-color, color;
  transition-duration: var(--transition-duration);

  &:not(.active) {
    @include hover {
      background-color: #d7cac2;
    }
  }

  &.active {
    --background-color: var(--color-accent);
    background-color: var(--background-color);
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
  color: var(--color-accent);
}

.controllers {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
