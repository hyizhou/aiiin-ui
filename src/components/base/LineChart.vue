<script setup>
// 一个简单的折线统计图
import {Line} from 'vue-chartjs'
import 'chartjs-adapter-luxon';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
  TimeSeriesScale
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    TimeScale,
    TimeSeriesScale
)

const props = defineProps({
  data: Object,
  options: Object
})

</script>

<template>
  <Line :data="props.data" :options="props.options"/>
</template>

<style scoped>

</style>