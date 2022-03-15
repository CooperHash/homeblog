<template>
  <div class="root">
    <div class="navList">
      <div class="nav" v-for="item in navList" :key="item.id">
        <div class="title">{{ item.nav }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [{
        id: 1, nav: 'HTTP'
      },{
        id: 2, nav: 'TCP'
      },]
    }
  }
}
</script>

<style lang="less">
.root {
  width: 100%;
  .navList {
    
    margin-left: 4%;
    margin-right: 4%;
    display: flex;
    justify-content: space-between;

    .nav {
      width: 80px;
      height: 36px;
      background-color: #f4f5f5;

      .title {
        font-size: 16px;
      }
    }
  }
}
</style>