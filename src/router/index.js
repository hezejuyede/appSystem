import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: {title: '自述文件'},
            children: [
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/index/Dashboard.vue'], resolve),
                    meta: {title: '系统首页'}
                },

                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/configuration/Upload.vue'], resolve),
                    meta: {title: '文件上传'}
                },
                {
                    // 登陆页面配置
                    path: '/loginConfiguration',
                    component: resolve => require(['../components/page/configuration/loginConfiguration.vue'], resolve),
                    meta: {title: '登陆页面配置'}
                },
                {
                    // 注册页面配置
                    path: '/registerConfiguration',
                    component: resolve => require(['../components/page/configuration/registerConfiguration.vue'], resolve),
                    meta: {title: '注册页面配置'}
                },
                {
                    // 注册页面配置
                    path: '/bottomNavigationConfiguration',
                    component: resolve => require(['../components/page/configuration/bottomNavigationConfiguration.vue'], resolve),
                    meta: {title: '注册页面配置'}
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/err/Permission.vue'], resolve),
                    meta: {title: '权限测试', permission: true}
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/err/404.vue'], resolve),
                    meta: {title: '404'}
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/err/403.vue'], resolve),
                    meta: {title: '403'}
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/login/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
