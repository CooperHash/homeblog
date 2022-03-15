<template>
  <div class="readingDetail_root">
    <a-back-top />
    <div class="main">
      <div class="person">{{ person }}</div>
      <div class="title">{{ title }}</div>
      <div id="preview" class="vditor-reset"></div>
    </div>
  </div>
</template>

<script>
import Vditor from "vditor";
import "vditor/dist/index.css";

export default {
  data() {
    return {
      person: " ",
      title: " ",
      detail: " ",
    };
  },

  mounted: function () {
    const promise = new Promise((resolve, reject) => {
      resolve("success");
    });
    var id = 0;
    var name = "";
    id = this.$store.state.readingId;
    name = this.$store.state.readingName;
    var params = { id, name };
    promise
      .then(() => {
        
      })
      .then(() => {
        var url = "/book/api/getBookDetailByName";
        this.$http.get(url, { params }).then((res) => {
          console.log("获取具体用户评论~");
          console.log(res);
          this.title = res.data[0].info;
          this.detail = res.data[0].detail;
        });
      });

    setTimeout(() => {
      Vditor.preview(document.getElementById("preview"), this.detail, {
        hljs: { style: "dracula", lineNumber: "false" },
        markdown: { autoSpace: "true", fixTermTypo: "true" },
        hint: { parse: "true", enable: "true" },
        theme: { list: { wechat: "WeChat" } },
      });
    }, 500);
  },
};
</script>

<style lang="less" scoped>
.readingDetail_root {
  width: 100%;
  .main {
    width: 90%;
    margin: auto;

    .person {
      text-align: left;
      font-weight: 450;
      opacity: 0.5;
      line-height: 1.7;
      font-size: 18px;
      margin-bottom: 10px;
    }
    .title {
      text-align: left;
      font-size: 25px;
      font-weight: 550;
      line-height: 1.7;
      margin-bottom: 20px;
    }

    #preview {
      font-size: 20px;
      text-align: left;
      line-height: 1.75;
      font-weight: 450;
    }
  }
}
</style>