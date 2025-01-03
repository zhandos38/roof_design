<script setup>
import { useLayout } from '@/layouts/composables/layout';
import { useAuthStore } from '@/stores/auth';

const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();

const authStore = useAuthStore();
const user = authStore?.getUser();

const logout = () => {
  authStore.logout();
};
</script>

<template>
  <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
      <button class="layout-menu-button layout-topbar-action" @click="onMenuToggle">
        <i class="pi pi-bars"></i>
      </button>
      <router-link to="/" class="layout-topbar-logo">
        Smart School ITB
      </router-link>
    </div>

    <div class="layout-topbar-actions">
      <div class="layout-config-menu">
        <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
          <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
        </button>
      </div>

      <button
        class="layout-topbar-menu-button layout-topbar-action"
        v-styleclass="{
          selector: '@next',
          enterFromClass: 'hidden',
          enterActiveClass: 'animate-scalein',
          leaveToClass: 'hidden',
          leaveActiveClass: 'animate-fadeout',
          hideOnOutsideClick: true
        }"
      >
        <i class="pi pi-ellipsis-v"></i>
      </button>

      <div class="layout-topbar-menu hidden lg:block">
        <div class="layout-topbar-menu-content">
          <div class="flex items-center gap-x-2">
            <i class="!text-lg pi pi-user"></i>
            <div>
              <span>{{ user?.name }}</span>
            </div>
          </div>
          <button type="button" class="layout-topbar-action" @click="logout">
            <i class="pi pi-sign-out"></i>
            <span>Выйти</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
