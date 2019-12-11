import Vue from 'vue'
import Router from 'vue-router'
import Annotation from '@/components/Annotation'
import Inspection from '@/components/Inspection'

Vue.use(Router)

let router = new Router({
  // mode: 'history',
  routes: [
    { path: '/annotation', component: Annotation },
    { path: '/inspection', component: Inspection },
  ]
})

// router.beforeEach((to, from, next) => {
//   let permittedPath = ['/']

//   let isSuper = Vue.prototype.$cookies.get('_admin_permission') === 'super'
//   let isInspector = Vue.prototype.$cookies.get('_admin_permission') === 'inspector'
//   if (isInspector) permittedPath.push('/annotation')
//   if (isInspector) permittedPath.push('/final')
//   if (isInspector) permittedPath.push('/grouping')
//   if (isInspector) permittedPath.push('/final_grouping')

//   let isNormal = Vue.prototype.$cookies.get('_admin_permission') === 'normal'
//   if (isNormal) permittedPath.push('/annotation')
//   if (isNormal) permittedPath.push('/grouping')

//   if (!isSuper && !permittedPath.includes(to.path)) return next('/')

//   next()
// })

export default router