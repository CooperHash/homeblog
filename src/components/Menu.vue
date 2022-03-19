<template>
  <div class="menu_page">
    <div class="pop-out">
      <button @click="turnShow">请选择文章分类</button>
      <transition-group class="menu-list"  name="fade" v-if="isShow">
        <div class="list" v-for="item in List" :key="item.id" >
          <div class="item">{{ item.name }}</div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menuList: {},
  },
  data() {
    return {
      List: this.menuList,
      isShow: false,
    };
  },

  methods: {
    turnShow() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style lang="less">
.menu_page {
  height: 180px;
  width: calc(100%);
  z-index: 99;
  .pop-out {
    button {
      border: none;
      height: 20px;
      border-radius: 25px;
    }

    .menu-list {
      display: flex;
      flex-direction: column;
      width: 100%;
      box-shadow:
       inset 0 -3em 3em rgba(0,0,0,0.1),
             0 0  0 2px rgb(255,255,255),
             0.3em 0.3em 1em rgba(0,0,0,0.3);

      .item {
        background-color: white;
      }
    }
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
  }
}
</style>