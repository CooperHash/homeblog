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
        <li class="user-center" v-if="!isLogin">
          <span class="user" @click="toUser">登录</span>
          <div class="four">
            <span class="record" @click="toRecord">记录</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLogin: false
    };
  },
  mounted: function() {
    if(localStorage.getItem('user_token').length !== 0) this.isLogin = true 
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
@media all and (min-width: 900px) {
  .root_header {
    .header {
      position: absolute;
      top: 1px;
      background-color: #d8e5f7;
      height: 53px;
      width: 100%;
      display: block;

      #list {
        overflow: hidden;
        list-style: none;
      }

      #list li {
        float: left;
        width: 230px;
        height: 48px;
        line-height: 1.7;
        text-align: center;

        .user-center {
          position: relative;
          left: -20px;
          .user {
            cursor: pointer;
          }
          .four {
            position: relative;
            left: 30px;
            .record {
              cursor: pointer;
            }
          }
        }
        .up {
          font-weight: bold;
          font-size: 14px;
          color: #34538b;
          text-shadow: 1px 1px #e3e3e3;
          cursor: pointer;
        }

        .down {
          display: flex;
          width: 120px;
          justify-content: space-between;
          margin-top: 2px;
          margin: auto;
          font-size: 12px;
          color: #34538b;
          text-shadow: 1px 1px #eee;
        }

        .down span {
          cursor: pointer;
        }
      }
    }
  }
}

@media all and (max-width: 450px) {
  .root_header {
    .header {
      position: absolute;
      top: 1px;
      background-color: #d8e5f7;
      height: 53px;
      width: 100%;
      display: block;

      #list {
        overflow: hidden;
        list-style: none;

        .home {
          position: relative;
          width: 60px;
          left: -20px;
        }

        .article {
          position: relative;
          left: 5px;
          width: 100px;
        }

        .keepstudy {
          position: relative;
          width: 105px;
          right: -25px;
          margin-right: 35px;
        }
      }

      #list li {
        float: left;
        height: 48px;
        line-height: 1.7;
        text-align: center;
        .up {
          font-weight: bold;
          font-size: 13px;
          color: #34538b;
          text-shadow: 1px 1px #e3e3e3;
          cursor: pointer;
        }

        .first {
          display: flex;
          width: 60px;
          justify-content: space-between;
          margin-top: 2px;
          color: #34538b;
          text-shadow: 1px 1px #eee;

          span {
            font-size: 11px;
          }
        }

        .second {
          display: flex;
          width: 105px;
          justify-content: space-between;
          margin-top: 2px;
          color: #34538b;

          text-shadow: 1px 1px #eee;
          span {
            font-size: 11px;
          }
        }

        .third {
          display: flex;
          width: 90px;
          justify-content: space-between;
          margin-top: 2px;
          color: #34538b;
          text-shadow: 1px 1px #eee;

          span {
            font-size: 11px;
          }
        }
      }
    }
  }
}
</style>
