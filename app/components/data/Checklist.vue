<template>
  <div class="checklist-container container">
    <DataChecklistHeader
      v-model:filter="filteringBy"
      :items="items"
      :items-status="itemsStatus"
      :title="title"
    />
    <div class="checklist">
      <TransitionGroup
        v-if="filteringBy === 'all' || itemsToDisplay.length > 0"
        tag="div"
        :name="transitionName"
        :css="transitionName ? true : false"
      >
        <div v-for="item in itemsToDisplay" :key="item.keyName" class="item-details">
          <div>
            <span> #{{ item.index }} </span>
            <a
              :href="`https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=${item.mapCoordinates}`"
              target="_blank"
            >
              <IconsMap width="20" class="view-all-map" />
              {{ item.biome }}
            </a>
          </div>
          <button
            type="button"
            class="state-button"
            :class="item.isFound ? 'found' : 'missing'"
            @click="onStateButtonClick(item.keyName)"
          >
            {{ item.isFound ? "Found" : "Missing" }}
          </button>
        </div>
      </TransitionGroup>
      <div v-else class="not-found">
        <p>
          {{
            filteringBy === "found"
              ? "You haven't found anything yet :("
              : "You've found everything you could!"
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ItemDetails } from "~/utils/fileData";

type TKey = string;
interface IProps {
  title: string;
  items: Record<TKey, ItemDetails>;
  itemsStatus: Record<TKey, boolean>;
}

const props = defineProps<IProps>();

interface IEmits {
  (e: "toggle-status", key: TKey): void;
}
const emits = defineEmits<IEmits>();

type TFilteringBy = "all" | "found" | "missing";
const filteringBy = ref<TFilteringBy>("all");

const itemsToDisplay = computed(() => {
  return Object.entries(props.items)
    .map(([keyName, itemDetails], index) => {
      const isFound = props.itemsStatus[keyName] || false;
      return {
        keyName,
        index: index + 1,
        ...itemDetails,
        isFound,
      };
    })
    .filter(
      (item) =>
        (filteringBy.value === "found" && item.isFound) ||
        (filteringBy.value === "missing" && !item.isFound) ||
        filteringBy.value === "all"
    );
});

const transitionName = ref<"list" | "">("");

function onStateButtonClick(itemKeyName: string) {
  transitionName.value = "list";
  emits("toggle-status", itemKeyName);
  nextTick().then(() => {
    transitionName.value = "";
  });
}
</script>

<style scoped lang="scss">
@use "@/styles/mixins.scss" as *;

.checklist-container {
  display: flex;
  flex-direction: column;
}

.checklist {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 504px;
  scrollbar-width: thin;
  scrollbar-color: var(--color-accent) var(--color-plate-bg);
  margin-top: 15px;
  @include plate-style;
  overflow: auto;
  scroll-behavior: smooth;
}

.not-found {
  display: flex;
  justify-content: center;
  padding: 40px 10px;
  font-family: var(--font-primary);
  font-weight: 500;
  color: var(--color-text-muted);
}

.item-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 20px;
  border-radius: 0;
  width: 100%;
  color: var(--color-text-primary);
  height: 45px;

  &:not(:first-child) {
    border-top: var(--border-primary);
  }

  &:nth-child(-n + 11):last-child {
    border-bottom: var(--border-primary);
  }

  & div {
    display: flex;

    & span {
      font-family: var(--font-primary);
      font-weight: 300;
      color: var(--color-text-muted);
      width: 24px;
    }

    & a {
      display: inline-flex;
      align-items: center;
      column-gap: 4px;
      font-family: var(--font-primary);
      font-size: 16px;
      color: var(--color-text-primary);
      text-decoration: none;
      margin-left: min(30px, 3.19vw);
      transition: color var(--transition-duration);

      @include hover {
        color: var(--color-text-hover);
      }
    }
  }
}

.state-button {
  font-family: var(--font-primary);
  font-size: 16px;
  border-width: 1px;
  border-style: solid;
  border-radius: var(--border-radius-md);
  transition: background-color var(--transition-duration);
  -webkit-tap-highlight-color: transparent;

  &.missing {
    background-color: var(--color-missing-bg);
    border-color: var(--color-missing);
    color: var(--color-missing);

    @include only-desktop-hover {
      background-color: var(--color-hover-missing-bg);
    }

    &:active {
      background-color: var(--color-active-missing-bg);
    }
  }

  &.found {
    background-color: var(--color-found-bg);
    border-color: var(--color-found);
    color: var(--color-found);

    @include only-desktop-hover {
      background-color: var(--color-hover-found-bg);
    }

    &:active {
      background-color: var(--color-active-found-bg);
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: opacity 0.2s ease-out;
}

.list-leave-active {
  position: absolute;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}

.list-move {
  transition: transform 0.2s ease-out;
}
</style>
