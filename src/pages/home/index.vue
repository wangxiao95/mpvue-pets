<template>
  <div class="home">
    <Search theme="#d6dfe6"></Search>
    <div class="home-wrapper">
      <div class="card-column" id="left-column">
        <Card v-for="(item, i) in leftColumn" :key="i" :item="item"/>
      </div>
      <div class="card-column" id="right-column">
        <Card v-for="(item, i) in rightColumn" :key="i" :item="item"/>
      </div>
    </div>
  </div>
</template>

<script>
  import Search from '../../components/Search'
  import Card from '../../components/Card'
  // import _ from 'lodash'

  mpvue.cloud.init()
  const db = mpvue.cloud.database()

  export default {
    components: {
      Search,
      Card
    },

    data () {
      return {
        dogs: [],
        leftColumn: [],
        rightColumn: []
      }
    },
    methods: {
      pushColumn () {
        this.dogs.forEach((item, i) => {
          if (i % 2) {
            this.rightColumn.push(item)
          } else {
            this.leftColumn.push(item)
          }
        })
      }
    },
    created () {
      db.collection('dogs').limit(10).get()
        .then(res => {
          this.dogs = res.data
          this.dogs = this.dogs.map(item => {
            return Object.assign(item, {
              mainImg: `cloud://prod-2.7072-prod-2-1302420057/dogs/${item.mainImg}`
            })
          })
          this.pushColumn()
        })
    }
  }
</script>

<style lang="less">
  @import '../../assets/styles/var';

  .home {
    /*padding-top: 108rpx;*/
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
