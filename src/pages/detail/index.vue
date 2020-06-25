<template>
  <div class="detail">
    <swiper class="swiper" indicator-dots autoplay :indicator-active-color="primary">
      <swiper-item v-for="(item, i) in detail.imgs" :key="i">
        <div class="swiper-item">
          <img mode="aspectFill" :src="item" alt="" @click="preview(item)">
        </div>
      </swiper-item>
    </swiper>

    <div class="detail-info">
      <div class="name">{{detail.name}}</div>
      <div class="price"><span class="price-label">参考价格：</span>{{detail.price}}</div>
      <Collection :state="collectionState" :id="id" @change="collectionChange"/>
      <i-icon class="detail-share" size="24" color="#ccc" type="send"></i-icon>
    </div>
    <div class="detail-attrs">
      <div class="detail-attrs__item" v-for="(attr, i) in detail.attr" :key="i">
        <span>{{attr.label}}：</span>
        <span>{{attr.value}}</span>
      </div>
    </div>
    <div class="detail-attrs">
      <div class="detail-attrs__item" v-for="(attr, i) in detail.evaluate" :key="i">
        <span>{{attr.label}}：</span>
        <i-rate
          :disabled="true"
          :value="attr.value">
        </i-rate>
      </div>
    </div>
    <div style="height: 84rpx;">
      <div id="fixed" style="width: 100%; height: 100%;" :class="{'detail-fixed': isFixed}">
        <scroll-view scroll-x :scroll-left="tabScroll" scroll-with-animation style="width:100%;">
          <div style="width: 960rpx;">
            <i-tabs i-class="detail-tabs" :current="activeTab" :color="primary" @change="changeActive">
              <i-tab i-class="detail-tabs__item" v-for="(item, i) in detail.content" :key="i" :title="item.title"></i-tab>
            </i-tabs>
          </div>
        </scroll-view>
      </div>
    </div>

    <div class="detail-content">
      <div v-for="(item, i) in detail.content" :key="i" v-show="i == activeTab">
        <div class="detail-content__title">{{item.content.title}}</div>
        <rich-text class="rich-text" :nodes="item.content.word"></rich-text>
      </div>
    </div>
  </div>
</template>

<script>
import { file } from '../../utils/env'
import Collection from '../../components/Collection'
import store from '../../store'
import _ from 'lodash'

const db = mpvue.cloud.database()

export default {
  components: {
    Collection
  },

  data () {
    return {
      primary: '#ff7800',
      id: 'dog_1',
      type: 'dog',
      detail: {},
      activeTab: 0,
      scrollTop: 0,
      defaultScrollTop: 0,
      tabScroll: 0,
      collectionState: false
    }
  },
  computed: {
    isFixed() {
      if (!this.defaultScrollTop) {
        return false
      }
      return this.defaultScrollTop <= this.scrollTop
    }
  },
  methods: {
    changeActive(e) {
      console.log(e)
      const key = e.target.key
      this.activeTab = key
      this.tabScroll = (key - 2) * 180 + 'rpx'
    },
    getDetail() {
      db.collection(`${this.type}_detail`).doc(this.id).get()
        .then(res => {
          let data = res.data
          data = Object.assign(data, {
              imgs: data.imgs.map(item => `${file}${this.type}s/${item}`)
            })
          this.detail = data
        })
    },
    preview(url) {
      mpvue.previewImage({
        current: url, // 当前显示图片的http链接
        urls: this.detail.imgs // 需要预览的图片http链接列表
      })
    },
    collectionChange(state) {
      this.collectionState = state
    }
  },
  onPageScroll(event) {
    this.scrollTop = event.scrollTop
  },
  created () {

  },
  onLoad(query) {
    const { id, type } = query
    id && (this.id = id)
    type && (this.type = type)
    this.getDetail()
  },
  mounted() {
    setTimeout(() => {
      const query = mpvue.createSelectorQuery()
      query.select('#fixed').boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(res => {
        // res[0].top       // #the-id节点的上边界坐标
        // res[1].scrollTop // 显示区域的竖直滚动位置
        this.defaultScrollTop = res[0].top
      })
    }, 1000)
  }
}
</script>

<style lang="less">
.detail {
  width: 100%;
  height: 480rpx;
  padding-bottom: 50rpx;
  .swiper {
    height: 100%;
  }
  .swiper-item {
    height: 100%;
  }
  img {
    width: 100%;
    /*height: 100%;*/
  }
  &-info {
    position: relative;
    color:#222;
    padding: 40rpx 30rpx;
    background: #fff;
    margin-bottom: 20rpx;

    .name {
      font-weight: 800;
      margin-right: 50rpx;
    }
    .price {
      color: #ff7800;
      margin-top: 30rpx;

      &-label {
        color: #222;
        font-size: 26rpx;
      }
    }
  }
  &-share {
    position: absolute;
    top: 30rpx;
    right: 40rpx;
  }
  &-attrs {
    display: flex;
    flex-wrap: wrap;
    padding: 30rpx 30rpx;
    background: #fff;
    margin-bottom: 20rpx;

    &__item {
      width: 50%;
      font-size: 26rpx;
      color: #999;
      padding: 16rpx 0;
    }
  }
  &-fixed {
    position: fixed;
    top: 0;
    left: 0;
  }

  .detail-tabs {
    /*height: 80rpx !important;*/
    &__item {
      /*line-height: 80rpx;*/
      color: #222;
      /*padding: 0 24rpx;*/
      /*width: 180rpx;*/
    }
  }
  .detail-content {
    padding: 30rpx 30rpx;
    &__title {
      font-size: 30rpx;
      font-weight: 800;
      line-height: 80rpx;
    }
  }

  .rich-text {
    color: #555;
    font-size: 28rpx;
    line-height: 50rpx;
  }
}
</style>
