<template>
  <div class="reading_root">
    <three>
      <template v-slot:navList>
        <li :style="validateList.validate1 ? enable : disable">全部</li>
        <li :style="validateList.validate2 ? enable : disable">文学</li>
        <li :style="validateList.validate3 ? enable : disable">小说</li>
        <li :style="validateList.validate1 ? enable : disable">历史文学</li>
        <li :style="validateList.validate1 ? enable : disable">社会纪实</li>
        <li :style="validateList.validate1 ? enable : disable">科学</li>
        <li :style="validateList.validate1 ? enable : disable">艺术设计</li>
        <li :style="validateList.validate1 ? enable : disable">商业管理</li>
        <li :style="validateList.validate1 ? enable : disable">投资</li>
      </template>
      <template v-slot:bookList>
        <div class="bookList">
          <div class="book" v-for="i in downList" :key="i.id">
            <div class="book-info">
              <img :src="i.image"/>
              <div class="book-name">{{i.name}}</div>
              <div class="book-author">{{i.author.substring(0,8)}}</div>
            </div>
            <div class="book-introduce" @click="toBookDetail(i.id)">
            </div>
          </div>
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
      image: "",
      count: 0,
      page: 0,
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

      downList: [],
    };
  },

  mounted: function () {
    this.$http.get("/book/api/getEnjoy").then((res) => {
      this.image = res.data[0].image;
    });

    this.$http.get("/book/api/countBook").then((res) => {
      this.count = res.data[0].count / 10 + 1;
    });

    this.$http.get("/book/api/getBook").then((res) => {
      res.data.forEach((item) => {
        if (this.downList.length < 10) this.downList.push(item);
      });
    });
    console.log(this.downList);
  },

  methods: {
    downPage() {
      var page = this.page;
      if (page !== 0 && page !== 1) {
        this.downList = [];
        var url = "/book/api/getBookByPage?page=" + String(--page);
        this.$http.get(url).then((res) => {
          res.data.forEach((item) => {
            this.downList.push(item);
          });
          console.log("成功获取上一页的数据~");
          console.log(res);
        });

        this.$store.commit("setPage", page);
        this.page = this.$store.state.page;
        console.log("现在在第几页：");
        console.log(this.page);
      }
    },

    upPage() {
      this.downList = [];
      var page = this.page;
      if (page <= this.count) {
        var url = "/book/api/getBookByPage?page=" + String(++page);
        this.$http.get(url).then((res) => {
          res.data.forEach((item) => {
            this.downList.push(item);
          });
          console.log("成功获取下一页的数据~");
          console.log(res);
        });

        this.$store.commit("setPage", page);
        this.page = this.$store.state.page;
        console.log("现在在第几页：");
        console.log(this.page);
      }
    },

    toBookDetail(id) {
      var p1 = new Promise((resolve, reject) => {
        resolve("设置好id");
        this.$store.commit("setReading", id);
      });

      var p2 = new Promise((resolve, reject) => {
        resolve("设置内容");
        this.$store.dispatch("setAfterReadingList");
      });

      var p3 = new Promise((resolve, reject) => {
        resolve("跳转");
        this.$router.push({ path: "/ReadingInfo" });
      });

      Promise.all([p1, p2, p3]).then(
        (values) => {
          console.log(values);
        },
        (reason) => {
          console.log(reason);
        }
      );
    },
  },
};
</script>

<style lang="less" scoped>
@media screen and (min-width: 1100px) {
}

@media screen and (max-width: 1100px) and (min-width: 600px) {
  .reading_root {
    .reading {
      display: flex;
      align-items: flex-start;
      width: 100%;

      .left {
        width: 100%;
        margin-left: -30px;
        height: 600px;
        background-color: #fff;

        .book {
          margin-left: 80px;
          // border-radius: 12px;
          width: 800px;
          height: 500px;

          // box-sizing: border-box;
          // box-shadow: 0 3px 3px 0 rgb(0, 0, 0 / 2%);
          .up {
            margin-top: 10px;
            margin-left: 80px;
            width: 800px;
            display: flex;
            justify-content: space-between;
            // box-shadow: 0 1px #f4f5f5;
            .upList {
              .nav {
                cursor: pointer;
                font-size: 13px;
                color: #9b9b9b;
              }

              .nav:active {
                color: black;
              }
            }
          }

          .down {
            margin-top: 20px;
            margin-left: 20px;
            width: 800px;

            .list {
              display: flex;
              flex-direction: column;
              background-color: #fff;
              .downList {
                width: 200px;
                height: 200px;
                background-color: #fff;
                margin-right: 8px;
                margin-bottom: 10px;

                img {
                  cursor: pointer;
                  width: 80px;
                  height: 120px;
                  border-radius: 6px;
                }

                .name {
                  cursor: pointer;
                  color: #3377aa;
                  font-weight: 400;
                }

                .author {
                }
              }

              .downList::after {
                content: attr(data-content);
                padding: 52px 0;
                display: block;
                height: 120px;
                width: 680px;
                background-color: #f4f5f5;
                position: relative;
                left: 170px;
                top: -160px;
                border-radius: 8px;
              }

              .swiper {
                display: none;

                .to-left {
                  display: none;
                }

                .to-right {
                  display: none;
                }
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 450px) {
  .reading_root {
    .reading {
      display: flex;
      align-items: flex-start;
      width: 100%;

      .left {
        width: 100%;
        height: 600px;
        background-color: #fff;

        .book {
          // border-radius: 12px;
          width: 380px;
          height: 500px;

          // box-sizing: border-box;
          // box-shadow: 0 3px 3px 0 rgb(0, 0, 0 / 2%);
          .up {
            margin-top: 10px;
            width: 380px;
            display: flex;
            justify-content: space-between;
            // box-shadow: 0 1px #f4f5f5;
            .upList {
              .nav {
                cursor: pointer;
                font-size: 13px;
                color: #9b9b9b;
              }

              .nav:active {
                color: black;
              }
            }
          }

          .down {
            margin-top: 20px;
            width: 360px;

            .list {
              display: flex;
              flex-direction: column;
              background-color: #fff;
              .downList {
                width: 100px;
                height: 200px;
                background-color: #fff;
                margin-right: 8px;
                margin-bottom: 10px;

                img {
                  cursor: pointer;
                  width: 80px;
                  height: 120px;
                  border-radius: 6px;
                }

                .name {
                  cursor: pointer;
                  color: #3377aa;
                  font-weight: 400;
                }

                .author {
                }
              }

              .downList::after {
                content: attr(data-content);
                padding: 34px 0;
                display: block;
                height: 120px;
                width: 260px;
                background-color: #f4f5f5;
                position: relative;
                left: 120px;
                top: -160px;
                border-radius: 8px;
              }

              .swiper {
                display: none;

                .to-left {
                  display: none;
                }

                .to-right {
                  display: none;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>