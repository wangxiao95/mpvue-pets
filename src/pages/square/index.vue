<template>
  <div class="">
    <span>sqdsua23re</span>
    <span>hahaha</span>
    <Bar active="square"></Bar>
  </div>
</template>

<script>
  import Bar from "../../components/Bar"

  export default {
    components: {
      Bar
    },

    data() {
      return {}
    },

    created() {

    },
    onShow() {
      mpvue.hideHomeButton()
      // if (typeof this.getTabBar === 'function' &&
      //   this.getTabBar()) {
      //   this.getTabBar().setData({
      //     selected: 1
      //   })
      // }
    }
  };
</script>

<style lang="less">

</style>
