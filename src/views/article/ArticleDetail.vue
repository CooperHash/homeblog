<template>
  <div class="root">
    <a-back-top/>
    <div class="article">
      <div class="detail">
        <div id="preview" class="vditor-reset"></div>
      </div>
    </div>
    <div class="edit">
      <button type="primary" @click="edit()">编辑</button>
    </div>
  </div>
</template>


<script>
import Vditor from "vditor";
import "vditor/dist/index.css";
export default {
  data() {
    return {
      content: "",
      id: 0, //文章Id
      hasContent: false,
    };
  },

  mounted: function () {
    this.id = this.$store.state.artiId;
    console.log("当前文章id:");
    console.log(this.$store.state.artiId);
    const bSize = "21px";
    const sSize = "14px";
    let isMobile = false;
    if (window.outerWidth < 450) {
      isMobile = true;
    }

    
      console.log("contentList is long: ");
      console.log(this.$store.state.contentList.length);
      // const promise = new Promise((resolve, reject) => {
      //   resolve("success");
      // });

      var p1 = new Promise((resolve, reject) => {
        this.$store.state.contentList.forEach((item) => {
          if (item.id == this.id) {
            this.content = item.content;
            console.log("bingo");
          }
        });

        resolve("成功比对，找到文章");
        reject("比对失败");
      });

      var p2 = new Promise((resolve, reject) => {
        Vditor.preview(document.getElementById("preview"), this.content);
        resolve("vditor 渲染完成");
        reject("vditor渲染失败");
      });

      var p3 = new Promise((resolve, reject) => {
        setTimeout(() => {
          var code = document.querySelectorAll("code");
          console.log(code);
          code.forEach((item) => {
            item.style.backgroundColor = "DarkGrey";
            item.style.fontWeight = "530";
            item.style.color = "white";
            item.style.lineHeight = "1.7";
            item.style.fontSize = isMobile ? sSize : bSize;
          });

          var txt = document.querySelectorAll("strong");
          txt.forEach((item) => {
            item.style.fontWeight = "500";
          });
        }, 100);

        resolve("vditor 具体样式渲染完成");
        reject("vditor 具体样式渲染失败");
      });

      Promise.all([p1, p2, p3]).then(
        (values) => {
          console.log(values);
        },
        (reason) => {
          console.log(reason);
        }
      );

      // promise
      //   .then(() => {
      //     this.$store.state.contentList.forEach((item) => {
      //       if (item.id == this.id) {
      //         this.content = item.content;
      //         console.log("bingo");
      //       }
      //     });
      //   })
      //   .then(() => {
      //     Vditor.preview(document.getElementById("preview"), this.content);
      //   })
      //   .then(() => {
      //     setTimeout(() => {
      //       var code = document.querySelectorAll("code");
      //       console.log(code);
      //       code.forEach((item) => {
      //         item.style.backgroundColor = "#6699CC";
      //         item.style.fontWeight = "540";
      //         item.style.color = "white";
      //         item.style.lineHeight = "1.7";
      //         item.style.fontSize = isMobile ? sSize : bSize;
      //       });

      //       var txt = document.querySelectorAll("p");
      //       txt.forEach((item) => {
      //         item.style.fontWeight = "545";
      //       });
      //     }, 100);
      //   });

  },

  methods: {
    submit() {
      var id = this.totalComment + 1;
      var article_id = this.id;
      var judge_id = this.judge_id + 1;
      var comment = this.judge;
      this.$http
        .post("/blog/api/saveComment", {
          id,
          article_id,
          judge_id,
          comment,
        })
        .then((res) => {
          console.log("评论保存成功~");
          console.log(res);
        });

      // setTimeout(() => {
      //   var judge_url =
      //     "/blog/api/getJudge?id=" + String(this.id);
      //   this.$http.get(judge_url).then((res) => {
      //     console.log("------------更新评论列表----------");
      //     console.log(res);
      //     this.commentList.push(res.data.data[res.data.data.length - 1]);
      //   });
      // }, 5000);
    },

    edit() {
      this.$router.push({ path: "/AditArticle" });
    },
  },
};
</script>

<style lang="less" scoped>
@media all and (min-width: 1100px) {
  .root {
    position: relative;
    top: -10px;
    .article {
      .detail {
        margin-bottom: 30px;
        text-align: left;
        width: 920px;
        box-sizing: border-box;
        padding-left: 45px;
        padding-right: 45px;
        margin-left: 20%;
        margin-right: 20%;
        font-weight: 550;

        .vditor-reset {
          font-size: 22px;
          line-height: 1.85;
          font-weight: 520;

          code {
            background: #333333;
          }
        }
      }
    }

    .edit {
      button {
        background-color: lightskyblue;
        font-size: 40px;
        border: none;
      }
    }
  }
}

@media all and (max-width: 1100px) {
  .root {
    position: relative;
    top: -10px;
    .article {
      .detail {
        text-align: left;
        width: 900px;
        min-height: 700px;
        box-sizing: border-box;
        margin: auto;

        .vditor-reset {
          font-size: 22px;
          line-height: 1.85;

          code {
            background: #333333;
          }
        }
      }
    }
  }
}

@media all and (max-width: 450px) {
  .root {
    position: relative;
    top: -10px;
    left: -5px;
    .article {
      .detail {
        text-align: left;
        width: 320px;
        min-height: 700px;
        box-sizing: border-box;
        margin: auto;
        margin-bottom: 20px;

        .vditor-reset {
          font-size: 16px;
          line-height: 1.85;
        }
      }
    }
  }
}
</style>