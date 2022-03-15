<template>
  <div class="readingInfo_root">
    <div id="book">
      <div class="list">
        <div class="navList" v-for="item in navList" :key="item.id">
          <div class="nav">{{ item.nav }}</div>
        </div>
      </div>
      <div class="main">
        <div class="list">
          <div
            class="mainList"
            v-for="item in mainList"
            :key="item.id"
            @click="toDetail(item.id, item.person)"
          >
            <div class="person">{{ item.person }}</div>
            <div class="info">{{ item.info }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 0,
      value: "",
      canEditor: false,

      navList: [
        { id: 1, nav: "书评" },
        { id: 2, nav: "讨论" },
        { id: 3, nav: "读书笔记" },
      ],

      mainList: [],
    };
  },

  beforeMount: function () {},

  mounted: function () {
    // this.id = this.$store.state.readingId;
    // var id = 1;
    // var url = "/book/api/getBookInfoById?id=" + String(this.id);
    // this.$http.get(url).then((res) => {
    //   console.log("到达具体书本");
    //   res.data.forEach((item) => {
    //     this.mainList.push({
    //       id: id++,
    //       person: item.person,
    //       info: item.info,
    //     });
    //   });
    //   console.log(this.mainList);
    //   id = 1;
    // });
    setTimeout(() => {
      this.$store.state.bookList.forEach((item) => {
      this.mainList.push(item);
      console.log(item);
      console.log('item');
    })
    },500)
    // 为什么这里会比vuex慢？
  },

  methods: {
    editor() {
      this.canEditor = !this.canEditor;
    },

    finish() {
      this.canEditor = !this.canEditor;
    },

    toDetail(id, name) {
      this.$store.commit("setReadingDetailId", id);
      this.$store.commit("setReadingDetailName", name);
      console.log("准备跳转");
      console.log(this.$store.state.readingDetailName);
      console.log(this.$store.state.readingDetailId);
      this.$router.push({ path: "/ReadingDetail" });
    },
  },

  destroyed: function () {
    console.log("组件销毁");
  },
};
</script>

<style lang="less" scoped>
@media screen and (min-width: 1100px) {
  .readingInfo_root {
    width: 100%;
    #book {
      width: 100%;
      .list {
        width: 100%;
        margin-top: 90px;
        height: 50px;
        background-color: #f4f5f5;
        border-radius: 12px 12px 0 0;
        display: flex;
        justify-content: flex-start;

        .navList {
          margin-left: 20px;
          margin-right: 20px;

          .nav {
            position: relative;
            top: 15px;
            font-size: 16px;
          }
        }
      }

      .main {
        width: 100%;
        height: 800px;
        background-color: #f4f5f5;
        position: relative;
        top: -90px;

        .list {
          margin-left: 20%;
          margin-right: 20%;
          height: 600px;
          width: 600px;
          background-color: #f4f5f5;
          display: flex;
          flex-direction: column;

          .mainList {
            margin-left: 3%;
            margin-right: 3%;
            margin-top: 8px;
            margin-bottom: 10px;
            width: 580px;
            background-color: white;

            .person {
              text-align: left;
              opacity: 0.5;
              font-size: 15px;
              font-weight: 500;
              padding: 0 0 0 4px;
            }

            .info {
              text-align: left;
              font-size: 15px;
              font-weight: 500;
              padding: 4px 0 8px 4px;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 450px) {
  .readingInfo_root {
    width: 100%;
    #book {
      width: 100%;
      .list {
        width: 100%;
        margin-top: 90px;
        height: 50px;
        background-color: #f4f5f5;
        border-radius: 12px 12px 0 0;
        display: flex;
        justify-content: flex-start;

        .navList {
          margin-left: 20px;
          margin-right: 20px;

          .nav {
            position: relative;
            top: 15px;
            font-size: 16px;
          }
        }
      }

      .main {
        width: 100%;
        height: 380px;
        background-color: #f4f5f5;
        position: relative;
        top: -90px;

        .list {
          height: 100%;
          width: 340px;
          background-color: #f4f5f5;
          display: flex;
          flex-direction: column;

          .mainList {
            margin-left: 24px;
            margin-top: 8px;
            margin-bottom: 10px;
            width: 340px;
            background-color: white;

            .person {
              text-align: left;
              opacity: 0.5;
              font-size: 15px;
              font-weight: 500;
              padding: 0 0 0 4px;
            }

            .info {
              text-align: left;
              font-size: 15px;
              font-weight: 500;
              padding: 4px 0 8px 4px;
            }
          }
        }
      }
    }
  }
}
</style>