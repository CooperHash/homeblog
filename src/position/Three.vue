<template>
  <div class="three_page">
    <div class="three">
      <div class="left">
        <ul class="navList">
          <slot name="navList"></slot>
        </ul>
      </div>
      <div class="main">
        <div class="img_slide" v-if="needSlide">
          <swiper v-bind:options="swiperOption">
            <swiper-slide>
              <slot name="img_1"></slot>
            </swiper-slide>
            <swiper-slide>
              <slot name="img_2"></slot>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>
        <slot name="article"></slot>
        <slot name="bookList"></slot>
        <slot name="reading"></slot>
        <slot name="search"></slot>
        <slot name="article"></slot>
        <slot name="write"></slot>
        <slot name="popular"></slot>
        <div class="hot">
          <slot name="kpop"></slot>
          <slot name="poemList"></slot>
          <slot name="homeDetail"></slot>
        </div>
      </div>
      <div class="right">
        <div class="pull" @click="pull"></div>
        <transition name="slide-fade">
          <div class="pop" v-show="isPop" @click="back">
            <slot name="backTo"></slot>
            <slot name="poemItem"></slot>
            <slot name="pageDetail"></slot>
          </div>
        </transition>
        <slot name="min-music"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
  props: {
    play: Boolean,
    nav: Boolean,
    slide: Boolean,
  },
  data() {
    return {
      isPlay: this.play,
      isPop: false,
      isNav: this.nav,
      needSlide: this.slide,
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
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
    };
  },
  mounted: function () {
    let pull = this.getClassList("pull");
  },
  methods: {
    pull() {
      this.isPop = !this.isPop;
      this.$emit("isOpen");
    },

    back() {
      this.isPop = !this.isPop;
      this.$emit("destroy");
    },

    toKp() {
      this.isValidate(this.validateList, "validate1");
      this.$router.push({ path: "/Kpop" });
    },

    toPoem() {
      this.isValidate(this.validateList, "validate2");
      this.$router.push({ path: "/Poem" });
    },

    toThink() {
      this.isValidate(this.validateList, "validate3");
    },
  },

  components: {
    swiper,
    swiperSlide,
  },
};
</script>

<style lang="less">
.three {
  width: 100%;
  height: 100%;
  .left {
    float: left;
    width: 15vw;
    background-color: #f4f5f5;
    height: 88vh;
    overflow: scroll;

    .navList {
      list-style: none;
      margin-top: 20px;

      li {
        width: 10vw;
        height: 5vh;
        margin-bottom: 5vh;
        cursor: pointer;
        font-size: 18px;
      }
    }
  }

  .main {
    position: relative;
    margin-left: 20vw;
    margin-right: 20vw;
    background-color: #f4f5f5;
    width: auto;
    height: 88vh;
    overflow: scroll;

    .img_slide {
      img {
        width: 48vw;
        margin: auto;
        border-radius: 20px;
      }
    }

    .article {
      width: 48vw;
      margin: auto;

      .content {
        font-size: 18px;
        line-height: 1.7;
        text-align: left;
        width: 46vw;
        margin: auto;
      }
    }

    .bookList {
      width: 48vw;
      margin: auto;
      position: relative;
      top: 2vh;

      .book {
        width: 45vw;
        margin-bottom: 3vh;
        background-color: #fff;
        display: flex;
        align-items: center;

        .book-info {
          display: flex;
          flex-direction: column;
        }

        .book-introduce {
          margin-left: 5vw;
          background-color: #f4f5f5;
          width: 30vw;
          height: 150px;
          cursor: pointer;
        }
      }
    }

    .item {
      margin-top: 5vh;
      width: 45vw;
      background-color: #fff;
      .item-info {
        padding: 5vh;
        text-align: left;
        font-size: 18px;
        line-height: 18px;
        cursor: pointer;
      }

      .item-person {
        position: absolute;
        margin-top: 1vh;
        margin-left: 1vw;
      }
    }

    .hot {
      margin-top: 13vh;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      width: 48vw;
      margin: auto;
      overflow: scroll;

      .hot-item {
        display: flex;
        flex-direction: column;
        margin-left: 2vw;
        margin-bottom: 4vh;

        img {
          border-radius: 12px;
        }
      }
    }
  }

  .right {
    float: right;
    position: relative;
    top: -88vh;
    width: 15vw;
    background-color: #f4f5f5;
    height: 88vh;

    .pull {
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 3vw;
      border-color: transparent #f4f5f5 transparent transparent;
      border-radius: 3vw;
      position: absolute;
      top: 50vh;
      left: -5vw;
    }

    .pop {
      position: fixed;
      right: 0%;
      height: 80vh;
      background-color: #fff;
      width: 30vw;
      z-index: 20;
      overflow: scroll;
    }
  }
}
</style>