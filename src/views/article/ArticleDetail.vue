<template>
  <div class="articleDetail_page">
    <three>
      <template v-slot:article>
        <div class="article">
          <div class="content" v-html="content" v-highlight></div>
        </div>
      </template>
    </three>
  </div>
</template>


<script>
import { marked } from "marked";
import Three from "../../position/Three.vue";

export default {
  components: { Three },
  data() {
    return {
      content: "",
      has: false,
      id: 0, //文章Id
    };
  },

  mounted: function () {
    const renderer = new marked.Renderer();
    marked.setOptions({
      renderer: renderer,
      gfm: true,
      pedantic: false,
      sanitize: false,
      tables: true,
      breaks: false,
      smartLists: true,
      smartypants: false,
    });

    this.id = this.$store.state.artiId;
    console.log("当前文章id:");
    console.log(this.$store.state.artiId);

    this.$store.state.contentList.forEach((item) => {
      if (item.id == this.id) {

        console.log("bingo");
        this.content = marked(this.content);
        console.log(this.content);
      }
    });
    console.log("contentList is long: ");
    console.log(this.$store.state.contentList.length);
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
    },

    edit() {
      this.$router.push({ path: "/AditArticle" });
    },
  },
};
</script>

<style lang="less" scoped>
@media all and (min-width: 1100px) {
}
</style>