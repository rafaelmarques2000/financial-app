<template>
  <div class="loading-content" v-if="show">
        <p class="loading-text">Processando aguarde...</p>
  </div>
</template>

<script>
export default {
  name: "loading",
  props:["show"]
}
</script>

<style scoped>
  .loading-content {
     position: fixed;
     top: 0;
     left: 0;
     bottom: 0;
     right: 0;
     background: rgba(0,0,0,0.8);
     z-index: 10000;
  }

  .loading-text {
     color: #fff;
     position: absolute;
     top: 50%;
     left: 50%;
     font-size: x-large;
  }
</style>