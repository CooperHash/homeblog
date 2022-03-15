<template>
  <div class="pop-page">
    <div class="">
      发送内容： {{ res }}
    </div>
    <button @click="submit">发送</button>
    <button @click="$emit('cancle')">取消</button>
  </div>
</template>

<script>
export default {
  props: {
    obj: {},
    res: String
  },
  data() {
    return {
      recv: this.obj,
      content: this.res
    }
  },
  methods: {
    submit() {
      const belong_id = this.recv.belong_id;
      const single_id = this.recv.single_id;
      const content = this.content;
      console.log(content);
      var time = Date.parse(new Date());
      var url = "/recent/api/saveRecent";
        this.$http
          .post(url, {
            belong_id,
            single_id,
            content,
            time,
          })
          .then(() => {
            console.log("success save!");
          });
      this.$emit('cancle')
      // var p1 = new Promise((resolve, reject) => {
      //   resolve("保存成功");
        
      // });

      // var p2 = new Promise((resolve, reject) => {
      //   resolve("更新成功");
      //   setTimeout(() => {
      //     var url = "/recent/api/getRecent?id=" + String(this.belong_id);
      //     this.$http.get(url).then((res) => {
      //       this.allList.push(res.data.data[res.data.data.length - 1]);
      //       console.log(res);
      //     });
      //   },500)
      // });

      // Promise.all([p1, p2]).then(
      //   (values) => {
      //     console.log(values);
      //   },
      //   (reason) => {
      //     console.log(reason);
      //   }
      // );
    }
  }
}
</script>

<style lang="less">
@media screen and (min-width: 1100px) {
  .pop-page {
  width: 300px;
  height: 150px;
  background-color: lightskyblue;
  border-radius: 12px;
  z-index: 99;
  position: fixed;
  left: 500px;
    top: 100px;

  button {
    width: 50px;
    height: 25px;
    font-size: 12px;
    margin-left: 50px;
  }
}
}

@media screen and (max-width: 450px) {
  .pop-page {
  width: 200px;
  height: 120px;
  background-color: lightskyblue;
  border-radius: 12px;
  z-index: 99;
  position: fixed;
  left: 100px;
    top: 100px;

  button {
    font-size: 12px;
    width: 50px;
    height: 35px;
    font-size: 12px;
    margin-left: 10px;
  }
}
}
</style>