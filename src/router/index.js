import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * 定义组件名称和组件对象的map对象
*/
export const componentMap = {
  'layout': require('@/layout').default,
  'redirect_index': () => import('@/views/redirect/index').then(m=>m.default),
  'login_index': () => import('@/views/login/index').then(m=>m.default),
  'login_auth_redirect': () => import('@/views/login/auth-redirect').then(m=>m.default),
  'error_page_404': () => import('@/views/error-page/404').then(m=>m.default),
  'error_page_401': () => import('@/views/error-page/401').then(m=>m.default),
  'dashboard_index': () => import('@/views/dashboard/index').then(m=>m.default),
  'documentation_index': () => import('@/views/documentation/index').then(m=>m.default),
  'guide_index': () => import('@/views/guide/index').then(m=>m.default),
  'profile_index': () => import('@/views/profile/index').then(m=>m.default),
  'permission_menu': () => import('@/views/permission/menu').then(m=>m.default),
  'permission_resource': () => import('@/views/permission/permResource').then(m=>m.default),
  'permission_role': () => import('@/views/permission/role').then(m=>m.default),
  'user_role': () => import('@/views/permission/user').then(m=>m.default),
  'icons_index': () => import('@/views/icons/index').then(m=>m.default),
  'table_complex-table': () => import('@/views/table/complex-table').then(m=>m.default),
  'assocaition_audit': () => import('@/views/assocaition/audit/index').then(m=>m.default),
  'assocaition_list': () => import('@/views/assocaition/list/index').then(m=>m.default),
  'assocaiyion_child': () => import('@/views/assocaition/child/index').then(m=>m.default),
  'assocaition_info': () => import('@/views/assocaition/info/index').then(m=>m.default),
  'assocaition_distribution': () => import('@/views/assocaition/distribution/index').then(m=>m.default),
  'member_audit': () => import('@/views/member/audit/index').then(m=>m.default),
  'member_list': () => import('@/views/member/list/index').then(m=>m.default),
  'examine_audit': () => import('@/views/examine/audit/index').then(m=>m.default),
  'examine_list': () => import('@/views/examine/list/index').then(m=>m.default),
  'announcement': () => import('@/views/announcement/index').then(m=>m.default),
  'announcement_email': () => import('@/views/announcement/email/index').then(m=>m.default),
  'my_task': () => import('@/views/announcement/task/index').then(m=>m.default),
  'activity_audit': () => import('@/views/activity/audit/index').then(m=>m.default),
  'activity_list': () => import('@/views/activity/list/index').then(m=>m.default),
  'addAssocationChild': () => import('@/views/assocaition/child/addAssocationChild').then(m=>m.default),


}

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   设置菜单是否隐藏（不显示在左边菜单，缺省false）
 * alwaysShow: true               设置在一级菜单上，是否总是显示，true表示总是显示
 *                                如果为false，一级菜单只会在有多个子菜单情况下才显示
 * redirect: noRedirect           如果设置成noRedirect，面包屑不会重定向
 * name:'router-name'             路由名称，必须设置，且唯一
 * meta : {
    roles: ['admin','editor']    允许路由的角色列表
    title: 'title'               显示在左边导航栏和面包屑上的名称
    icon: 'svg-name'/'el-icon-x' 图标名称
    noCache: true                页面是否不要缓存，缺省为false
    affix: true                  标签页面是否总是显示（不能关闭）
    breadcrumb: false            缺省true，是否以面包屑显示页面
    activeMenu: '/example/list'  在左边菜单上高亮显示
  }
 */


/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 * 基本路由表，所有用户都可以访问的路由表
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: () => import('@/views/dashboard/index'),
  //       name: 'Dashboard',
  //       meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
  //     }
  //   ]
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '数据统计', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 * 异步路由表
 * 只有拥有权限（对应角色）的用户，才能显示的路由表
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'Example',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'Create Article', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'Article List', icon: 'list' }
      }
    ]
  },

  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'Tab', icon: 'tab' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: 'Error Log', icon: 'bug' }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'Excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: 'Export Excel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel'),
        name: 'SelectExcel',
        meta: { title: 'Export Selected' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header'),
        name: 'MergeHeader',
        meta: { title: 'Merge Header' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'Upload Excel' }
      }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    name: 'Zip',
    meta: { title: 'Zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'Export Zip' }
      }
    ]
  },

  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index'),
        name: 'PDF',
        meta: { title: 'PDF', icon: 'pdf' }
      }
    ]
  },
  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true
  },

  {
    path: '/theme',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'Theme', icon: 'theme' }
      }
    ]
  },

  {
    path: '/clipboard',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'Clipboard', icon: 'clipboard' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]


//创建动态路由
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
