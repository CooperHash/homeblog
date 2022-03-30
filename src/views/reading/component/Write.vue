<template>
  <div class="write_page">
    <div class="write">
      <textarea placeholder="记录当下~">
      </textarea>
      <button @click="finish">完成</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canEditor: this.canType
    }
  },

  methods: {
    editor() {
      this.canEditor = !this.canEditor;
    },

    finish() {
      this.$emit('finish')
    },
  }
}
</script>

<style lang="less">
.write_page {
  position: fixed;
  right: 100px;
  top: 100px;
  .write {
    textarea {
      width: 400px;
      height: 600px;
      font-size: 22px;
    }
    button {
      font-size: 22px;
    }
  }
}
</style>