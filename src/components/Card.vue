<template>
  <div class="card" @click="goDetail">
    <img :src="item.mainImg" :style="{width: outW + 'rpx', height: h * outW / w + 'rpx'}" alt="">
    <div class="detail">
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          name: '',
          mainImg: '',
          detailId: ''
        }
      }
    },
    type: {
      type: String,
      default: 'dog'
    },
  },
  data() {
    return {
      w: '',
      h: '',
      outW: 345
    }
  },
  computed: {

  },
  watch: {
    item: {
      immediate: true,
      handler(val) {
        mpvue.getImageInfo({
          src: val.mainImg,
          success: res => {
            this.w = res.width
            this.h = res.height
          }
        })
      }
    }
  },
  methods: {
    goDetail() {
      console.log(this.item);
      mpvue.navigateTo({
        url: '../detail/main?id=' + this.item.detailId + '&type=' + this.type,
      })
    }
  },
  created() {

  }
}
</script>

<style lang="less">
.card {
  display: flex;
  flex-direction: column;
  width: 100%;
  /*border-radius: 10px;*/
  border-bottom-left-radius: unset;
  border-bottom-right-radius: unset;
  overflow: hidden;
  /*padding: 20rpx 20rpx 0;*/
  margin-top: 10px;
  background: #fff;
  box-sizing: border-box;
  img {
    /*display: block;*/
    /*max-width: 100%;*/
    height: 130px;
  }
  .detail {
    font-size: 28rpx;
    color: #282828;
    line-height: 60rpx;
    text-align: center;
  }
}
</style>
