<template>
  <div class="mine">
    <div class="mine-head">
      <button @click="login">登录</button>
    </div>
    <Bar active="mine"></Bar>
  </div>
</template>

<script>

  import Bar from '../../components/Bar'

  export default {
    components: {
      Bar
    },

    data() {
      return {}
    },
    methods: {
      login() {
        mpvuw.login({
          success (res) {
            if (res.code) {
              //发起网络请求
              wx.request({
                url: 'https://test.com/onLogin',
                data: {
                  code: res.code
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }
    },
    created() {

    },
    onShow() {
      console.log(this.getTabBar)
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
