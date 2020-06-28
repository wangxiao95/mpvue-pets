<template>
  <div class="search-root">
    <div class="search-page" :style="{background: theme}">
      <div class="search-page__inner">
        <i-icon i-class="search-page__icon" type="search" />
        <input class="search-page__text" confirm-type="search" @confirm="goSearch" :value="value" autofocus placeholder="请输入搜索关键字" @input="search" />
      </div>
      <span class="search-btn" @click="cancel">取消</span>
    </div>
    <div v-show="thinkList.length" class="search-think">
      <div class="search-think__item" v-for="(item, i) in thinkList" :key="item._id" @click="thinkKeyClick(item.name)">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import store from '../../store'

  const db = mpvue.cloud.database()

  export default {
    name: 'search',
    props: {
      theme: {
        type: String,
        default: '#fff'
      }
    },
    data() {
      return {
        value: '',
        thinkList: []
      }
    },
    methods: {
      search: _.debounce(function(e) {
        const val = e.target.value
        this.value = val
        if (val) {
          this.thinkKeyWord(val)
        }
      }, 300),
      async thinkKeyWord(val) {
        const dog = await db.collection('dog').where({
          name: db.RegExp({
            regexp: val,
            options: 'i',
          })
        }).field({
          name: true
        }).get()
        const cat = await db.collection('cat').where({
          name: db.RegExp({
            regexp: val,
            options: 'i',
          })
        }).field({
          name: true
        }).get()
        const result = dog.data.concat(cat.data)
        this.thinkList = result
      },
      thinkKeyClick(val) {
        this.value = val
        this.goSearch()
      },
      goSearch() {
        store.commit('updateSearchKw', this.value)
        mpvue.navigateTo({
          url: '../searchResult/main?kw=' + this.value
        })
      },
      cancel() {
        mpvue.navigateBack()
      }
    },
    onShow() {
      this.value = ''
      this.thinkList = []
    }
  }
</script>

<style lang="less">
  .search-page {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 108rpx;
    line-height: 108rpx;
    padding: 20rpx 20rpx;
    &__inner {
      flex: 1;
      /*display: inline-block;*/
      /*width: 702rpx;*/
      height: 68rpx;
      line-height: 68rpx;
      color: #999;
      font-size: 26rpx;
      border-radius: 10rpx;
      background: #fff;
      padding: 0 26rpx;
      border: 1px solid #ff7800;
    }
    &__icon {
      font-size: 32rpx !important;
      /*vertical-align: 14rpx !important;*/
    }
    &__text {
      display: inline-block;
      margin-left: 20rpx;
      height: 52rpx;
      line-height: 52rpx;
      /*padding: 20rpx 20rpx;*/
      margin-top: 8rpx;
    }
  }
  .search-btn {
    /*flex-shrink: 0;*/
    display: inline-block;
    font-size: 26rpx;
    color: #292929;
    width: 80rpx;
    height: 68rpx;
    line-height: 68rpx;
    text-align: center;
    margin-left: 20rpx;
    border-radius: 34rpx;
    /*border: 1px solid #ff7800;*/
    /*background: #ff7800;*/
  }
  .search-think {
    margin-top: 20rpx;
    background: #fff;
    padding: 0 20rpx;

    &__item {
      color: #999;
      font-size: 24rpx;
      line-height: 90rpx;
      /*padding-left: 50rpx;*/
      border-bottom: 1px solid #EAEAEA;
    }
  }
</style>
