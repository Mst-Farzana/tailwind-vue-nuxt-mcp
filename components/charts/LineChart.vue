<template>
  <canvas ref="canvasRef" />
</template>

<script setup>
import Chart from 'chart.js/auto';
import { onMounted, ref } from 'vue';

const props = defineProps({
  labels: {
    type: Array,
    default: () => [],
  },
  series: {
    type: Array,
    default: () => [],
  },
});

const canvasRef = ref(null);

onMounted(() => {
  new Chart(canvasRef.value, {
    type: 'line',
    data: {
      labels: props.labels,
      datasets: [
        {
          data: props.series,
        },
      ],
    },
  });
});
</script>
