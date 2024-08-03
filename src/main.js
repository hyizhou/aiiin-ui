import './assets/default.css'

import { createApp } from 'vue'
import App from './App.vue'
import Router from "@/router/index.js";
// 引入腾讯的tdesgin
import TDesign from 'tdesign-vue-next'
import 'tdesign-vue-next/es/style/index.css'
//引入 echarts
import * as echarts from 'echarts'

const app = createApp(App)
app.use(TDesign)
app.use(Router)
app.mount('#app')
