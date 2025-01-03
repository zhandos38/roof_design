<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

// Конфигурация сцены
const stageConfig = reactive({
  width: 800,
  height: 600,
});
const gridSize = ref(50); // Шаг сетки
const roofCompleted = ref(false); // Флаг, завершено ли рисование
const isDrawing = ref(false); // Флаг, идет ли рисование
const firstPoint = computed(() => (roofPoints.value.length > 0 ? roofPoints.value[0] : null));

// **Хранение точек контура крыши**
const roofPoints = ref<{ x: number; y: number }[]>([]);
const tempPoint = ref<{ x: number; y: number } | null>(null); // Временная точка для динамического рисования

// **Настройки магнитной привязки**
const SNAP_DISTANCE = 10; // Дистанция для магнитного замыкания

// **Функция для добавления точек крыши**
const handleStageClick = (e: any) => {
  if (roofCompleted.value) return; // Если крыша завершена, не рисуем

  const stage = e.target.getStage();
  const pointer = stage.getPointerPosition();
  if (!pointer) return;

  let newPoint = { x: pointer.x, y: pointer.y };

  // **Магнитное замыкание**: если точка близко к первой – замыкаем
  if (
    firstPoint.value &&
    Math.hypot(newPoint.x - firstPoint.value.x, newPoint.y - firstPoint.value.y) < SNAP_DISTANCE
  ) {
    newPoint = { x: firstPoint.value.x, y: firstPoint.value.y };
    roofCompleted.value = true;
  }

  roofPoints.value.push(newPoint);
};

// **Обновление временной точки при наведении (чтобы видеть линию)**
const handleMouseMove = (e: any) => {
  if (roofCompleted.value || roofPoints.value.length === 0) return;

  const stage = e.target.getStage();
  const pointer = stage.getPointerPosition();
  if (!pointer) return;

  let hoverPoint = { x: pointer.x, y: pointer.y };

  // **Магнитная привязка**
  if (
    firstPoint.value &&
    Math.hypot(hoverPoint.x - firstPoint.value.x, hoverPoint.y - firstPoint.value.y) < SNAP_DISTANCE
  ) {
    hoverPoint = { x: firstPoint.value.x, y: firstPoint.value.y };
  }

  tempPoint.value = hoverPoint;
};

// **Функция сброса**
const resetDrawing = () => {
  roofPoints.value = [];
  tempPoint.value = null;
  roofCompleted.value = false;
};

// **Размер листа черепицы**
const sheetSize = reactive({ width: 100, height: 50, overlap: 10 });

// **Листы покрытия**
const sheets = ref<any[]>([]);

// **Добавление листа черепицы**
const addSheet = () => {
  sheets.value.push({
    id: `sheet-${sheets.value.length + 1}`,
    x: 250,
    y: 350,
    width: 100,
    height: 50,
    draggable: true,
  });
};

// **Удаление последнего листа**
const deleteSheet = () => {
  if (sheets.value.length > 0) {
    sheets.value.pop();
  }
};

// **Функция для рисования сетки**
const generateGridLines = () => {
  const lines = [];
  for (let x = 0; x < stageConfig.width; x += gridSize.value) {
    lines.push({ points: [x, 0, x, stageConfig.height] }); // Вертикальные линии
  }
  for (let y = 0; y < stageConfig.height; y += gridSize.value) {
    lines.push({ points: [0, y, stageConfig.width, y] }); // Горизонтальные линии
  }
  return lines;
};
const gridLines = computed(() => generateGridLines());

// **Завершение рисования крыши**
const fillRoofWithSheets = () => {
  if (roofPoints.value.length > 4) {
    roofCompleted.value = true;
    autoFillRoof(); // Запуск авто-заполнения черепицей
  }
};

// **Функция авто-заполнения крыши черепицей**
const autoFillRoof = () => {
  sheets.value = []; // Очищаем старые листы

  // Получаем границы крыши
  const minX = Math.min(...roofPoints.value.map((p) => p.x));
  const maxX = Math.max(...roofPoints.value.map((p) => p.x));
  const minY = Math.min(...roofPoints.value.map((p) => p.y));
  const maxY = Math.max(...roofPoints.value.map((p) => p.y));

  const stepX = sheetSize.width - sheetSize.overlap;
  const stepY = sheetSize.height - sheetSize.overlap;

  let idCounter = 1;

  // Раскладываем листы в пределах границ крыши
  for (let y = minY; y + sheetSize.height <= maxY; y += stepY) {
    for (let x = minX; x + sheetSize.width <= maxX; x += stepX) {
      sheets.value.push({
        id: `sheet-${idCounter++}`,
        x,
        y,
        width: sheetSize.width,
        height: sheetSize.height,
      });
    }
  }
};
</script>

<template>
  <div>
    <button @click="addSheet">Добавить лист</button>
    <button @click="deleteSheet">Удалить лист</button>
    <button @click="resetDrawing">Сбросить чертеж</button>
    <button @click="fillRoofWithSheets">Заполнить черепицей</button>

    <v-stage style="background-color: #f0f0f0;" :config="stageConfig" @click="handleStageClick" @mousemove="handleMouseMove">
      <v-layer>
        <!-- Сетка -->
        <v-line
          v-for="(line, index) in gridLines"
          :key="index"
          :config="{
            points: line.points,
            stroke: '#ccc',
            strokeWidth: 1,
            dash: [4, 4],
          }"
        />

        <!-- Линейка (размеры) -->
        <v-text
          v-for="x in Math.floor(stageConfig.width / gridSize)"
          :key="'x' + x"
          :config="{
            x: x * gridSize - 10,
            y: 5,
            text: `${x * gridSize}`,
            fontSize: 10,
            fill: 'black',
          }"
        />
        <v-text
          v-for="y in Math.floor(stageConfig.height / gridSize)"
          :key="'y' + y"
          :config="{
            x: 5,
            y: y * gridSize - 10,
            text: `${y * gridSize}`,
            fontSize: 10,
            fill: 'black',
          }"
        />

        <!-- Линия крыши -->
        <v-line
          :config="{
            points: roofPoints.flatMap((p) => [p.x, p.y]),
            stroke: 'red',
            strokeWidth: 2,
            closed: roofCompleted,
            lineJoin: 'round',
          }"
        />

        <!-- Контур крыши -->
        <v-line
          :config="{
            points: roofPoints.flatMap((p) => [p.x, p.y]),
            stroke: 'red',
            strokeWidth: 2,
            closed: roofCompleted,
            lineJoin: 'round',
          }"
        />

        <!-- Временная линия для предварительного просмотра -->
        <v-line
          v-if="tempPoint && !roofCompleted"
          :config="{
            points: [...roofPoints.flatMap((p) => [p.x, p.y]), tempPoint.x, tempPoint.y],
            stroke: 'gray',
            strokeWidth: 1,
            dash: [4, 4], // Пунктирная линия
          }"
        />

        <!-- Отображение точек крыши -->
        <v-circle
          v-for="(point, index) in roofPoints"
          :key="index"
          :config="{
            x: point.x,
            y: point.y,
            radius: 5,
            fill: index === 0 ? 'blue' : 'black', // Первая точка выделена синим
          }"
        />

        <!-- Листы покрытия -->
        <v-rect
          v-for="sheet in sheets"
          :key="sheet.id"
          :config="{
            ...sheet,
            stroke: 'black',
            strokeWidth: 1,
          }"
          draggable
        />
      </v-layer>
    </v-stage>
  </div>
</template>

<style scoped>
button {
  margin: 5px;
  padding: 8px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
