<template>
  <div class="fleas-checklist container">
    <header class="checklist-header">
      <h2 class="title">Flea checklist</h2>
      <div class="filter-group">
        <button
          type="button"
          class="filter-button"
          :class="filteringBy === 'all' ? 'active' : ''"
          @click="filteringBy = 'all'"
        >
          All
        </button>
        <button
          type="button"
          class="filter-button"
          :class="filteringBy === 'found' ? 'active' : ''"
          @click="filteringBy = 'found'"
        >
          Found
        </button>
        <button
          type="button"
          class="filter-button"
          :class="filteringBy === 'missing' ? 'active' : ''"
          @click="filteringBy = 'missing'"
        >
          Missing
        </button>
      </div>
    </header>
    <div class="checklist">
      <TransitionGroup
        tag="div"
        :name="transitionName"
        v-if="filteringBy === 'all' || fleasToDisplay.length > 0"
      >
        <div v-for="fleaDetails in fleasToDisplay" :key="fleaDetails.keyName" class="flea-details">
          <div>
            <span> #{{ fleaDetails.index }} </span>
            <a
              :href="`https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=${fleaDetails.mapCoordinates}`"
              target="_blank"
            >
              {{ fleaDetails.biome }}
            </a>
          </div>
          <ClientOnly>
            <button
              type="button"
              @click="() => onStateButtonClick(fleaDetails.keyName)"
              class="state-button"
              :class="fleaDetails.isFound ? 'found' : 'missing'"
            >
              {{ fleaDetails.isFound ? "Found" : "Missing" }}
            </button>
          </ClientOnly>
        </div>
      </TransitionGroup>
      <div class="not-found" v-else>
        <p>
          {{
            filteringBy === "found"
              ? "You haven't rescued a single flea yet :("
              : "You have rescued all fleas!"
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const fleasDetailsStore = useFleasDetails();
const { fleasStatus } = storeToRefs(fleasDetailsStore);

const filteringBy = ref<"all" | "found" | "missing">("all");

const fleasToDisplay = computed(() => {
  return Object.entries(FLEAS_DATA)
    .map(([keyName, fleaDetails], index) => {
      const isFound = fleasStatus.value[keyName] || false;
      return {
        keyName,
        index: index + 1,
        ...fleaDetails,
        isFound,
      };
    })
    .filter(
      (flea) =>
        (filteringBy.value === "found" && flea.isFound) ||
        (filteringBy.value === "missing" && !flea.isFound) ||
        filteringBy.value === "all"
    );
});

const transitionName = ref<"list" | "">("");
function onStateButtonClick(fleaKeyName: string) {
  transitionName.value = "list";

  const key = fleaKeyName as keyof typeof FLEAS_DATA;
  if (!Object.hasOwn(fleasStatus.value, key)) return;

  fleasStatus.value[key] = !fleasStatus.value[key];
  nextTick().then(() => {
    transitionName.value = "";
  });
}
</script>

<style scoped lang="scss">
@use "@/styles/mixins.scss" as *;

.fleas-checklist {
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
}

.not-found {
  display: flex;
  justify-content: center;
  padding: 40px 10px;
  font-family: var(--font-primary);
  font-weight: 500;
  color: var(--color-muted);
}

.title {
  font-family: var(--font-primary);
  @include fluid-text(18, 20);
  color: var(--color-accent);
}

.filter-group {
  display: flex;
  column-gap: 10px;
}

.filter-button {
  padding: 4px 17px;
  border: none;
  background-color: var(--color-light);
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
    background-color: var(--color-accent);
    color: var(--color-text-primary);
  }
}

.checklist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
  column-gap: 8px;
}

.flea-details {
  display: flex;
  justify-content: space-between;
  padding: 7px 20px;
  border-radius: 0;
  width: 100%;
  color: var(--color-text-primary);
  height: 45px;

  &:not(:first-child) {
    border-top: var(--border-primary);
  }

  &:nth-child(-n + 11) {
    &:last-child {
      border-bottom: var(--border-primary);
    }
  }

  & div {
    display: flex;

    & span {
      font-family: var(--font-primary);
      font-weight: 300;
      color: var(--color-muted);
      width: 24px;
    }

    & a {
      font-family: var(--font-primary);
      font-size: 16px;
      color: var(--color-text-primary);
      padding-left: 30px;
      transition: color var(--transition-duration);

      @include hover {
        color: var(--color-accent);
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
    background-color: rgba(125, 81, 116, 0.2);
    border-color: var(--color-secondary);
    color: var(--color-secondary);

    @include only-desktop-hover {
      background-color: rgba(125, 81, 116, 0.35);
    }

    &:active {
      background-color: rgba(125, 81, 116, 0.28);
    }
  }

  &.found {
    background-color: rgba(80, 151, 123, 0.2);
    border-color: var(--color-success);
    color: var(--color-success);

    @include only-desktop-hover {
      background-color: rgba(80, 151, 123, 0.35);
    }

    &:active {
      background-color: rgba(80, 151, 123, 0.28);
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
