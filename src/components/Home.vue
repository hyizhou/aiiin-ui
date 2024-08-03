<script setup>
import {onMounted, ref} from "vue";
import {MessagePlugin} from "tdesign-vue-next";
import MegBox from './base/MegBox.vue'
import LineChart from "./base/LineChart.vue";

const infoMessage = ref("")
const hasLoaded = ref(true)  // 异步加载是否完成的标志
const range = ref([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16])  // 测试数据，记得删除

onMounted(() => {
  fetch('http://localhost:8081/home/daily-quote')
      .then(resp => resp.text())
      .then(data => infoMessage.value = data)
      .catch(error => {
        MessagePlugin.error("每日一句获取失败")
        console.error(error)
      })
})

const data = ref({  //测试数据
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: '每日',
      backgroundColor: '#f87979',
      data: [40, 39, 10, 40, 39, 80, 40]
    }
  ]
})

const options = ref({  // 测试数据
  responsive: true,
  maintainAspectRatio: true
})
const text = ref("这是很长的字符哦,asdjkfasjdlkf,asdfasdf,// 定义需要的 props\n" +
    "const props = defineProps({\n" +
    "  title: String,\n" +
    "  content: {\n" +
    "    type: String,\n" +
    "    default: 'Default Content',\n" +
    "    required: true,\n" +
    "  },\n" +
    "});")


</script>

<template>
  <t-space direction="vertical" align="start" :break-line="true" style="width: 100%">
    <div style="height: 20px"></div>
    <t-card title="每日一句" :header-bordered="true">
        {{infoMessage}}
    </t-card>
    <t-card>
      <LineChart :data="data" :options="options" v-if="hasLoaded"/>
    </t-card>
    <t-card title="最新消息" :header-bordered="true" class="new-messages">

      <MegBox :text="text" class="msg-box" v-for="i in range"/>
      <!--<MegBox :text="text" class="msg-box"/>-->
    </t-card>
  </t-space>



</template>

<style scoped>
.msg-box + .msg-box {
  margin-top: 10px;
  border-top: 1px dashed rgba(49, 49, 49, 0.2);
  padding-top: 10px;
}
</style>