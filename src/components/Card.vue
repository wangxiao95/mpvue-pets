<template>
  <div class="card" @click="goDetail">
    <div v-if="cardType === 'small'" class="card-small">
      <img :src="data.mainImg" :style="{width: outW + 'rpx', height: h * outW / w + 'rpx'}" alt="">
      <div class="detail">
        {{ data.name }}
      </div>
    </div>
    <div v-else class="card-large">
      <img :src="data.mainImg" :style="{width: '300rpx', height: '200rpx'}" alt="">
      <div class="detail">
        <span>{{ data.name }}</span>
<!--        <span>{{ item.price }}</span>-->
      </div>
      <Collection :id="data.mainId"/>

    </div>
  </div>
</template>

<script>
import { file } from '../utils/env'
import _ from 'lodash'
import Collection from './Collection'

export default {
  components: {
    Collection
  },
  props: {
    cardType: {
      type: String,
      default: 'small'
    },
    item: {
      type: Object,
      default: () => {
        return {
          mainId: '',
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
      outW: 350,
      data: {
        name: '',
        mainImg: '',
        detailId: ''
      }
    }
  },
  computed: {

  },
  watch: {
    item: {
      immediate: true,
      handler(val) {
        this.data = _.assign({}, val, { mainImg: `${file}${this.type}s/${val.mainImg}`})
        mpvue.getImageInfo({
          src: this.data.mainImg,
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
      // console.log(this.item);
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
  width: 100%;

  &-small {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 5px;
    /*border-bottom-left-radius: unset;*/
    /*border-bottom-right-radius: unset;*/
    overflow: hidden;
    /*padding: 20rpx 20rpx 0;*/
    margin-top: 6px;
    background: #fff;
    box-sizing: border-box;
    img {
      /*display: block;*/
      /*max-width: 100%;*/
      height: 130px;
    }
    .detail {
      font-size: 28rpx;
      color: #555;
      line-height: 60rpx;
      text-align: center;
    }
  }
  &-large {
    display: flex;
    align-items: center;
    justify-content: start;
    img {
      margin-right: 15px;
    }
    .detail {
      color: #555;
    }
  }
}
</style>
