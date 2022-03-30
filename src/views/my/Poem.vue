<template>
  <div class="poem_page">
    <three
      v-on="{ destroy: destroyed, isOpen: passCache }"
      :slide="needSlide"
    >
      <template v-slot:navList>
        <li @click="toKp" :style="validateList.validate1 ? enable : disable">
          K-Pop
        </li>
        <li @click="toPoem" :style="validateList.validate2 ? enable : disable">
          古诗三千
        </li>
        <li @click="toThink" :style="validateList.validate3 ? enable : disable">
          今日有感
        </li>
      </template>
      <template v-slot:img_1>
        <img src="https://cdn.homeblog.top/uPic/Sa20PB.png" />
      </template>
      <template v-slot:img_2>
        <img src="https://cdn.homeblog.top/uPic/SwtJTv.png" />
      </template>
      <template v-slot:popular>
        <div class="popular">道上三两支</div>
      </template>
      <template v-slot:poemList>
        <div
          class="poemList"
          v-for="item in poemList"
          :key="item.category"
          @click="toDetail(item.category)"
        >
          <img :src="item.cateImg" />
          {{ item.cateName }}
        </div>
      </template>
      <template v-slot:backTo>
        <div class="backTo" @click="backTo($event)"></div>
      </template>
      <template v-slot:poemItem>
        <div
          class="poemItem"
          v-for="i in poemDetail"
          :key="i.id"
          @click="toPage(i.id, $event)"
        >
          {{ i.title }}
        </div>
      </template>
      <template v-slot:pageDetail>
        <div class="pageDetail" v-for="i in pageDetail" :key="i.index">
          <div class="page_title">{{ i.title }}</div>
          <div class="page_content">{{ i.content }}</div>
        </div>
      </template>
    </three>
  </div>
</template>

<script>
import arrayMethods from "../../utils/newArray";
import Three from "../../position/Three.vue";
export default {
  components: { Three },
  data() {
    return {
      needSlide: true,
      level: 0,
      poemCate: 0,
      pageDetail: [],
      poemList: [],
      poemDetail: [],
      caches: [],
    };
  },

  mounted: function () {
    this.poemDetail._proto_ = arrayMethods;
    const url = "poem/api/getCategory";
    this.$http.get(url).then((res) => {
      this.poemList = res.data.data;
    });
  },

  methods: {
    passCache() {
      if (this.level !== 1) {
        let target = this.caches[this.caches.length - 1];
        console.log("target: ");
        console.log(target);
        if (target.length === 1) {
          this.pageDetail.push(target.slice());
          console.log("this.pageDetail: ");
          console.log(this.pageDetail);
        } else {
          target.forEach((i) => {
            this.poemDetail.push(i);
          });
        }
        this.level--;
      }
    },

    backTo(e) {
      this.level--;
      this.pageDetail.splice(0, this.pageDetail.length);
      this.poemDetail.splice(0, this.poemDetail.length);
      this.caches[this.caches.length - 1].forEach((i) => {
        this.poemDetail.push(i);
      });
      this.caches.pop();
      e.stopPropagation();
    },

    toDetail(id) {
      this.poemCate = id;
      if (this.level !== 0) {
        this.caches.push(this.poemDetail.slice());
      }
      this.level++;
      let url = "poem/api/getDetail?id=";
      this.poemDetail.splice(0, this.poemDetail.length);
      switch (id) {
        case 1:
          url += String(id);
          this.$http.get(url).then((res) => {
            res.data.forEach((i) => {
              this.poemDetail.push(i);
            });
          });
          break;

        case 2:
          url += String(id);
          this.$http.get(url).then((res) => {
            res.data.forEach((i) => {
              this.poemDetail.push(i);
            });
          });
      }
    },

    toPage(id, e) {
      this.level++;
      this.caches.push(this.poemDetail.slice());
      this.poemDetail.splice(0, this.poemDetail.length);
      let url = "poem/api/getPage?id=" + String(this.poemCate);
      this.$http.get(url).then((res) => {
        console.log("获取具体页面");
        res.data.forEach((i) => {
          if (i.id === id) {
            this.pageDetail.push(i);
          }
        });
      });
      e.stopPropagation();
    },

    destroyed() {
      if (this.pageDetail.length !== 0) {
        this.caches.push(this.pageDetail.slice());
      }
      this.pageDetail.splice(0, this.pageDetail.length);
      this.poemDetail.splice(0, this.poemDetail.length);
      console.log(this.poemDetail);
    },
  },
};
</script>

<style lang="less">
.popular {
  margin-top: 5vh;
  margin-bottom: 5vh;
  font-size: 24px;
  font-weight: 450;
  text-align: left;
  margin-left: 5vw;
}
.backTo {
  margin-top: 2vh;
  margin-left: 1vw;
  width: 2vw;
  height: 2vw;
  border-top: 0.4vw solid #ccc;
  border-left: 0.4vw solid #ccc;
  transform: rotate(-45deg);
  cursor: pointer;
}
.poemList {
  display: flex;
  flex-direction: column;
  margin-left: 2vw;
  margin-bottom: 4vh;
  cursor: pointer;
  img {
    width: 130px;
    height: 130px;
    border-radius: 12px;
  }
}

.pageDetail {
  overflow: scroll;
  width: 26vw;
  margin: auto;
  .page_title {
    font-size: 20px;
  }

  .page_content {
    white-space: pre-line;
  }
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.poemItem {
  margin-top: 5vh;
  font-size: 18px;
  line-height: 18px;
  cursor: pointer;
}
</style>