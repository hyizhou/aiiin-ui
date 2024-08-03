<script setup>
// 展示一些常用工具
import {ref, watch} from "vue";
import {Icon} from "tdesign-icons-vue-next";

const unitConversionByte = ref(0)
const unitConversionKB = ref(0)
const unitConversionMB = ref(0)
const unitConversionGB = ref(0)
// 时间转换工具
const timeUnit1 = ref("1")
const timeUnit2 = ref("1")
const timeData1 = ref(0)
const timeData2 = ref(0)

watch(unitConversionByte, (newValue) => {
  unitConversionKB.value = newValue / 1024;
  unitConversionMB.value = newValue / (1024 * 1024);
  unitConversionGB.value = newValue / (1024 * 1024 * 1024);
});

watch(unitConversionKB, (newValue) => {
  unitConversionByte.value = newValue * 1024;
  unitConversionMB.value = newValue / 1024;
  unitConversionGB.value = newValue / (1024 * 1024);
});

watch(unitConversionMB, (newValue) => {
  unitConversionByte.value = newValue * (1024 * 1024);
  unitConversionKB.value = newValue * 1024;
  unitConversionGB.value = newValue / 1024;
});

watch(unitConversionGB, (newValue) => {
  unitConversionByte.value = newValue * (1024 * 1024 * 1024);
  unitConversionKB.value = newValue * (1024 * 1024);
  unitConversionMB.value = newValue * 1024;
});


const timeOptions = [
  {
    label: '毫秒',
    value: '1',
  },
  {
    label: '微秒',
    value: '2',
  },
  {
    label: '秒',
    value: '3',
  },
  {
    label: '分',
    value: '4',
  },
  {
    label: '时',
    value: '5',
  },
  {
    label: '天',
    value: '6',
  },
  {
    label: '周',
    value: '7',
  },
  {
    label: '月',
    value: '8',
  },
  {
    label: '年',
    value: '9',
  },
]
function convertTime(value, fromUnit, toUnit) {
  const units = {
    '1': 1,
    '2': 1000,
    '3': 1000000,
    '4': 60000000,
    '5': 3600000000,
    '6': 86400000000,
    '7': 604800000000,
    '8': 2629800000000, // 假设平均每月30.44天
    '9': 31557600000000  // 使用公历年的平均长度
  };
  console.log("当前的单位--fromUnit="+fromUnit + "  toUnit="+toUnit)
  // 检查单位是否有效
  if (!units[fromUnit] || !units[toUnit]) {
    throw new Error('无效的单位');
  }

  // 计算基于“秒”的中间值
  const valueInSeconds = value * units[fromUnit];
  // 转换到目标单位
  return valueInSeconds / units[toUnit];
}

watch(timeUnit1, (newValue) => {
  timeData1.value = convertTime(timeData2.value, timeUnit2.value, newValue)
})

watch(timeUnit2, (newValue) => {
  timeData2.value = convertTime(timeData1.value, timeUnit1.value, newValue)
})

watch(timeData1, (newValue) => {
  timeData2.value = convertTime(newValue, timeUnit1.value, timeUnit2.value)
})

watch(timeData2, (newValue) => {
  timeData1.value = convertTime(newValue, timeUnit2.value, timeUnit1.value)
})

</script>

<template>
  <t-space direction="vertical" style="margin-top: 10px">
    <t-space direction="horizontal">
      <t-card title="存储单位换算">
        <t-input-adornment prepend="字节 byte">
          <t-input v-model="unitConversionByte" type="number"/>
        </t-input-adornment>
        <t-input-adornment prepend="千字节 KB">
          <t-input v-model="unitConversionKB"  type="number"/>
        </t-input-adornment>
        <t-input-adornment prepend="兆字节 MB">
          <t-input v-model="unitConversionMB"  type="number"/>
        </t-input-adornment>
        <t-input-adornment prepend="吉字节 GB">
          <t-input v-model="unitConversionGB"  type="number"/>
        </t-input-adornment>
      </t-card>
      <t-card title="时间单位换算">
      <!--毫秒、微秒、秒、分、时、天、月、年-->
        <div style="display: flex;justify-content: space-between;align-items: center">
          <t-select v-model="timeUnit1" :options="timeOptions" :borderless="true" style="width: 100px; display: inline-block"/>
          <icon name="arrow-left-right-1"/>
          <t-select v-model="timeUnit2" :options="timeOptions" :borderless="true" style="width: 100px; display: inline-block"/>
        </div>
        <t-input placeholder="请输入时间" type="number" v-model="timeData1"/>
        <t-input placeholder="请输入时间" type="number" v-model="timeData2"/>

      </t-card>
    </t-space>

  </t-space>

</template>

<style scoped>

</style>