import Vue from 'vue'
import Vuex from 'vuex'
import instance from '../utils/http'
Vuex.Store.prototype.$http = instance
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    flag: true,
    artiId: 0,
    add_show: false,
    comment_id: 0,

    japanId: 0,
    czId: 0,

    page: 1,

    readingId: 0,
    readingDetailId: 0,
    readingName: '',

    // 分类id
    groupId: 0,

    // 每个分类的文章数组
    contentList: [],

    // 每本书的观后感集合
    bookList: []
  },

  getters: {
    bookList: (state) => {
      return state.bookList
    }
  },


  mutations: {
    turnFlag(state) {
      state.flag = !state.flag;
    },

    setId(state, id) {
      state.artiId = id;
    },

    setGroupId(state, id) {
      state.groupId = id;
    },

    setAdd(state) {
      state.add_show = !state.add_show
    },

    saveCommentId(state, id) {
      state.comment_id = id
    },

    setJapanId(state, id) {
      state.japanId = id
    },

    setChaoZhouId(state, id) {
      state.czId = id
    },


    setPage(state, page) {
      state.page = page
    },

    setReading(state, id) {
      state.readingId = id
    },

    setReadingDetailId(state, id,) {
      state.readingDetailId = id;
    },

    setReadingDetailName(state, name) {
      state.readingName = "";
      state.readingName = name;
    },

    setArticleContent(state, putIn) {
      state.contentList = [...putIn];
      console.log('state.contentList:    ');
      console.log(state.contentList);
    },


    setDefaultContent(state, putIn) {
      state.contentList = [...putIn];
      console.log('state.contentList:    ');
      console.log(state.contentList);
    },

    setNetWorkContent(state, putIn) {
      state.contentList = [...putIn];
      console.log('state.contentList:    ');
      console.log(state.contentList);
    },
    
    setDefaultNetWork(state, putIn) {
      state.contentList = [...putIn];
      console.log('state.contentList:    ');
      console.log(state.contentList);
    },

    setAfterReadingList(state, putIn) {
      state.bookList = [...putIn];
      console.log('state.bookList:    ');
      console.log(state.bookList);
    }
  },

  actions: {
    setDefaultContent(context) {
      var content_url = '/blog/api/getArticle'
      this.$http
        .get(content_url)
        .then((res) => {
          console.log('文章列表分组结果：');
          console.log(res);
          context.commit('setDefaultContent', res.data.data)
        })
    },

    setDefaultNetWork(context) {
      var content_url = '/blog/api/getNetWork'
      this.$http
        .get(content_url)
        .then((res) => {
          console.log('文章列表分组结果：');
          console.log(res);
          context.commit('setDefaultNetWork', res.data.data)
        })
    },



    setArticleContent(context) {
      var content_url = "/blog/api/getArticleByGroup?id=" + String(this.state.groupId);
      this.$http
        .get(content_url)
        .then((res) => {
          console.log('文章列表分组结果：');
          console.log(res);
          context.commit('setArticleContent', res.data.data)
        })
    },

    setNetWorkContent(context) {
      var content_url = "/blog/api/getNetWorkByGroup?id=" + String(this.state.groupId);
      this.$http
        .get(content_url)
        .then((res) => {
          console.log('文章列表分组结果：');
          console.log(res);
          context.commit('setNetWorkContent', res.data.data)
        })
    },


    setAfterReadingList(context) {
      var content_url = "/book/api/getBookDetailById?id=" + String(this.state.readingId);
      this.$http
        .get(content_url)
        .then((res) => {
          context.commit('setAfterReadingList',res.data);
        })
    }
  },
  modules: {
  }
})
