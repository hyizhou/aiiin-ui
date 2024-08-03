<script setup>
import {onMounted, ref, watch} from "vue";
import {Icon, NotificationIcon} from 'tdesign-icons-vue-next';
import {MessagePlugin} from "tdesign-vue-next";
import {useRouter} from "vue-router";

const theme = ref('light')
const searchText = ref()
const themMode = ref('light')
const activeMenu = ref('0')
const router = useRouter();

// 切换全局主题
watch(themMode, (value) => {
  console.log("改变主题" + value)
  document.documentElement.setAttribute('theme-mode', themMode.value);
})


watch(searchText, (value) => {
  console.log("搜索内容：" + value)
})

// 进行搜索
function doSearch() {
  console.log("进行了搜索")
  MessagePlugin.info(
      {
        content: "你进行了搜索，内容为:" + searchText.value,
        duration: 1000,
        placement:"top-left"
      }
  )
}

// 主页按钮
function goHome(){
  console.log("点击了主页按钮")
  activeMenu.value = "0"
  router.push("/")
}

</script>

<template>
  <t-layout>
    <t-header >
      <t-head-menu class="top-menu" v-model="activeMenu">
        <template #logo>
          <t-button variant="text" shape="circle" :onClick="goHome">
            <icon name="home" size="20px" title="首页"/>
          </t-button>

        </template>
        <t-menu-item value="1" to="/status">
          系统状态
        </t-menu-item>
        <t-menu-item value="2" to="/chat" :disabled="true">
          AI助手
        </t-menu-item>
        <t-menu-item value="6" to="/translate" :disabled="false">
          钛新翻译
        </t-menu-item>
        <t-menu-item value="3" to="/file" :disabled="true">
          文件管理
        </t-menu-item>
        <t-menu-item value="4" to="/download" :disabled="true">
          下载器
        </t-menu-item>
        <t-menu-item  value="5" to="/tools" >
          常用工具
        </t-menu-item>
        <t-menu-item value="7" to="/test" :disabled="false">
          测试页
        </t-menu-item>



        <template #operations>
          <!--搜索框-->
          <t-space align="baseline" size="20px">
            <t-input v-model="searchText" clearable="" placeholder="搜索" :onEnter="doSearch">
              <template #suffixIcon>
                <t-icon name="search"/>
              </template>
            </t-input>
            <!--暗亮主题切换开关-->
            <t-space size="0px">
              <icon name="sunny" style="color: orange" size="large" v-show="theme === 'light'"/>
              <icon name="moon" style="color: wheat" size="large" v-show="theme === 'dark'"/>
              <t-switch :label="['暗', '亮']" v-model="themMode" :custom-value="['dark', 'light']"/>
            </t-space>
            <div>
              <!--通知中心，点击显示历史通知消息，提示通知存储于此，通知点击后消失-->
              <t-button variant="text" shape="circle" @click="()=>{MessagePlugin.info({content:'点击了通知中心',duration:1000,placement:'top-left'})}">
                <NotificationIcon size="1.5em"/>
              </t-button>

            </div>
          </t-space>
        </template>

      </t-head-menu>

    </t-header>
    <t-layout id="main-layout">
      <t-layout>
        <t-content>
          <div class="content">
            <router-view/>
          </div>
        </t-content>
        <t-footer style="text-align: center">
          <p>这里是页脚</p>
        </t-footer>
      </t-layout>
    </t-layout>
  </t-layout>
</template>

<style scoped>
#main-layout {
  height: calc(100vh - 56px);
  overflow-y: auto;  /* 让内容在容器内滚动 */
  background: url("assets/icon/low-poly-grid-haikei.svg");
}


.top-menu {
  position: fixed; /* 顶部菜单固定显示 */
  top: 0;
  left: 0;
  right: 0;
  z-index: 1030; /* 高于页面其他元素的z-index值 */
}


</style>
