import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Icon from 'ant-design-vue/lib/icon'
import Button from 'ant-design-vue/lib/button';
import Divider from 'ant-design-vue/lib/divider';
import Back from 'ant-design-vue/lib/back-top'
import 'ant-design-vue/dist/antd.css';
import Header from './components/Header.vue'
import Add from './components/Add.vue'
import Markdown from './components/Markdown.vue'
import Language from './views/language/Language.vue'
import ArticleDetail from './views/article/ArticleDetail.vue'
import instance from './utils/http'
import lodash from 'lodash'
import Pop from './components/Popout.vue'
import Flex from './components/Flex.vue'
Vue.component('pop-out',Pop);
Vue.component('add-article',Add);
Vue.component('blog-header',Header);
Vue.component('mark-down', Markdown);
Vue.component('article-detail',ArticleDetail);
Vue.component('get-language',Language);
Vue.component(Button.name, Button);
Vue.component(Icon.name, Icon)
Vue.component('a-divider',Divider);
Vue.component('a-back-top',Back);
Vue.component('flex',Flex);

Vue.prototype.$http = instance
Vue.prototype.lodash = lodash
Vue.config.productionTip = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
