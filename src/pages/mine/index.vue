<template>
  <div class="mine">
    <div class="mine-head">
      <div v-if="isLogin" class="mine-head__user">
        <i-avatar i-class="avatar" :src="userInfo.avatarUrl" size="large" shape="circle"></i-avatar>
        <div class="name">{{userInfo.nickName}}</div>
      </div>
      <div v-else class="mine-head__user">
        <i-avatar i-class="avatar" src="cloud://prod-2.7072-prod-2-1302420057/common/avatar.png" size="large" shape="circle"></i-avatar>
        <button class="login-btn" open-type="getUserInfo" @getuserinfo="getAuth">点击登录</button>
      </div>
    </div>
    <div>
      <i-cell-group i-class="cell-group">
        <i-cell title="我的收藏" is-link></i-cell>
        <i-cell title="我的帖子" is-link></i-cell>
        <i-cell title="回复我的" is-link></i-cell>
<!--        <i-cell title="跳转到首页" is-link url="/pages/dashboard/index"></i-cell>-->
      </i-cell-group>
      <i-cell-group i-class="cell-group">
        <i-cell title="检查更新" is-link>
          <div slot="footer" style="color: #999999; margin-right: 8px;">1.0.3</div>
        </i-cell>
        <i-cell title="关于我们" is-link></i-cell>
      </i-cell-group>
    </div>
    <Bar active="mine"></Bar>
  </div>
</template>

<script>

  import Bar from '../../components/Bar'
  import store from '../../store'
  import _ from 'lodash'

  const db = mpvue.cloud.database()

  export default {
    components: {
      Bar
    },

    data() {
      return {
        auth: false,
        encodeUserInfo: {}
      }
    },
    computed: {
      userInfo() {
        return store.state.userInfo
      },
      isLogin() {
        return store.state.login
      },
    },
    methods: {
      async getAuth(e) {
        const user = e.target

        this.login()
      },
      async login() {
        try {
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
          const getUser = await db.collection(`user`).where({
            openId: user.openId
          }).get()
          const hasUser = getUser.data.length
          if (hasUser) {
            store.commit('setUserInfo', getUser.data[0])
            store.commit('updateLogin', true)
            return
          }
          this.setUser(user)
        } catch (e) {
          mpvue.log(e)
        }
      },
      async setUser(user) {
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
          store.commit('setUserInfo', user)
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
.mine-head {
  &__user {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 320rpx;
    color: #fff;
    background: #ff7800;
    .avatar {
      width: 180rpx;
      height: 180rpx;
      border-radius: 50%;
      margin-bottom: 15px;
      /*image {*/
      /*  color: red;*/
      /*}*/
    }
    .name {

    }
    .login-btn {
      width: 120px;
      height: 40px;
      color: #fff;
      font-size: 28rpx;
      border-radius: 0;
      border: none;
      text-align: center;
      background: #ff7800;
      &:after {
        content: none;
      }
    }
  }

}
.cell-group {
  margin-top: 10px;
}
</style>
