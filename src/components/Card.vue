<template>
  <div class="card">
    <img :src="img" alt="">
    <div class="detail">
      {{ name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String
    },
    name: {
      type: String
    }
  }
}
</script>

<style>
.card {
  display: flex;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
}
</style>
