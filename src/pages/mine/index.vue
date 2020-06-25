<template>
  <div class="mine">
    <div class="mine-head">
      <div v-if="isLogin">
        <img :src="userInfo.avatarUrl" alt="">
        <!--<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593078532427&di=9b49a1573f8eacaa9e855a804f34b919&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F14%2F75%2F01300000164186121366756803686.jpg" alt="">-->
        <div>{{userInfo.nickName}}</div>
      </div>
      <div v-else>
        <button open-type="getUserInfo" @click="login">登录</button>
      </div>
    </div>
    <Bar active="mine"></Bar>
  </div>
</template>

<script>

  import Bar from '../../components/Bar'
  import store from '../../store'
  import { getAuth } from '../../utils'
  import _ from 'lodash'

  const db = mpvue.cloud.database()

  export default {
    components: {
      Bar
    },

    data() {
      return {

      }
    },
    computed: {
      userInfo() {
        return store.state.userInfo
      },
      isLogin() {
        return store.state.login
      },
      userInfoAuth() {
        return store.state.auth['scope.userInfo']
      }
    },
    methods: {
      async login() {
        const a = await mpvue.getUserInfo()
        const b = await getAuth('userInfo')
        const c = await mpvue.login()
        console.log(a)
        console.log(b)
        console.log(c)
        try {
          if (!store.state.auth['scope.userInfo']) {
            await getAuth('userInfo')
          }
          const loginRes = await mpvue.login()
          const code = loginRes.code
          this.encodeUserInfo = await mpvue.getUserInfo()
          this.cloudLogin(code)
        } catch (e) {
          mpvue.log('登录失败！' + e.errMsg)
        }
      },
      cloudLogin(code) {
        mpvue.cloud.callFunction({
          // 云函数名称
          name: 'login',
          // 传给云函数的参数
          data: { code },
        })
          .then(res => {
            console.log(res)
            this.getRunData(res.result.session_key)
          })
          .catch(console.error)
      },
      async getRunData(sessionKey) {
        try {
          const { encryptedData, iv } = this.encodeUserInfo
          console.log(encryptedData, sessionKey, iv)
          const res = await mpvue.cloud.callFunction({
            name: 'getRunData',
            data: {
              encryptedData, sessionKey, iv
            },
          })
          const user = res.result
          store.commit('setUserInfo', user)
          const getUser = await db.collection(`user`).where({
            unionId: user.unionId
          }).get()
          const hasUser = getUser.data.length
          this.setUser(hasUser, user)
        } catch (e) {
          mpvue.log(e)
        }
      },
      async setUser(hasUser, user) {
        if (hasUser) {
          store.commit('updateLogin', true)
          return
        }
        try {
          await db.collection('user').add({
            // data 字段表示需新增的 JSON 数据
            data: _.assign(user, {
              star: [],
              comment: [],
              starComment: [],
              //我回复的帖子
              //回复我的帖子
              createdTime: new Date().getTime(),
            })
          })
          store.commit('updateLogin', true)
        } catch (e) {
          mpvue.log(e)
        }
      },
    },
    watch: {
      // 'store.state.login': {
      //   immediate: true,
      //   handle(val) {
      //     console.log(val)
      //     if (val) {
      //       this.img = store.state.userInfo.avatar
      //     }
      //   }
      // }
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
