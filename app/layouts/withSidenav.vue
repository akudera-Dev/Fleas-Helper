<template>
  <div>
    <aside class="sidenav">
      <ItemsHelpersNavigation />
    </aside>
    <Transition name="fade">
      <div v-if="isMenuOpen" class="menu-overlay"></div>
    </Transition>
    <aside ref="side-menu" class="side-menu" :class="isMenuOpen ? 'open' : ''">
      <button
        type="button"
        class="menu-button"
        aria-label="Close navigation menu"
        @click="handleMenu"
      >
        <IconsArrow class="button-arrow" width="20" />
      </button>
      <ItemsHelpersNavigation :inert="isMenuOpen ? undefined : ''" />
    </aside>
    <div :inert="isMenuOpen ? true : undefined">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useScrollLock, onClickOutside, onKeyStroke } from "@vueuse/core";

const sideMenu = useTemplateRef("side-menu");

onClickOutside(sideMenu, closeMenu);

onKeyStroke("Escape", closeMenu);

const isMenuOpen = ref(false);
let isRootLocked: globalThis.WritableComputedRef<boolean, boolean> | null;
onMounted(() => {
  isRootLocked = useScrollLock(document.documentElement);
});

function closeMenu() {
  isMenuOpen.value = false;
  if (!isRootLocked) return;
  isRootLocked.value = false;
}

function handleMenu() {
  if (isMenuOpen.value) {
    closeMenu();
  } else {
    isMenuOpen.value = true;
    if (!isRootLocked) return;
    isRootLocked.value = true;
  }
}
</script>

<style scoped lang="scss">
.sidenav {
  position: fixed;
  top: 200px;
  right: 5vw;
}

.side-menu {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  height: 100dvh;
  transition:
    transform var(--transition-duration),
    background-color var(--transition-duration-long);
  transform: translateX(100%);
  background-color: var(--color-plate-bg);
  border-left: var(--border-light);
  border-bottom-left-radius: var(--border-radius-lg);
  border-top-left-radius: var(--border-radius-lg);
  padding: 100px 45px;
  width: 45vw;
  min-width: 225px;
  z-index: 9999;

  &.open {
    transform: translateX(0);

    & .button-arrow {
      transform: rotate(180deg);
    }
  }
}

.menu-button {
  position: absolute;
  right: 100%;
  top: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 32px;
  padding: 8px;
  background-color: var(--color-plate-bg);
  border: var(--border-light);
  border-left: none;
  border-bottom-right-radius: var(--border-radius-md);
  border-top-right-radius: var(--border-radius-md);
  transform: rotate(180deg);
  transition: background-color var(--transition-duration-long);

  & .button-arrow {
    transition: transform var(--transition-duration-long);
  }
}

.menu-overlay {
  position: fixed;
  inset: 0;
  background-color: #00000066;
  z-index: 9999;
  backdrop-filter: blur(6px);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--transition-duration);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

@media (max-width: 1300px) {
  .sidenav {
    right: 20px;
  }
}

@media (max-width: 1250px) {
  .sidenav {
    display: none;
  }

  .side-menu {
    display: block;
  }
}

@media (max-width: 570px) {
  .side-menu {
    padding-inline: 30px;
  }
}
</style>
