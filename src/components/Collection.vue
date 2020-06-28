<template>
  <div class="collection">
    <i-icon :color="color" size="24" :type="icon" @click="change"/>
    <i-toast id="toast" />
  </div>
</template>

<script>
  import { $Toast } from '../../static/components/iview/base'
  import store from '../store'

  const db = mpvue.cloud.database()

  export default {
    props: {
      state: {
        type: Boolean,
        default: false
      },
      id: {
        type: String
      }
    },
    data() {
      return {
        icon: 'like',
        tip: '收藏成功',
      }
    },
    computed: {
      color() {
        return this.state ? '#ff7800' : '#ccc'
      }
    },
    watch: {
      state(val) {
        if (val) {
          this.tip = '收藏成功'
          this.icon = 'like_fill'
        } else {
          this.tip = '取消收藏成功'
          this.icon = 'like'
        }
        $Toast({
          content: this.tip
        })
      },
      id: {
        immediate: true,
        handler() {
          this.getCollectionState()
        }
      }
    },
    methods: {
      change() {
        this.collectionChange(!this.state)
      },
      getCollectionState() {
        if (!store.state.login) {
          return
        }
        db.collection(`user`).where({ unionId: store.state.userInfo.unionId, star: this.id }).get()
          .then(res => {
            this.$emit('change', res.data.length)
          })
      },
      collectionChange(state) {
        if (!store.state.login) {
          console.log('pls login')
          return
        }
        // const type = state ? 'push' : 'remove'
        const command = db.command
        db.collection(`user`).where({ unionId: store.state.userInfo.unionId }).update({
          data: {
            star: state ? command.addToSet({
                each: [this.id]
              }) :
              command.pull(this.id)
          }
        })
          .then(() => {
            this.$emit('change', state)
          })
      }
    },
  }
</script>

<style lang="less">

</style>
