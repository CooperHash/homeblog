<template>
  <div class="CZ_root">
    <div class="left"></div>
    <div class="right">
      <div class="main">
        <div class="loading" v-show="!flag">
          <a-skeleton active :paragraph="{ rows: 14 }" />
        </div>
        <div id="video" v-show="flag">
          <video
            controls
            width="360"
            height="203"
            :src="video"
            id="videoBarrage"
          ></video>
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
      flag: false,
      video: "",

      danmus: ["danmu1", "danmu2", "danmu3", "1234"],
    };
  },

  mounted: function () {
    this.id = this.$store.state.czId;
    var url = "/language/api/getChaoZhouById?id=" + String(this.id);

    const promise = new Promise((resolve, reject) => {
      resolve("success");
    });

    promise
      .then(() => {
        this.$http.get(url).then((res) => {
          console.log("welcome to ChaoZhou~");
          // this.video = res.data[0].video;
          this.video = res.data[0].video;
        });
      })
      .then(() => {
        this.flag = true;
      });

    // var iframe = document.getElementById('iframe1');
    // setTimeout(() => {
    //   iframe.src = this.video
    // },5000)
  },
};
</script>

<style lang="less" scoped>
@media screen and (min-width: 1100px) {
  .CZ_root {
    background-color: #f4f5f5;
    .left {
      width: 40%;
    }

    .right {
      margin-right: 10px;
      .main {
        width: 100%;
        .loading {
          position: absolute;
          left: 300px;
          width: 885px;
          height: 500px;
        }
        #video {
          margin-top: 20px;
        }
      }
    }
  }
}

@media screen and (max-width: 1100px) and (min-width: 500px) {
  .CZ_root {
    background-color: #f4f5f5;
    .left {
      width: 10%;
    }

    .right {
      margin-right: 10px;
      .main {
        width: 100%;
        .loading {
          position: absolute;
          left: 80px;
          width: 885px;
          height: 500px;
        }
        #video {
          margin-top: 40px;
          position: relative;
          left: -20px;
        }
      }
    }
  }
}

@media screen and (max-width: 450px) {
  .CZ_root {
    background-color: #f4f5f5;
    .left {
      width: 10%;
    }

    .right {
      margin-right: 10px;
      .main {
        width: 100%;
        .loading {
          width: 360px;
          height: 203px;
        }
        #video {
          
        }
      }
    }
  }
}
</style>