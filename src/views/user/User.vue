<template>
  <div class="user_root">
    <div class="main">
      <input v-model="name" placeholder="用户名" />
      <input v-model="password" placeholder="密码" />
      <button @click="saveUser">提交</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      password: ''
    }
  },

  mounted: function() {
  },
  methods: {
    saveUser() {
      this.$store.state.isLogin = true;
      var name = this.name;
      var password = this.password;
      this.$http.post('/user/api/saveUser',{
        name,password
      }).then((res) => {
        console.log('保存用户');
        console.log(res);
        localStorage.setItem('user_token',res.data.token)
      })
      alert('用户注册成功');
      this.$store.state.isLogin = true;
      this.$router.push({ path: 'ShowArticle' })    
    }
  }
}
</script>

<style lang="less">
.user_root {
  .main {
    input {
      width: 160px;
      height: 45px;
      border: 1px lightskyblue;
      margin-right: 40px;
    }
  }
}
</style>