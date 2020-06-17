<template>
  <div class="van-search" :style="{background: theme}">
    <div class="van-search__content van-search__content--round">
      <div class="van-cell van-cell--borderless van-field">
        <div class="van-field__left-icon"><i class="van-icon van-icon-search"><!----></i></div>
        <div class="van-cell__value van-cell__value--alone van-field__value" style="width: 100%;">
          <div class="van-field__body"><input type="search" placeholder="请输入搜索关键词" class="van-field__control"></div>
        </div>
      </div>
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
    }
  }
</script>

<style lang="less">
  @import "../assets/styles/var.less";
  /*@import "../assets/styles/reset.less";*/
  /*@import "../assets/icon/index.less";*/
  /*@import "../assets/icon/encode.less";*/
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
