<template>
  <div class="root_header">
    <div class="header">
      <ul id="list">
        <li class="home">
          <span class="up" @click="toHome">基本情况</span>
          <div class="down first">
            <span class="recent">近况</span>
            <span class="thinking" @click="add">所思</span>
          </div>
        </li>
        <li class="article">
          <span class="up" @click="toArticle">前端技术</span>
          <div class="down second">
            <span class="frame" @click="toNetWork">计网</span>
            <span class="js">操作系统</span>
            <span class="performance">性能</span>
          </div>
        </li>
        <li class="keepstudy">
          <span class="up">不断学习</span>
          <div class="down third">
            <span class="language" @click="toJapan">语言</span>
            <span class="reading" @click="toReading">读书</span>
            <span class="summary" @click="toDetail">心得</span>
          </div>
        </li>
        <!-- <li class="user-center" v-if="!isLogin">
          <span class="user" @click="toUser">登录</span>
          <div class="four">
            <span class="record" @click="toRecord">记录</span>
          </div>
        </li> -->
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLogin: this.$store.state.isLogin,
    };
  },

  methods: {
    toHome() {
      this.$router.push({ path: "/" });
    },

    toArticle() {
      this.$router.push({ path: "/ShowArticle" });
    },

    toJapan() {
      this.$router.push({ path: "/language" });
    },

    toReading() {
      this.$router.push({ path: "/Reading" });
    },

    toDetail() {
      this.$router.push({ path: "/ReadingDetail" });
    },

    toNetWork() {
      this.$router.push({ path: "/network" });
    },

    toUser() {
      this.$router.push({ path: "/User" });
    },

    toRecord() {
      this.$router.push({ path: "/Record" });
    },

    add() {
      this.$router.push({ path: "/Markdown" });
    },
  },

};
</script>
<style lang="less" scoped>
@media all and (min-width: 1400px) {
  .root_header {
    .header {
      position: sticky;
      box-sizing: border-box;
      top: 0px;
      width: 100%;
      height: 8vh;
      background-color: #D8E5F7;
      border-top: 3px solid #8BA7E3;
      border-bottom: 2px solid #B4C9F5;

      #list {
        display: flex;
        flex-direction: row;
        list-style: none;
        position: relative;
        top: 1vh;

        li {
          display: flex;
          flex-direction: column;
          height: 6vh;
          width: 12vw;
          margin-left: 5vw;
        }

        .up {
          font-size: 17px;
        }

        .down {
          font-size: 15px;
          display: flex;
          justify-content: space-around;
        }

        span {
          cursor: pointer;
        }
      }
    }
  }
}


@media all and (min-width: 900px) and (max-width: 1400px){
  .root_header {
    .header {
      position: sticky;
      top: 0px;
      width: 100%;
      height: 10vh;
      background-color: #D8E5F7;

      #list {
        display: flex;
        flex-direction: row;
        list-style: none;
        position: relative;
        top: 2vh;

        li {
          display: flex;
          flex-direction: column;
          height: 6vh;
          width: 12vw;
          margin-left: 5vw;
        }

        .up {
          font-size: 14px;
        }

        .down {
          font-size: 12px;
          display: flex;
          justify-content: space-around;
        }

        span {
          cursor: pointer;
        }
      }
    }
  }
}

@media all and (min-width: 400px) and (max-width: 900px){
  .root_header {
    .header {
      position: sticky;
      top: 0px;
      width: 100%;
      height: 12vh;
      background-color: lightblue;

      #list {
        display: flex;
        flex-direction: row;
        list-style: none;
        position: relative;
        top: 2vh;

        li {
          display: flex;
          flex-direction: column;
          background-color: red;
          height: 8vh;
          width: 14vw;
          margin-left: 5vw;
        }

        .up {
          font-size: 14px;
        }

        .down {
          font-size: 12px;
          display: flex;
          justify-content: space-around;
        }

        span {
          cursor: pointer;
        }
      }
    }
  }
}

@media all and (min-width: 280px) and (max-width: 400px){
  .root_header {
    position: sticky;
      top: 0px;
      width: 100%;
      height: 7vh;
      background-color: lightblue;
    .header {
      position: relative;

      #list {
        display: flex;
        list-style: none;
        position: absolute;
        left: 0%;

        li {
          display: flex;
          flex-direction: column;
          background-color: red;
          height: 5vh;
          width: 28vw;

        }

        .up {
          font-size: 12px;
        }

        .down {
          font-size: 10px;
          display: flex;
          justify-content: space-around;
        }

        span {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
