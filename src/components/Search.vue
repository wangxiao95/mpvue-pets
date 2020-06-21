<template>
  <div class="search" :style="{background: theme}">
    <div class="search-inner" @click="goSearch">
      <i-icon i-class="icon" type="search" />
      <span class="search-inner__text">请输入搜索关键字</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'search',
    props: {
      theme: {
        type: String,
        default: 'rgb(79, 192, 141)'
      }
    },
    methods: {
      goSearch() {
        mpvue.navigateTo({
          url: '../search/main'
        })
      }
    }
  }
</script>

<style lang="less">
.search {
  /*display: flex;*/
  /*align-items: center;*/
  /*justify-content: center;*/
  width: 100%;
  height: 108rpx;
  line-height: 108rpx;
  padding: 20rpx 20rpx;
  &-inner {
    /*width: 702rpx;*/
    height: 68rpx;
    line-height: 68rpx;
    color: #999;
    font-size: 26rpx;
    border-radius: 34rpx;
    background: #fff;
    padding: 0 26rpx;
    .icon {
      font-size: 32rpx !important;
      vertical-align: -1px;
    }
    &__text {
      display: inline-block;
      margin-left: 20rpx;
    }
  }
}
</style>
