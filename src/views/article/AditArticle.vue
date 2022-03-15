<template>
  <div class="adit-article_root">
    <div class="main">
      <div id="vditor"></div>
    </div>
    <div class="save">
      <button @click="save">保存</button>
    </div>
  </div>
</template>

<script>
import Vditor from "vditor";
import "vditor/dist/index.css";
export default {
  data() {
    return {
      id: 0,
      content: [], // 对象来的
      contentEditor: {},
    };
  },

  mounted: function () {
    this.content = [];
    this.id = this.$store.state.artiId;
    this.content = this.$store.state.contentList.filter(
      (item) => item.id == this.id
    );
    console.log("到了编辑页面");
    console.log(this.content);

    this.contentEditor = new Vditor("vditor", {
      width: 800,
      toolbarConfig: {
        pin: true,
      },
      cache: {
        enable: false,
      },
      counter: {
        enable: true,
      },
      toolbar: [
        "headings",
        "bold",
        "italic",
      ],
      mode: "ir",
      after: () => {
        this.contentEditor.setValue(this.content[0].content);
      },
    });
  },

  methods: {
    save() {
      console.log('已保存');
      var content = this.contentEditor.getValue();
      var id = this.id;
      var url = "/blog/api/upArticle";
      this.$http
        .put(url, {
          content,
          id,
        })
        .then((res) => {
          console.log(res);
        });
      this.$router.push({path: '/ShowArticle'})
    },
  },
};
</script>

<style lang="less" scoped>
@media screen and (min-width: 1100px) {
  .adit-article_root {
  position: relative;
  .main {
    width: 1000px;
    margin-left: 15%;
    margin-right: 15%;

    #vditor {
      margin-left: 80px;
      margin-right: 80px;
      text-align: left;
    }
  }

  .save {
    position: absolute;
    right: 0px;
    top: 0px;

    button {
      cursor: pointer;
      font-size: 28px;
      color: white;
      font-weight: 500;
      border: none;
      background-color: lightskyblue;
    }
  }
}
}

@media screen and (max-width: 450px) {
  .adit-article_root {
  position: relative;
  .main {
    width: 380px;

    #vditor {
      text-align: left;
    }
  }

  .save {
    position: absolute;
    right: 0px;
    top: 0px;
    z-index: 99;

    button {
      cursor: pointer;
      font-size: 22.5px;
      color: white;
      font-weight: 500;
      border: none;
      background-color: lightskyblue;
      
    }
  }
}
}
</style>