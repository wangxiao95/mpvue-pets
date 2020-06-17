<template>
  <div class="home">
    <Search></Search>
    <div class="home-wrapper">
      <div class="card-column" id="left-column">
        <Card v-for="(item, i) in leftColumn" :key="i" :name="item.name" :img="item.mainImg"/>
      </div>
      <div class="card-column" id="right-column">
        <Card v-for="(item, i) in rightColumn" :key="i" :name="item.name" :img="item.mainImg"/>
      </div>
    </div>
  </div>
</template>

<script>
  import Search from '../../components/Search'
  import Card from '../../components/Card'

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
          if (i === 0) {
            this.leftColumn.push(item)
            return false
          }
          this.getDomPosition(item)
        })
      },

      getDomPosition(item) {
        let left = 0, right = 0
        const query = mpvue.createSelectorQuery()
        query.select(`#left-column`).fields({size: true}, res => {
          left = res.height
          console.log(left)
          query.select(`#right-column`).fields({size: true}, res => {
            right = res.height
            // console.log(right)
            if (left >= right) {
              // this.leftColumn.push(item)
            } else {
              // this.rightColumn.push(item)
            }
          }).exec()
        }).exec()

      },
    },
    created () {
      db.collection('dogs').limit(10).get()
        .then(res => {
          console.log(res)
          this.dogs = res.data
          console.log(this)
          this.pushColumn()
        })
    }
  }
</script>

<style lang="less">
  @import '../../assets/styles/var';

  .home {
    &-wrapper {
      /*display: flex;*/
      /*justify-content: space-between;*/
      padding: 0 15px;
    }
  }

  .card-column {
    float: left;
    width: calc((100vw - 45px) / 2);
    border: 1px solid;
    &:last-child {
      margin-left: 10px;
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
