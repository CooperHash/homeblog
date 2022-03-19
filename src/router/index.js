import Vue from 'vue'
import VueRouter from 'vue-router'
const Markdown = () => import('../components/Markdown.vue')
const ShowArticle = () => import('../views/article/ShowArticle.vue')
const ArticleDetail = () => import('../views/article/ArticleDetail.vue')
const Home = () => import('../views/Home.vue')
// const Japan = () => import('../views/language/Japan.vue')
const Language = () => import('../views/language/LanguageIndex.vue')
const JapanDetail = () => import('../views/language/japan/JapanDetail.vue')
const ChaoZhou = () => import('../views/language/chaozhou/CZ.vue')
const Reading = () => import('../views/reading/Reading.vue')
const ReadingInfo = () => import('../views/reading/ReadingInfo.vue')
const ReadingDetail = () => import('../views/reading/ReadingDetail.vue')
const User = () => import('../views/user/User.vue')
const AditArticle = () => import('../views/article/AditArticle.vue')
const NetWorkInfo = () => import('../views/network/NetWorkInfo.vue')
const Flex = () => import('../components/Flex.vue');
const NetWork = () => import('../views/article/network/NetWork.vue');
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/network',
    name: 'NetWork',
    component: NetWork
  },
  {
    path: '/flex',
    name: 'flex',
    component: Flex
  },
  {
    path: '/Markdown',
    name: 'Markdown',
    component: Markdown
  },
  {
    path: '/ShowArticle',
    name: 'ShowArticle',
    component: ShowArticle
  },
  {
    path: '/ArticleDetail',
    name: 'ArticleDetail',
    component: ArticleDetail
  },
  {
    path: '/Language',
    name: 'Language',
    component: Language
  },
  {
    path: '/JapanDetail',
    name: 'JapanDetail',
    component: JapanDetail
  },
  {
    path: '/ChaoZhou',
    name: 'ChaoZhou',
    component: ChaoZhou
  },
  {
    path: '/Reading',
    name: 'Reading',
    component: Reading
  },
  {
    path: '/ReadingInfo',
    name: 'ReadingInfo',
    component: ReadingInfo
  },
  {
    path: '/ReadingDetail',
    name: 'ReadingDetail',
    component: ReadingDetail
  },
  {
    path: '/User',
    name: 'User',
    component: User
  },
  {
    path: '/AditArticle',
    name: 'AditArticle',
    component: AditArticle
  },
  {
    path: '/NetWorkInfo',
    name: 'NetWorkInfo',
    component: NetWorkInfo
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem("user_token");
//   if(!token) return next('/User')
//   next()
// })

export default router
