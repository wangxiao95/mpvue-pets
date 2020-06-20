<template>
  <div class="">
    <span>mine</span>
    <Bar active="mine"></Bar>
  </div>
</template>

<script>

  import Bar from "../../components/Bar"

  export default {
    components: {
      Bar
  },

  data () {
    return {

    }
  },

  created () {

  },
  onShow() {
    console.log(this.getTabBar);
    mpvue.hideHomeButton()
    // if (typeof this.getTabBar === 'function' &&
    //   this.getTabBar()) {
    //   this.getTabBar().setData({
    //     selected: 2
    //   })
    // }
  }
}
</script>

<style lang="less">
</style>
