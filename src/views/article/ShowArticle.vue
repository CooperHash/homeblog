<template>
  <div class="showArticle_root">
    <!-- <a-list :grid="{ gutter: 16, column: 4 }" :data-source="array">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-card :title="item.title"> Card content </a-card>
      </a-list-item>
    </a-list> -->
    <a-back-top />
    <div class="left"></div>
    <div class="middle">
      <div class="category">
        <!-- <div class="navList">
          <Menu :menuList="menu"></Menu>
        </div> -->
        <div
          class="navList"
          @click="toDiff(item.id)"
          v-for="item in navList"
          :key="item.id"
        >
          <div class="nav">{{ item.nav }}</div>
        </div>
      </div>
      <div class="search">
        <input v-model="content" placeholder="检索文章" id="search" />
      </div>
      <div class="list">
        <div
          class="itemList"
          v-for="item in array"
          :key="item.id"
          @click="toDetail(item.id)"
        >
          <div class="items">
            <div class="title">{{ item.title }}</div>
            <div class="info">
              内容简介：
              {{
                (item.info =
                  item.info.length > 20
                    ? item.info.substring(0, 35)
                    : item.info)
              }}
            </div>
          </div>
          <a-divider />
        </div>
      </div>
    </div>
    <div class="right">
      <add-article></add-article>
    </div>
  </div>
</template>

<script>
// import Menu from '../../components/Menu.vue'
export default {
  data() {
    return {
      content: "",
      navList: [
        { id: 0, nav: "全部" },
        { id: 1, nav: "JavaScript" },
        { id: 2, nav: "V8" },
        { id: 3, nav: "CSS" },
        { id: 4, nav: "Node" },
        { id: 5, nav: "Vue" },
        { id: 6, nav: "React" },
        { id: 7, nav: "FP" },
      ],
      array: [],
      menu: [
        { id: 0, name: 'JS'},
        { id: 1, name: 'Vue'},
        { id: 2, name: '杂谈'}
      ]
    };
  },

  // components: {
  //   Menu
  // },


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

    const search = document.getElementById("search");
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

    getAll() {
      this.array = [];
      this.$http.get("/blog/api/getArticle").then((res) => {
        res.data.data.forEach((element) => {
          this.array.push(element);
        });
      });
    },

    getJs() {
      this.array = [];
      this.$http.get("/blog/api/getJs").then((res) => {
        res.data.data.forEach((item) => {
          this.array.push(item);
        });
      });
    },

    getV() {
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
          const len = element.info.length;
          var info = element.info;
          if (info.search(target) !== -1) this.array.push(element);
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
@media all and (min-width: 860px) {
  .showArticle_root {
    display: flex;
    .left {
      width: 33%;
    }

    .middle {
      width: 100%;
      background-color: #fff;
      .category {
        margin-left: 20px;
        margin-right: 20px;
        display: flex;
        justify-content: space-between;

      }
      .search {
        position: relative;
        left: 600px;
        width: 106px;
        height: 41px;
        border: solid lightskyblue;

        input {
          width: 100px;
          height: 35px;
          outline: none;
        }
      }
      .list {
        display: flex;
        flex-direction: column;

        .itemList {
          width: 720px;
          margin: auto;
          margin-bottom: 0px;
          .items {
            margin: auto;
            margin-bottom: 12px;
            width: 720px;
            height: 180px;
            background-color: #fff;
            display: flex;
            flex-direction: column;
            border-radius: 12px;
            // box-shadow: 0 2px 8px 0 rgb(0, 0, 0 / 2%);

            .title {
              cursor: pointer;
              line-height: 1.25;
              text-align: justify;
              font-size: 24px;
              margin-top: 10px;
              font-weight: bolder;
              // color: #527ed1;
              color: #1d2129;
              margin-left: 4px;
              height: 50px;
              padding: 10px;
            }

            .info {
              height: auto;
              margin-top: 20px;
              margin-left: 4px;
              text-align: left;
              align-content: center;
              font-size: 20px;
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
      .category {
        margin-left: 20px;
        margin-right: 20px;
        margin-bottom: 40px;
        display: flex;
        flex-wrap: wrap;
        height: 80px;

        .navList {          
        }
      }
      .search {
        position: relative;
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