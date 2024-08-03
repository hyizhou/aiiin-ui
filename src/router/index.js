// 路由配置
import { createRouter, createWebHistory } from 'vue-router';
// import VueRouter from 'vue-router';

const routers = [
    {
        path: '/',
        alias: '/home',
        component: () => import('../components/Home.vue')
    },
    {
        path: "/status",
        component: () => import('../components/SystemStatus.vue')
    },
    {
        path: '/copilot',
        component: () => import('../components/AICopilot.vue')
    },
    {
        path: '/explorer',
        component: () => import('../components/FileExplorer.vue')
    },
    {
        path: '/tools',
        component: () => import('../components/Tools.vue')
    },
    {
        path: '/translate',
        component: () => import('../components/Translate.vue')
    },
    {
        path: '/login',
        component: () => import('../components/Test.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routers
});

function isLoggedIn(){
    return false;
}

// 开启登录验证
function checkLogin() {
    router.beforeEach((to, from, next) => {
        console.log(isLoggedIn());
        if (to.meta.requiresAuth && !isLoggedIn()){
            console.log("跳转到登录页");
            next("/login")
        }else {
            console.log("无跳转");
            next();
        }
    });
}

// 开启登录验证则打开下面注释
// checkLogin();


export default router;