<script setup lang="ts">
import DashboardDoughnut from '@/layouts/DashboardDoughnut.vue';
import DashboardBar from '@/layouts/DashboardBar.vue';
import { formatCurrency } from '../helpers/functions';
</script>

<template>
  <main>
    <div class="grid grid-cols-12 gap-4 mt-4">
      <div class="col-span-6 lg:col-span-3">
        <div class="card text-center flex flex-col justify-center items-center">
          <div class="text-5xl font-semibold">89</div>
          <div class="text-lg">Школ</div>
        </div>
      </div>
      <div class="col-span-6 lg:col-span-3">
        <div class="card text-center flex flex-col justify-center items-center">
          <div class="text-5xl font-semibold">567</div>
          <div class="text-lg">Книг</div>
        </div>
      </div>
      <div class="col-span-6 lg:col-span-3">
        <div class="card text-center flex flex-col justify-center items-center">
          <div class="text-5xl font-semibold">{{ formatCurrency(1202344) }}</div>
          <div class="text-lg">Входов</div>
        </div>
      </div>
      <div class="col-span-6 lg:col-span-3">
        <div class="card text-center flex flex-col justify-center items-center">
          <div class="text-5xl font-semibold">{{ formatCurrency(1191212) }}</div>
          <div class="text-lg">Выходов</div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4 mt-4">
      <div class="col-span-12">
        <div class="card flex justify-center">
          <DashboardBar />
        </div>
      </div>
      <div class="col-span-12 lg:col-span-6">
        <div class="card flex justify-center">
          <DashboardDoughnut />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
</style>