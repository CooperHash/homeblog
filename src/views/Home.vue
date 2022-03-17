<template>
  <div class="fake_root">
    <div class="fake_home" :style="{ filter: hide }">
      <div class="left shadow">
        <div class="navlist" v-for="item in navList" :key="item.id">
          <div class="title" @click="toRecentDetail(item.id)">
            {{ item.title }}
          </div>
        </div>
      </div>
      <div class="main">
        <div class="editor" v-show="isBoss">
          <div class="add recent">
            <textarea v-model="content" placeholder="发些近况吧~" />
          </div>
          <div class="upload">
            <div class="upImage" @click="upImage"></div>
            <div class="submit">
              <a-button type="primary" @click="submit">发布</a-button>
            </div>
          </div>
        </div>
        <div class="divied"></div>
        <div class="mainlist" v-for="item in allList" :key="item.id">
          <div class="time">{{ item.ptime }} 小时前</div>
          <div class="content">{{ item.content }}</div>
        </div>
      </div>
      <div class="right" v-if="false">
        <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=390 height=390 src="//music.163.com/outchain/player?type=0&id=5233469487&auto=1&height=430"></iframe>
      </div>
    </div>
    <pop-out
      v-if="isPop"
      :obj="send"
      :res="content"
      v-on:cancle="canclePop"
    ></pop-out>
    
  </div>
</template>

<script>
import arrayMethods from '../utils/newArray';
export default {
  data() {
    return {
      // 保存文章的四个字段
      id: 0,
      send: {
        belong_id: 0,
        single_id: 0,
      },

      content: " ",
      // 弹窗flag
      isPop: false,

      hide: "",

      // 左侧导航列表
      navList: [
        { id: 1, title: "畅想" },
        { id: 2, title: "小事" },
        { id: 3, title: "屏幕使用" },
        { id: 4, title: "感情" },
        { id: 5, title: "身体状态" },
      ],

      // 中间上传图片列表
      imageList: [],
      // 右侧文章列表
      allList: [],

      isBoss: true,
    };
  },

  mounted: function () {
    this.allList._proto_ = arrayMethods
    this.$http.get("/recent/api/getAllRecent").then((res) => {
      res.data.data.forEach((item) => {
        this.allList.push(item);
      });

      var nowTime = Date.parse(new Date());
      this.allList.forEach((item) => {
        item.ptime = Math.floor((nowTime - item.time) / (3600 * 1000));
      });
    });
  },

  methods: {
    canclePop() {
      this.isPop = false;
      this.hide = "";
    },
    toRecentDetail(id) {
      this.send.belong_id = id;
      this.allList = [];
      var url = "/recent/api/getRecent?id=" + String(id);
      this.$http.get(url).then((res) => {
        console.log("获取");
        res.data.data.forEach((item) => {
          this.allList.push(item);
        });

        var nowTime = Date.parse(new Date());
        this.allList.forEach((item) => {
          item.ptime = Math.floor((nowTime - item.time) / (3600 * 1000));
        });
      });

      url = "/recent/api/countAll";
      this.$http.get(url).then((res) => {
        this.id = res.data.data[0].count + 1;
        console.log(this.id);
      });

      url = "/recent/api/count?id=" + String(this.send.belong_id);
      this.$http.get(url).then((res) => {
        this.send.single_id = res.data.data[0].count + 1;
      });
    },

    upImage() {
      var index = 0;
      var file = document.getElementById("input").files[index++];
      this.imageList.push({
        index,
        file,
      });
      console.log("imageList: ");
      console.log(this.imageList);
    },

    submit() {
      if (localStorage.getItem("user_token") === "cooperkai") {
        this.isPop = true;
        console.log(this.isPop);
        this.hide = "blur(5px)";
        this.allList.push({content: this.content})
      }
    },
  },
};
</script>

<style lang="less" scoped>
@media screen and (min-width: 1100px) {
  .fake_home {
    background-color: #f4f5f5;
    display: flex;
    align-items: flex-start;

    .left {
      margin-top: 15px;
      margin-left: 120px;
      margin-right: 24px;
      width: 200px;

      background-color: #fff;
      box-sizing: border-box;
      border-radius: 12px;

      .navlist {
        height: 44px;
        width: 200px;
        margin-bottom: 10px;

        .title {
          cursor: pointer;
          font-weight: 500;
          padding: 9px 0;
          text-align: center;
          font-size: 16px;
        }
      }

      .navlist:focus {
        background-color: lightblue;
      }
    }

    .main {
      margin-top: 15px;
      margin-left: 18px;
      margin-right: 2px;
      width: 712px;
      height: 1200px;

      .editor {
        width: 675px;
        height: 200px;
        background-color: #fff;
        margin: auto;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        border-radius: 12px;
        margin-bottom: 10px;

        .add {
          position: relative;
          top: 0px;
          width: 620px;
          height: 116px;
          background-color: #f4f5f5;
          box-sizing: border-box;

          margin: auto;

          textarea {
            line-height: 1.5;
            letter-spacing: 1px;
            font-size: 16px;
            width: 620px;
            height: 116px;
            border: none;
          }
        }

        .upload {
          width: 620px;
          margin: auto;
          position: relative;
          top: -10px;
          display: flex;
          justify-content: space-between;

          .upImage {
            cursor: pointer;
            font-weight: 500;
          }
        }
      }
      .divied {
        height: 20px;
        width: 675px;
        background-color: #f4f5f5;
      }
      .mainlist {
        width: 675px;
        height: 300px;
        background-color: #fff;
        margin: auto;
        margin-bottom: 15px;
        box-sizing: border-box;
        border-radius: 12px;

        .content {
          margin-left: 50px;
          margin-right: 50px;
          padding: 140px 0;
          line-height: 1.5;
          font-size: 16px;
          font-weight: 450;
        }
      }
    }

    .right {
      margin-top: 15px;

      right: 120px;
      width: 400px;
      height: 400px;
      background-color: #fff;
    }
  }

  
}

@media screen and (max-width: 1100px) and (min-width: 600px) {
  .fake_home {
    background-color: #f4f5f5;
    display: flex;
    align-items: flex-start;

    .left {
      margin-top: 15px;
      margin-left: 80px;
      margin-right: 24px;
      width: 120px;

      background-color: #fff;
      box-sizing: border-box;
      border-radius: 12px;
      box-shadow: 0 2px 8px 0 rgb(0, 0, 0 / 2%);

      .navlist {
        height: 44px;
        width: 120px;
        margin-bottom: 10px;

        .title {
          cursor: pointer;
          font-weight: 500;
          padding: 9px 6px;
          text-align: center;
          font-size: 16px;
        }
      }

      .navlist:hover {
        background-color: lightblue;
      }
    }

    .main {
      margin-top: 15px;
      margin-left: 40px;
      margin-right: 2px;
      width: 520px;
      height: 1200px;

      .editor {
        width: 480px;
        height: 134px;
        background-color: #fff;
        margin: auto;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        border-radius: 12px;
        box-shadow: 0 2px 8px 0 rgb(0, 0, 0 / 2%);
        margin-bottom: 10px;

        .add {
          position: relative;
          top: 5px;
          width: 390px;
          height: 80px;
          background-color: #fff;
          box-sizing: border-box;

          margin: auto;

          textarea {
            line-height: 1.5;
            letter-spacing: 1px;
            font-size: 16px;
            width: 390px;
            height: 80px;
            border: none;
          }
        }

        .upload {
          width: 380px;
          margin: auto;
          position: relative;
          top: 0px;
          display: flex;
          justify-content: space-between;

          .upImage {
            cursor: pointer;
            font-weight: 500;
          }
        }
      }
      .divied {
        height: 20px;
        width: 480px;
        background-color: #f4f5f5;
      }
      .mainlist {
        width: 480px;
        height: 120px;
        background-color: #fff;
        margin: auto;
        margin-bottom: 15px;
        box-sizing: border-box;
        border-radius: 12px;
        box-shadow: 0 2px 8px 0 rgb(0, 0, 0 / 2%);

        .content {
          margin-left: 5px;
          margin-right: 5px;
          padding: 20px 0;
          line-height: 1.5;
          font-size: 16px;
          font-weight: 450;
        }
      }
    }

    .right {
      margin-top: 15px;
      position: relative;
      right: -50px;
      width: 180px;
      height: 400px;
      background-color: #fff;
      border-radius: 12px;
    }
  }
}

@media screen and (max-width: 450px) {
  .fake_home {
    background-color: #f4f5f5;
    display: flex;
    flex-direction: column;

    .left {
      display: flex;
      flex-direction: row;
      margin-bottom: 5px;

      .navlist {
        height: 20px;
        width: 80px;
        margin-bottom: 5px;

        .title {
          cursor: pointer;
          font-weight: 500;
          padding: 9px 6px;
          text-align: center;
          font-size: 16px;
        }

        .title:hover {
          background-color: lightskyblue;
        }
      }
    }

    .main {
      margin-top: 15px;
      margin-left: 18px;
      margin-right: 6px;
      width: 360px;

      .editor {
        width: 360px;
        height: 134px;
        background-color: #fff;
        margin: auto;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        border-radius: 12px;
        margin-bottom: 10px;

        .add {
          position: relative;
          top: 5px;
          width: 320px;
          height: 80px;
          background-color: #fff;
          box-sizing: border-box;

          margin: auto;

          textarea {
            line-height: 1.5;
            letter-spacing: 1px;
            font-size: 16px;
            width: 300px;
            height: 80px;
            border: none;
          }
        }

        .upload {
          width: 320px;
          margin: auto;
          position: relative;
          top: 0px;
          display: flex;
          justify-content: space-between;

          button {
          }
        }
      }
      .divied {
        height: 20px;
        width: 380px;
        background-color: #f4f5f5;
      }
      .mainlist {
        width: 360px;
        height: 120px;
        background-color: #fff;
        margin: auto;
        margin-bottom: 15px;
        box-sizing: border-box;
        border-radius: 12px;

        .content {
          margin-left: 5px;
          margin-right: 5px;
          padding: 10px 0;
          line-height: 1.5;
          font-size: 16px;
          font-weight: 450;
        }
      }
    }
  }
}
</style>