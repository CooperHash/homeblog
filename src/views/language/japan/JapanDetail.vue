<template>
  <div class="japanDetail_root">
    <div class="left"></div>
    <div class="right">
      <div class="detail">
        <div class="top">
          <img :src="image + String('normal')" />
          <audio
            controls
            name="media"
            class="audio"
            type="audio/mpeg"
            :src="audio"
          ></audio>
        </div>
        <div class="title">{{ title }}</div>
        <div class="outList">
          <div class="List" v-for="item in contentList" :key="item.id">
            {{ item.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 0,
      image: "",
      content: "",
      title: "",
      audio: "",
      contentList: [],
    };
  },

  mounted: function () {
    this.id = this.$store.state.japanId;
    var url = "/language/api/getAudioById?id=" + String(this.id);
    this.$http.get(url).then((res) => {
      // console.log("获取音频连接~");
      // console.log(res);
      // var blob = new Blob([res.data[0]], { type: "audio/mpeg" });
      // var audio = URL.createObjectURL(blob);
      // this.audio = audio;
      // console.log(audio);

      var BASE64_MARKER = ";base64,";
      var dataURI = res.data[0].audio;
      //获取纯base64，去掉前缀
      var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
      var base64 = dataURI.substring(base64Index);
      // 对base64字符串进行解码
      var raw = window.atob(base64);
      var rawLength = raw.length;
      var array = new Uint8Array(new ArrayBuffer(rawLength));

      for (let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
      }

      var blob = new Blob([array], { type: "audio/mpeg" });
      var audio = URL.createObjectURL(blob);
      this.audio = audio;
      console.log(audio);
    });

    url = "/language/api/getJapanById?id=" + String(this.id);
    this.$http.get(url).then((res) => {
      console.log("获取具体日语文章~");
      console.log(res);
      this.image = res.data[0].image;
      this.title = res.data[0].title;
      this.content = res.data[0].content;
    });
    setTimeout(() => {
      var j = 1;
      var [start, end] = [0, 0];
      var turn = this.content.split("");
      for (let i = 0; i < turn.length; i++) {
        if (turn[i] == "？" || turn[i] == "！" || turn[i] == "。") {
          end = i + 1;
          this.contentList.push({
            id: j,
            content: turn.slice(start, end).join(""),
          });
          j++;
        } else if (
          turn[i] !== "\n" &&
          turn[i - 1] == "\n" &&
          turn[i - 2] == "\n"
        ) {
          console.log("start变了~");
          start = i;
        }
      }
      console.log("contentList: ");
      console.log(this.contentList);
    }, 300);
  },
};
</script>

<style lang="less" scoped>
@media screen and (min-width: 1100px) {
  .japanDetail_root {
    display: flex;
    background-color: rgb(249, 249, 249);

    .left {
      width: 20%;
      background-color: #fff;
    }

    .right {
      width: 100%;

      .detail {
        margin-left: 25%;
        margin-right: 30%;
        display: flex;
        flex-direction: column;

        .top {
          margin-top: 12px;
          width: 595px;
          height: 440px;
          border-radius: 12px;
          background-color: #fff;
        }

        .top img {
          margin-top: 12px;
          border-radius: 12px;
        }

        .top audio {
          width: 480px;
          height: 98px;
        }

        .title {
          width: 550px;
          margin-left: 20px;
          margin-right: 20px;
          margin-top: 25px;
          font-size: 30px;
          font-weight: bolder;
          margin-bottom: 25px;
          text-align: left;
          justify-content: center;
          align-content: center;
        }

        .outList .List:nth-child(2n + 1) {
          color: black;
          margin-top: 40px;
          margin-bottom: 8px;
          font-size: 21px;
          font-weight: normal;

          .List {
            font-family: Arial, Helvetica, sans-serif;
          }
        }

        .outList .List:nth-child(2n) {
          font-weight: bolder;
          color: #3f9fe6;
          font-size: 18px;
        }

        .outList {
          width: 550px;
          margin-left: 20px;
          margin-right: 20px;
        }
      }
    }
  }
}

@media screen and (max-width: 450px) {
  .japanDetail_root {
    display: flex;
    background-color: rgb(249, 249, 249);

    .right {
      width: 100%;

      .detail {
        margin-left: 19px;
        width: 380px;
        display: flex;
        flex-direction: column;

        .top {
          margin-top: 12px;
          width: 360px;
          height: 266px;
          border-radius: 12px;
          background-color: #fff;
        }

        .top img {
          width: 333px;
          height: 187px;
          margin-top: 12px;
          border-radius: 12px;
        }

        .top audio {
          margin-top: 10px;
          width: 310px;
          height: 50px;
        }

        .title {
          width: 360px;
          margin-top: 25px;
          font-size: 26px;
          font-weight: bolder;
          margin-bottom: 25px;
          text-align: left;
          justify-content: center;
          align-content: center;
        }

        .outList .List:nth-child(2n + 1) {
          color: black;
          margin-top: 20px;
          margin-bottom: 8px;
          font-size: 16px;
          font-weight: normal;

          .List {
            font-family: Arial, Helvetica, sans-serif;
          }
        }

        .outList .List:nth-child(2n) {
          font-weight: bolder;
          color: #3f9fe6;
          font-size: 18px;
        }

        .outList {
          width: 360px;

        }
      }
    }
  }
}
</style>