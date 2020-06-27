<template>
  <div class="home root-page">
    <div class="search-container">
      <Search theme="#ff7800"></Search>
    </div>
    <div class="inner">

      <scroll-view :scroll-y="true" style="height: calc(100vh - 200rpx)" :enable-back-to-top="true" @scrolltolower="loadMore" :lower-threshold="50">
        <div class="pets">
          <div class="pets-item" @click="changeType('dog')">狗</div>
          <div class="pets-item" @click="changeType('cat')">猫</div>
        </div>
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
    </div>
    <Bar active="home"></Bar>
  </div>
</template>

<script>
  import Search from '../../components/Search'
  import Card from '../../components/Card'
  import Bar from '../../components/Bar'
  import { file } from '../../utils/env'
  // import _ from 'lodash'

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
    watch: {
      type: {
        immediate: true,
        handler() {
          this.reset()
          this.init()
        }
      }
    },
    methods: {
      reset() {
        Object.assign(this, {
          leftColumn: [],
          rightColumn: [],
          pageNo: 1,
          pageSize: 10,
          pageCount: 0,
        })
      },
      changeType(type) {
        this.type = type
      },
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
      },
      init() {
        this.getData()
        this.getPageCount()
      }
    },
    mounted () {
      this.init()
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
  .inner {
    /*background: rgba(255, 120, 0, .1);*/
    background: #f2f2f2;

    .pets {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      height: 160rpx;
      background: #fff;
      border-radius: 10px;
      margin: 10px auto 4px;
      &-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        width: 50%;
        color: #555;
      }
    }
  }
  .home {
    padding: 108rpx 20rpx 0;
    &-wrapper {
      display: flex;
      justify-content: space-between;
      /*padding: 0 20rpx;*/
    }
    /*.fixed-top {*/
      /*position: fixed;*/
      /*top: 0;*/
      /*left: 0;*/
    /*}*/
  }

  .card-column {
    float: left;
    width: 350rpx;
    /*border: 1px solid;*/
    &:last-child {
      /*margin-left: 30rpx;*/
    }
  }

</style>
