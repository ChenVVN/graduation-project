import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "dashboard" },
      },
    ],
  },

  {
    path: "/datasheet",
    component: Layout,
    redirect: "/datasheet/list",
    name: "datasheet",
    meta: { title: "物性表", icon: "form" },
    alwaysShow: true,
    children: [
      {
        path: "list",
        name: "DatasheetList",
        component: () => import("@/views/Datasheet/DatasheetList"),
        meta: { title: "材料总类", icon: "sort" },
      },
    ],
  },
  {
    path: "/application",
    component: Layout,
    redirect: "/application/list",
    name: "application",
    alwaysShow: true,
    meta: { title: "应用库", icon: "app" },
    children: [
      {
        path: "list",
        name: "classification",
        component: () => import("@/views/Application/Classification.vue"),
        meta: { title: "应用类别", icon: "sort" },
      },
    ],
  },
  {
    path: "/filler",
    component: Layout,
    children: [
      {
        path: "index",
        name: "filler",
        component: () => import("@/views/Datasheet/FillerList"),
        meta: { title: "填充物", icon: "nested" },
      },
    ],
  },
  {
    path: "/use",
    component: Layout,
    children: [
      {
        path: "index",
        name: "use",
        component: () => import("@/views/Application/UseList.vue"),
        meta: { title: "用途", icon: "tree" },
      },
    ],
  },
  {
    path: "/news",
    component: Layout,
    redirect: "/news/list",
    name: "news",
    meta: { title: "资讯库", icon: "form" },
    children: [
      {
        path: "list",
        component: () => import("@/views/News/NewsList"),
        meta: { title: "资讯库", icon: "form" },
      },
    ],
  },
  {
    path: "/system",
    component: Layout,
    name: "system",
    meta: { title: "系统管理", icon: "system" },
    alwaysShow: true,
    children: [
      {
        path: "center",
        component: () => import("@/views/System//PersonalCenter"),
        meta: { title: "个人中心", icon: "user" },
      },
    ],
  },


  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    mode: "history", // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
