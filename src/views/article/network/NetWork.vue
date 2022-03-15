<template>
  <div class="net-work-page">
    <flex :List="navList"></flex>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        { id: 1, nav: 'HTTP1 2'},
        { id: 2, nav: 'HTTP3'},
        { id: 3, nav: 'TCP'},
        { id: 4, nav: 'UDP'},
      ]
    }
  }
}
</script>

<style>

</style>