<template>
  <i-tab-bar :current="active" :color="color" @change="handleChange" :fixed="true">
    <i-tab-bar-item key="homepage" icon="homepage" current-icon="homepage_fill" title="首页"></i-tab-bar-item>
    <i-tab-bar-item key="group" icon="group" current-icon="group_fill" title="朋友"></i-tab-bar-item>
    <i-tab-bar-item key="remind" icon="remind" current-icon="remind_fill" title="通知"></i-tab-bar-item>
    <i-tab-bar-item key="mine" icon="mine" current-icon="mine_fill" title="我的"></i-tab-bar-item>
  </i-tab-bar>
</template>

<script>
  export default {
    name: "Bar",
    props: ['active', 'color'],
    methods: {
      handleChange() {
        this.$emit('change')
      }
    }
  };
</script>

<style scoped>

</style>
