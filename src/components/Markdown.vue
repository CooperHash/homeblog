<template>
  <div class="root">
    <div class="editor" v-if="flag">
      <div class="up">
        <div class="title">
          <textarea
            type="text"
            placeholder="添加标题"
            v-model="title"
            style="
              border: 0 none;
              outline: none;
              width: 180px;
              height: 40px;
              font-size: 16px;
              font-weight: 400;
            "
          ></textarea>
        </div>
        <div class="info">
          <textarea
            type="text"
            placeholder="添加简介"
            v-model="info"
            style="
              border: 0 none;
              outline: none;
              width: 180px;
              height: 40px;
              font-size: 16px;
              font-weight: 400;
            "
          ></textarea>
        </div>
        <div class="button">
          <button type="primary" @click="saveArticle" v-if="finish">
            完成
          </button>
        </div>
      </div>
      <div class="down">
        <div id="vditor" />
      </div>
    </div>
    <div id="preview" class="vditor-reset"></div>
  </div>
</template>

<script>
import Vditor from "vditor";
import "vditor/dist/index.css";
export default {
  data() {
    return {
      content: "",
      title: "",
      info: "",
      flag: this.$store.state.flag,
      finish: true,

      contentEditor: {},
    };
  },

  mounted: function () {
    this.flag = this.$store.state.flag;
    console.log("mounted: " + this.flag);

    this.contentEditor = new Vditor("vditor", {
      height: 700,
      toolbarConfig: {
        pin: true,
      },
      cache: {
        enable: false,
      },
      counter: {
        enable: true,
      },
      after: () => {
        this.contentEditor.setValue("");
      },
      toolbar: ["headings", "bold", "italic"],
    });
  },


  methods: {
    saveArticle() {
      this.flag = !this.flag;
      console.log("turn flag !");
      var content = this.contentEditor.getValue();
      var title = this.title;
      var info = this.info;
      this.$http
        .post("https://homeblog.top/all/blog/api/saveArticle", {
          content,
          title,
          info,
        })
        .then(() => {
          console.log("already saved");
        })
        .catch((err) => {
          console.log(err);
        });

      this.content = this.contentEditor.getValue();
      console.log("保存内容~");
      console.log(this.content);

      setTimeout(() => {
        Vditor.preview(document.getElementById("preview"), this.content, {
          hljs: { style: "dracula", lineNumber: "false" },
          markdown: { autoSpace: "true", fixTermTypo: "true" },
          hint: { parse: "true", enable: "true" },
          theme: { list: { wechat: "WeChat" } },
        });
      }, 500);
    },
  },
};
</script>
<style lang="less" scoped>
@media screen and (min-width: 1100px) {
  .root {
    position: relative;
    top: -5px;
    .editor {
      .up {
        display: flex;
        justify-content: space-between;
        margin-left: 160px;
        margin-right: 160px;

        .title {
          margin-right: 25px;
        }

        .info {
          margin-left: 25px;
        }

        .button {
          position: absolute;
          right: 0;

          button {
            background-color: lightblue;
            width: 120px;
            height: 44px;
            border: none;
          }
        }
      }

      .down {
        width: 1150px;
        margin-left: 150px;
        margin-right: 150px;
      }
    }
  }
}

@media screen and (max-width: 500px) {
  .root {
    width: 100%;
    position: relative;
    top: -5px;
    left: -1px;
    .editor {
      .up {
        display: flex;
        justify-content: space-between;

        .title {
        }

        .info {
        }

        .button {
          position: absolute;
          right: 60px;
          top: 47px;
          z-index: 99;

          button {
            background-color: lightskyblue;
            width: 80px;
            height: 35px;
            border: none;
          }
        }
      }

      .down {
        width: 380px;
        margin: auto;

        #vditor {
          text-align: left;
        }
      }
    }

    #preview {
      width: 380px;
      text-align: left;
      margin-left: 20px;
    }
  }
}
</style>