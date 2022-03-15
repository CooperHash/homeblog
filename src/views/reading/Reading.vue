<template>
  <div class="reading_root">
    <div class="reading">
      <div class="left">
        <div class="book">
          <div class="up">
            <div class="upList" v-for="item in upList" :key="item.id">
              <div class="nav">{{ item.nav }}</div>
            </div>
          </div>
          <div class="down">
            <div class="list">
              <div
                class="downList"
                v-for="item in downList"
                :key="item.id"
                :data-content="item.id"
              >
                <img
                  :src="item.image"
                  @click="toBookDetail(item.id)"
                  rel="preload"
                  class="book_img"
                />
                <div class="name">{{ item.name }}</div>
                <div class="author">{{ item.author.slice(0, 8) }}</div>
              </div>
              <div class="swiper">
                <div class="to-left" @click="downPage">&lt;</div>
                <div class="to-right" @click="upPage">&gt;</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="right">
        <div class="quote">一心只唯热爱二字</div>
        <div class="image">
          <img :src="image" />
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: "",
      count: 0,
      page: 0,
      upList: [
        { id: 1, nav: "全部" },
        { id: 2, nav: "文学" },
        { id: 3, nav: "小说" },
        { id: 4, nav: "历史文学" },
        { id: 5, nav: "社会纪实" },
        { id: 6, nav: "科学新知道" },
        { id: 7, nav: "艺术设计" },
        { id: 8, nav: "商业经管" },
        { id: 9, nav: "绘本漫画" },
      ],

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
        resolve('设置好id')
        this.$store.commit("setReading", id);
      })

      var p2 = new Promise((resolve, reject) => {
        resolve('设置内容')
        this.$store.dispatch("setAfterReadingList");
      })

      var p3 = new Promise((resolve, reject) => {
        resolve('跳转')
        this.$router.push({ path: "/ReadingInfo" });
      })
      
      
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
  .reading_root {
    .reading {
      display: flex;
      align-items: flex-start;
      width: 100%;

      .left {
        width: 60%;
        height: 600px;
        background-color: #fff;

        .book {
          margin-left: 80px;
          border-radius: 12px;
          width: 815px;
          height: 500px;
          box-sizing: border-box;
          .up {
            margin-left: 90px;
            width: 675px;
            display: flex;
            justify-content: space-between;
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
            margin-left: 90px;
            width: 675px;

            .list {
              display: flex;
              flex-wrap: wrap;
              margin: auto;
              .downList {
                margin-right: 21px;
                margin-bottom: 15px;
                img {
                  cursor: pointer;
                }

                .name {
                  cursor: pointer;
                  color: #3377aa;
                  font-weight: 400;
                }

                .author {
                }
              }

              .swiper {
                display: flex;
                justify-content: space-between;
                position: fixed;
                top: 520px;
                margin-left: 200px;
                width: 260px;
                background-color: #fff;

                .to-left {
                  border-radius: 45px;
                  width: 35px;
                  height: 35px;
                  cursor: pointer;
                  color: #fff;
                  font-weight: 500;
                  background-color: black;
                  font-size: 20px;
                }

                .to-right {
                  border-radius: 45px;
                  font-size: 20px;
                  width: 35px;
                  height: 35px;
                  color: #fff;
                  font-weight: 500;
                  background-color: black;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }

      .right {
        width: 400px;
        height: 600px;
        background-color: #f4f5f5;
        border-radius: 12px;
        margin-left: 60px;
        box-shadow: 0 2px 3px 0 rgb(0, 0, 0 / 2%);

        .quote {
          font-size: 28px;
          border-radius: 12px;
          width: 320px;
          height: 60px;
          background-color: #f4f5f5;
          padding: 6px 0;
          margin: auto;
          margin-top: 10px;
          box-sizing: border-box;
          box-shadow: 0 1px 1px 0 rgb(0, 0, 0 / 2%);
          margin-bottom: 20px;
        }

        .image {
          width: 320px;
          height: 460px;
          background-color: lightblue;
          margin: auto;

          img {
            border-radius: 12px;
            box-shadow: 0 2px 2px 0 rgb(0, 0, 0 / 2%);
          }
        }
      }
    }
  }
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