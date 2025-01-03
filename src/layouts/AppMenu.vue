<script setup>
import { onMounted, ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';
import { RoutesEnum } from '@/router';
import { UserRolesEnum } from '@/types/users';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const menuItems = [
  {
    label: 'Главная',
    items: [
      {
        label: 'Дашборд',
        icon: 'pi pi-fw pi-home',
        to: RoutesEnum.HOME
      },
      {
        label: 'Пользователи',
        to: RoutesEnum.USERS,
        icon: 'pi pi-users'
      },
    ]
  },
];

const user = authStore?.getUser();
const model = ref();
onMounted(() => {
  if (!authStore.getIsLoggedIn()) {
    return;
  }
  model.value = filterMenu(menuItems);
});

function filterMenu(array) {
  return array.filter((item) => {
    if (item.items && item.items.length) {
      item.items = filterMenu(item.items);
    }
    return item.roles?.includes(user.role) || user.role === UserRolesEnum.ADMIN;
  });
}
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
