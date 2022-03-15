<template>
    <div id="app">
      <blog-header></blog-header>
      <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {

    };
  },
};
</script>

<style>
#app {
  font-family: -apple-system,system-ui,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,BlinkMacSystemFont,"Helvetica Neue","PingFang SC","Hiragino Sans GB","Microsoft YaHei",Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
