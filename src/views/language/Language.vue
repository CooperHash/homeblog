<template>
  <div class="language_root">
    <div class="left">
      <div class="language-nav">
        <div class="nav-list" v-for="item in navlist" :key="item.id">
          <div class="nav" @click="toLanguage(item.id)">{{ item.nav }}</div>
        </div>
      </div>
    </div>
    <div class="language-list">
      <div class="language" v-for="item in language_list" :key="item.id">
        <div class="language_item" @click="toLanguageDetail(item.id)">
          <img :src="item.image" class="image" />
          <div class="title">{{ item.title.slice(0,18) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      choose: 0,
      navlist: [
        { id: 1, nav: "潮州话" },
        { id: 2, nav: "日语" },
        { id: 3, nav: "英语" },
        { id: 4, nav: "韩语" },
      ],
      language_list: [],
    };
  },

  mounted: function () {
    this.$http.get("/language/api/getJapan").then((res) => {
      console.log("日语文章获取~");
      console.log(res.data);
      res.data.forEach((element) => {
        this.language_list.push(element);
      });
      console.log(this.japanList);
    });
  },

  methods: {
    toLanguage(id) {
      var pick = id;
      this.language_list = [];
      switch (pick) {
        case 1:
          this.$http.get("/language/api/getChaoZhou").then((res) => {
            res.data.forEach((element) => {
              this.language_list.push(element);
            });
          });
          this.choose = 1;
          console.log(this.choose);
          break;

        case 2:
          this.$http.get("/language/api/getJapan").then((res) => {
            res.data.forEach((element) => {
              this.language_list.push(element);
            });
          });
          this.choose = 2;
          break;
      }
    },

    toLanguageDetail(id) {
      var choose = this.choose;
      console.log("现在选择了板块id：");
      console.log(choose);
      switch (choose) {
        case 1:
          console.log("现在选择了文章id：");
          console.log(id);
          this.$store.commit("setChaoZhouId", id);
          this.$router.push({ path: "/ChaoZhou" });
          break;

        case 2:
          this.$store.commit("setJapanId", id);
          this.$router.push({ path: "/JapanDetail" });
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@media screen and (min-width: 1100px) {
  .language_root {
    display: flex;
    background-color: #f4f5f5;
    .left {
      width: 40%;
      margin-right: 24px;
      .language-nav {
        margin-left: 20px;
        margin-top: 20px;
        width: 180px;
        height: 250px;
        background-color: #fff;
        box-shadow: 0 2px 8px 0 rgb(0, 0, 0 / 2%);
        border-radius: 8px;

        .nav-list {
          width: 180px;
          height: 55px;

          .nav {
            cursor: pointer;
            text-align: center;
            padding: 25px 0;
            font-size: 16px;
            font-weight: 500;
          }

          .nav:hover {
            background-color: lightblue;
          }
        }
      }
    }

    .language-list {
      background-color: #fff;
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;

      .language {
        .language_item {
          cursor: pointer;
          margin-bottom: 24px;
          margin-right: 24px;
          width: 280px;
          height: 230px;
          align-items: center;
          background-color: #fff;
          border-radius: 12px;
          padding: 8px;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          box-shadow: 0 2px 8px 0 rgb(0, 0, 0 / 2%);

          .image {
            border-radius: 12px;
          }

          .title {
            margin-top: 8px;
            color: black;
            font-size: 16px;
            font-weight: 550;
            line-height: 20px;
            white-space: pre-wrap;
            text-align: left;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1100px) and (min-width: 500px) {
  .language_root {
    display: flex;
    background-color: #f4f5f5;
    .left {
      width: 40%;
      margin-right: 24px;
      .language-nav {
        margin-left: 20px;
        margin-top: 20px;
        width: 100px;
        height: 250px;
        background-color: #fff;
        box-shadow: 0 2px 8px 0 rgb(0, 0, 0 / 2%);
        border-radius: 8px;

        .nav-list {
          width: 100px;
          height: 55px;

          .nav {
            cursor: pointer;
            text-align: center;
            padding: 25px 0;
            font-size: 16px;
            font-weight: 500;
          }

          .nav:hover {
            background-color: lightblue;
          }
        }
      }
    }

    .language-list {
      background-color: #fff;
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;

      .language {
        .language_item {
          cursor: pointer;
          margin-bottom: 24px;
          margin-right: 24px;
          width: 243px;
          height: 197px;
          align-items: center;
          background-color: #fff;
          border-radius: 12px;
          padding: 8px;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          box-shadow: 0 2px 8px 0 rgb(0, 0, 0 / 2%);

          .image {
            width: 220px;
            height: 123px;
            border-radius: 12px;
          }

          .title {
            margin-top: 8px;
            color: black;
            font-size: 16px;
            font-weight: 550;
            line-height: 20px;
            white-space: pre-wrap;
            text-align: left;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 450px) {
  .language_root {
    display: flex;
    flex-direction: column;
    .left {
      margin-bottom: 20px;
      .language-nav {
        display: flex;
        flex-direction: row;

        .nav-list {
          width: 100px;
          height: 40px;

          .nav {
            cursor: pointer;
            text-align: center;
            padding: 5px 0;
            font-size: 16px;
            font-weight: 500;
          }

          .nav:hover {
            background-color: lightblue;
          }
        }
      }
    }

    .language-list {
      background-color: #fff;
      
      display: flex;
      flex-wrap: wrap;
      

      .language {
        margin: auto;
        .language_item {
          cursor: pointer;
          margin-bottom: 24px;
          width: 170px;
          height: 140px;
          align-items: center;
          background-color: #fff;
          border-radius: 12px;
          padding: 8px;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          box-shadow: 0 2px 4px 0 rgb(0, 0, 0 / 2%);

          .image {
            height: 184px;
            width: 135px;
            border-radius: 8px;
          }

          .title {
            margin-top: 8px;
            color: black;
            font-size: 12px;
            font-weight: 550;
            line-height: 20px;
            white-space: pre-wrap;
            text-align: left;
          }
        }
      }
    }
  }
}
</style>