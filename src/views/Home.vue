<template>
  <div class="personal">
    <three :slide="needSlide">
      <template v-slot:navList>
        <li :style="validateList.validate1 ? enable : disable">状态机</li>
        <li :style="validateList.validate2 ? enable : disable">风险</li>
        <li :style="validateList.validate1 ? enable : disable">投资</li>
      </template>

      <template v-slot:write>
        <div class="write">
          <textarea placeholder="记录当下~"></textarea>
          <button>发布</button>
        </div>
      </template>

      <template v-slot:homeDetail>
        <div class="homeDetail" v-for="i in allList" :key="i.id">
          <div class="home-item-ptime">{{ i.ptime }} 天前</div>
          <div class="home-item-content">{{ i.content }}</div>
        </div>
      </template>
    </three>
  </div>
</template>

<script>
import arrayMethods from "../utils/newArray";
import Three from "../position/Three.vue";
export default {
  props: {},
  components: { Three },
  data() {
    return {
      needSlide: true,
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
    this.allList._proto_ = arrayMethods;
    let url = "/recent/api/getRecent?id=" + String(1);
    this.$http.get(url).then((res) => {
      console.log("获取");
      res.data.data.forEach((item) => {
        this.allList.push(item);
      });

      var nowTime = Date.parse(new Date());
      this.allList.forEach((item) => {
        item.ptime = Math.floor(
          (nowTime - item.time) / (3600 * 1000 * 24)
        ).toFixed(0);
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

    submit() {
      if (localStorage.getItem("user_token") !== null) {
        this.isPop = true;
        console.log(this.isPop);
        this.hide = "blur(5px)";
        this.allList.push({ content: this.content });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.write {
  position: relative;
  top: 2vh;
  margin: auto;
  width: 32vw;
  height: 25vh;
  background-color: #fff;
  textarea {
    margin-top: 2vh;
    width: 30vw;
    height: 18vh;
    font-size: 18px;
  }

  button {
    width: 4vw;
    position: relative;
    left: 13vw;
  }
}

.homeDetail {
  margin-top: 5vh;
  width: 45vw;
  background-color: #fff;
  .home-item-content {
    padding: 5vh;
    text-align: left;
    font-size: 18px;
    line-height: 1.7;
    font-weight: 450;
  }

  .home-item-ptime {
    color: #34538b;
    font-weight: bold;
    position: absolute;
    margin-top: 1vh;
    margin-left: 1vw;
  }
}
</style>