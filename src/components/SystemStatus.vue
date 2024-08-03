<script setup>
import {computed, onMounted, reactive, ref, toRaw} from "vue";
import LineChart from "./base/LineChart.vue"
import {generateLineChartData} from "@/assets/javascript/ChartTemplate.js"
import {netSpeedInit,netSpeedDataList} from "@/assets/javascript/netSpeed.js";

const memoryData = ref({})
const memoryOptions = ref({})
const memoryDisplay = ref(false)
const swapMemory = reactive({
  data: null,
  options: null,
  display: false
})


onMounted(() => {
  // 初始化网速相关数据
  // netSpeedInit()
  setInterval(netSpeedInit, 1000)
})


let sss = [ 1389, 1122,500,500,500 ]
let newsss = [1589, 2122,400,200,900 ]
let liable = ["18:00", "18:01", "18:02", "18:03", "18:05"]




</script>

<template>
  <div style="text-align: center;margin-top: 20px">
    <t-card title="系统概述">
      系统负载：1分钟、10分钟、1小时 <br>
      当前温度：cpu、硬盘，风扇转速 <br>
      CPU负载：20%，10%，99%，0% <br>
      硬盘读写：100 MB/s, 20 MB/s <br>
      实时网速：xxx KB/s <br>
      内存占用：xxx G / yy G <br>

    </t-card>
    <h1>基础信息</h1>
    <t-button :onClick="updateMe">刷新网速数据</t-button>
  </div>
  <t-space style="width: 100%" direction="vertical">
    <t-card title="网速">
      <div  v-for="(item, index) in netSpeedDataList" :key="index" >
        <LineChart :data="item.data" :options="item.options"/>
      </div>

    </t-card>

    <t-card>
      <!--内存图表-->
      <LineChart :data="memoryData" :options="memoryOptions" v-if="memoryDisplay"/>
    </t-card>
    <t-card>
      <!--虚拟内存图-->
      <LineChart :data="swapMemory.data" :options="swapMemory.options" v-if="swapMemory.display"/>
    </t-card>

  </t-space>

</template>

<style scoped>

</style>