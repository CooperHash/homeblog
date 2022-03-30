<template>
  <div class="showArticle_page">
    <three>
      <template v-slot:navList>
        <li :style="validateList.validate1 ? enable : disable" @click="toAll">全部</li>
        <li :style="validateList.validate2 ? enable : disable" @click="toJs">Js</li>
        <li :style="validateList.validate3 ? enable : disable" @click="toVue">Vue</li>
      </template>
      <template v-slot:article>
        <div class="article">
          <div class="item" v-for="i in array" :key="i.id" @click="toDetail(i.id)">
            <div class="item-title">{{ i.title }}</div>
            <div class="item-info">{{ i.info.substring(0, 36) }}</div>
          </div>
        </div>
      </template>
      <template v-slot:search>
        <div class="search">
          <input placeholder="检索文章" />
        </div>
      </template>
    </three>
  </div>
</template>

<script>
import Three from "../../position/Three.vue";
export default {
  components: { Three },
  data() {
    return {
      content: "",
      validateList: {
        validate1: false,
        validate2: false,
        validate3: false,
      },
      enable: {
        backgroundColor: "lightskyblue",
      },
      disable: {
        backgroundColor: "#fff",
      },
      array: [],
    };
  },

  mounted: function () {
    console.log("欢迎来到文章仓库~");
    console.log("初始化数组~");
    this.$http.get("/blog/api/getArticle").then((res) => {
      res.data.data.forEach((element) => {
        this.array.push(element);
      });
      console.log("数据转移：");
      console.log(this.array);
    });
    this.$store.dispatch("setDefaultContent");

    let search = document.querySelector('input');
    var throttled = this.lodash.throttle(this.find, 2000);
    search.addEventListener("input", throttled);
  },

  methods: {
    toDetail(id) {
      // 这个文章id应该是每个分类下的排序id
      // id是在array中的id决定的，array是选择每个分类的数组
      this.$store.commit("setId", id);

      setTimeout(() => {
        this.$router.push({ path: "/ArticleDetail" });
      });
    },

    toDiff(id) {
      this.$store.state.groupId = id;
      if (id !== 0) {
        this.$store.dispatch("setArticleContent");
      } else {
        this.$store.dispatch("setDefaultContent");
      }
      switch (id) {
        case 0:
          this.array = [];
          this.$http.get("/blog/api/getArticle").then((res) => {
            res.data.data.forEach((element) => {
              this.array.push(element);
            });
          });
          break;

        case 1:
          this.array = [];
          this.$http.get("/blog/api/getJs").then((res) => {
            res.data.data.forEach((element) => {
              this.array.push(element);
            });
          });
          break;

        case 2:
          this.array = [];
          this.$http.get("/blog/api/getV").then((res) => {
            res.data.data.forEach((element) => {
              this.array.push(element);
            });
          });
          break;
      }
    },

    toAll() {
      this.array = [];
      this.$http.get("/blog/api/getArticle").then((res) => {
        res.data.data.forEach((element) => {
          this.array.push(element);
        });
      });
    },

    toJs() {
      this.array = [];
      this.$http.get("/blog/api/getJs").then((res) => {
        res.data.data.forEach((item) => {
          this.array.push(item);
        });
      });
    },

    toVue() {
      this.array = [];
      this.$http.get("/blog/api/getV").then((res) => {
        res.data.data.forEach((item) => {
          this.array.push(item);
        });
      });
    },

    find() {
      console.log("触发一次搜索");
      var target = this.content;

      this.array = [];
      this.$http.get("/blog/api/getArticle").then((res) => {
        res.data.data.forEach((element) => {
          var info = element.info;
          if (info.search(target) !== -1) {
            this.array.push(element);
          }
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
@media all and (min-width: 860px) {
  .showArticle_page {
    .search {
      position: relative;
      top: 1vh;
      margin: auto;
      width: 22vw;
      height: 12vh;
      input {
        font-size: 16px;
        width: 20vw;
        height: 10vh;
      }
    }

    .article {
      margin-top: 13vh;
      overflow: scroll;
      justify-content: center;
      align-items: center;
      width: 48vw;
      margin: auto;
      .item {
        margin-top: 5vh;
        width: 45vw;
        background-color: #fff;
        .item-info {
          padding: 6vh;
          text-align: left;
          font-weight: 450;
          font-size: 18px;
          line-height: 16px;
          color: #333;
        }

        .item-title {
          position: absolute;
          color: #34538b;
          font-weight: bold;
          font-size: 18px;
          margin-top: 1vh;
          margin-left: 1vw;
        }
      }
    }
  }
}

@media all and (max-width: 450px) {
  .showArticle_root {
    background-image: url("https://cdn.homeblog.top/uPic/PAUVWh.png");
    background-size: 100%;
    background-attachment: fixed;
    display: flex;
    .left {
      width: 33%;
    }

    .middle {
      width: 100%;
      background-color: #fff;
      opacity: 0.78;
      .category {
        margin-left: 20px;
        margin-right: 20px;
        margin-bottom: 40px;
        display: flex;
        flex-wrap: wrap;
        height: 80px;

        .navList {
          width: 86px;
          height: 42px;
          border-radius: 6px;
          background-color: #f6f7f8;
          cursor: pointer;

          .nav {
            color: #61666d;
            font-weight: 500;
            padding: 10px 0;
            font-size: 14px;
          }
        }
      }
      .search {
        position: relative;
        left: 70px;
        top: -30px;
        input {
          width: 120px;
          height: 35px;
        }
      }
      .list {
        display: flex;
        flex-direction: column;

        .itemList {
          width: 320px;
          position: relative;
          top: -24px;
          .items {
            margin: auto;
            margin-bottom: 12px;
            width: 320px;
            height: 100px;
            background-color: #fff;
            display: flex;
            flex-direction: column;
            border-radius: 12px;
            // box-shadow: 0 2px 8px 0 rgb(0, 0, 0 / 2%);

            .title {
              cursor: pointer;
              line-height: 1.25;
              text-align: justify;
              font-size: 19px;
              font-weight: bolder;
              // color: #527ed1;
              color: #1d2129;
              margin-left: 4px;
              height: 50px;
              padding: 10px;
            }

            .info {
              height: auto;
              margin-left: 4px;
              margin-bottom: 18px;
              text-align: left;
              align-content: center;
              font-size: 13px;
              font-weight: bolder;
              color: #86909c;
              padding: 10px;
            }
          }
        }
      }
    }

    .right {
      width: 33%;
    }
  }
}
</style>