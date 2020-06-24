<template>
  <div class="home root-page">
    <div class="search-container">
      <Search theme="#ff7800"></Search>
    </div>
    <scroll-view :scroll-y="true" style="height: calc(100vh - 200rpx)" :enable-back-to-top="true" @scrolltolower="loadMore" :lower-threshold="50">
      <div class="home-wrapper">
        <div class="card-column" id="left-column">
          <Card v-for="(item, i) in leftColumn" :key="i" :item="item" :type="type"/>
        </div>
        <div class="card-column" id="right-column">
          <Card v-for="(item, i) in rightColumn" :key="i" :item="item" :type="type"/>
        </div>
      </div>
      <i-load-more v-if="loading" />
      <i-load-more v-if="!loading" :tip="loadTip" :loading="false" />
    </scroll-view>
    <Bar active="home"></Bar>
  </div>
</template>

<script>
  import Search from '../../components/Search'
  import Card from '../../components/Card'
  import Bar from '../../components/Bar'
  import { file } from '../../utils/env'
  // import _ from 'lodash'

  // mpvue.cloud.init()
  const db = mpvue.cloud.database()

  export default {
    components: {
      Search,
      Card,
      Bar
    },

    data () {
      return {
        type: 'cat', // dog cat
        dog: [],
        cat: [],
        leftColumn: [],
        rightColumn: [],
        pageNo: 1,
        pageSize: 10,
        pageCount: 0,
        loading: false,
        loadTip: '下拉加载更多'
      }
    },
    methods: {
      pushColumn () {
        this[this.type].forEach((item, i) => {
          if (i % 2) {
            this.rightColumn.push(item)
          } else {
            this.leftColumn.push(item)
          }
        })
      },
      loadMore(e) {
        console.log(this.pageNo, this.pageCount);
        if (this.loading) {
          return
        }
        if (this.pageNo > this.pageCount) {
          this.loadTip = '没有更多啦'
          return
        }
        this.loading = true
        this.pageNo ++
        this.getData()
      },
      getData() {
        db.collection(this.type).skip((this.pageNo - 1) * this.pageSize).limit(this.pageSize).get()
          .then(res => {
            this.loading = false
            this[this.type] = res.data
            this[this.type] = this[this.type].map(item => {
              return Object.assign(item, {
                mainImg: `${file}${this.type}s/${item.mainImg}`
              })
            })
            this.pushColumn()
          })
      },
      async getPageCount() {
        const res = await db.collection(this.type).count()
        console.log(res);
        this.pageCount = Math.ceil(res.total / this.pageSize)
      }
    },
    mounted () {
      this.getData()
      this.getPageCount()
    },
    onShow() {
      mpvue.hideHomeButton()
      // if (typeof this.getTabBar === 'function' &&
      //   this.getTabBar()) {
      //   this.getTabBar().setData({
      //     selected: 0
      //   })
      // }
    }
  }
</script>

<style lang="less">
  @import '../../assets/styles/var';

  .search-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  .home {
    padding-top: 108rpx;
    background: rgba(255, 120, 0, .1);
    &-wrapper {
      display: flex;
      justify-content: space-between;
      padding: 0 20rpx;
    }
    /*.fixed-top {*/
      /*position: fixed;*/
      /*top: 0;*/
      /*left: 0;*/
    /*}*/
  }

  .card-column {
    float: left;
    width: 345rpx;
    /*border: 1px solid;*/
    &:last-child {
      /*margin-left: 30rpx;*/
    }
  }

  .van-search {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: @search-padding;
    background-color: @search-background-color;

    &__content {
      display: flex;
      flex: 1;
      padding-left: @padding-xs;
      background-color: @search-content-background-color;
      border-radius: @border-radius-sm;

      &--round {
        border-radius: @border-radius-max;
      }
    }

    &__label {
      padding: @search-label-padding;
      color: @search-label-color;
      font-size: @search-label-font-size;
      line-height: @search-input-height;
    }

    .van-cell {
      flex: 1;
      padding: 5px @padding-xs 5px 0;
      background-color: transparent;

      &__left-icon {
        color: @search-left-icon-color;
      }
    }

    &--show-action {
      padding-right: 0;
    }

    input {
      &::-webkit-search-decoration,
      &::-webkit-search-cancel-button,
      &::-webkit-search-results-button,
      &::-webkit-search-results-decoration {
        display: none;
      }
    }

    &__action {
      padding: @search-action-padding;
      color: @search-action-text-color;
      font-size: @search-action-font-size;
      line-height: @search-input-height;
      cursor: pointer;
      user-select: none;

      &:active {
        background-color: @active-color;
      }
    }
  }

</style>
