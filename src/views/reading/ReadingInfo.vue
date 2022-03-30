<template>
  <div class="readingInfo_root">
    <three>
      <template v-slot:navList>
        <li :style="validateList.validate1 ? enable : disable">书评</li>
        <li :style="validateList.validate2 ? enable : disable">讨论</li>
        <li :style="validateList.validate3 ? enable : disable">读书笔记</li>
      </template>
      <template v-slot:reading>
        <div class="reading">
          <div class="item" v-for="i in mainList" :key="i.id">
            <div class="item-person">
              {{ i.person }}
            </div>
            <div class="item-info" @click="toDetail(i.id,i.person)">
              {{ i.info }}
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
      id: 0,
      value: "",
      canEditor: false,
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
    setTimeout(() => {
      this.$store.state.bookList.forEach((item) => {
        this.mainList.push(item);
        console.log(item);
        console.log("item");
      });
    }, 500);
  },

  methods: {
    finishWrite() {
      this.canEditor = false;
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
            cursor: pointer;
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
              cursor: pointer;
            }
          }
        }
      }

      .write {
        .slide-fade-enter-active {
          transition: all 0.3s ease;
        }
        .slide-fade-leave-active {
          transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
        }
        .slide-fade-enter,
        .slide-fade-leave-to {
          transform: translateX(10px);
          opacity: 0;
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