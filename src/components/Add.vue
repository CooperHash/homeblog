<template>
  <div class="root">
    <div @click="addArticle">
      <a-icon
        type="plus-circle"
        :style="{
          fontSize: '32px',
          color: 'blue',
          opacity: '0.75'
        }"
      />
    </div>
  </div>
</template>

<script>
export default {
  
  data() {
    return {
      add_show: true
    }
  },

  mounted: function() {

  },

  updated: function() {

  },

  methods: {
    addArticle() {
      this.$router.push({ path: "/Markdown" });
    },
  },
};
</script>

<style>
.root {
  position: fixed;
  top: 700px;
  left: 20px;
  z-index: 88;
}
</style>