<script setup lang="ts">
import { ref, onMounted } from "vue";
import dayjs from 'dayjs';

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

function getLast7Days() {
  const last7Days = [];
  for (let i = 0; i < 7; i++) {
    const day = dayjs().subtract(i, 'day').format('DD.MM.YYYY');
    last7Days.push(day);
  }
  return last7Days.reverse();
}

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: getLast7Days(),
    datasets: [
      {
        label: 'Вход',
        backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
        borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
        data: [1650, 1612, 1480, 1481, 1556, 1555, 1540]
      },
      {
        label: 'Выход',
        backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
        borderColor: documentStyle.getPropertyValue('--p-gray-500'),
        data: [1328, 1548, 1540, 1509, 1586, 1527, 1590]
      }
    ]
  };
};
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--p-text-color');
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: textColor
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
          font: {
            weight: 500
          }
        },
        grid: {
          display: false,
          drawBorder: false
        }
      },
      y: {
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false
        }
      }
    }
  };
}
</script>

<template>
  <Chart class="w-full h-96" type="bar" :data="chartData" :options="chartOptions" />
</template>

<style scoped lang="scss">

</style>