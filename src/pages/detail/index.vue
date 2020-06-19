<template>
  <div class="detail">
    <swiper class="swiper">
      <swiper-item v-for="(item, i) in detail.imgs" :key="i">
        <div class="swiper-item">
          <img mode="aspectFill" :src="item" alt="">
        </div>
      </swiper-item>
    </swiper>

    <div class="detail-info">
      <span>{{detail.name}}</span>
      <span>{{detail.price}}</span>
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
    <div style="height: 40px;">
      <div id="fixed" :class="{'detail-fixed': isFixed}">
        <i-tabs :current="activeTab" scroll @change="changeActive">
          <i-tab v-for="(item, i) in detail.content" :key="i" :title="item.title"></i-tab>
        </i-tabs>
      </div>
    </div>

    <div>
      <div v-for="(item, i) in detail.content" :key="i" v-show="i == activeTab">
        <div>{{item.content.title}}</div>
        <rich-text class="rich-text" :nodes="item.content.word"></rich-text>
      </div>
    </div>
  </div>
</template>

<script>
mpvue.cloud.init()
const db = mpvue.cloud.database()

export default {
  components: {

  },

  data () {
    return {
      detail: {},
      activeTab: 0,
      scrollTop: 0,
      defaultScrollTop: 0
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
      this.activeTab = e.target.key
    },
    getDetail(id) {
      db.collection('dog_detail').doc(id).get()
        .then(res => {
          let data = res.data
          data = Object.assign(data, {
              imgs: data.imgs.map(item => `cloud://prod-2.7072-prod-2-1302420057/dogs/${item}`)
            })
          this.detail = data
        })
    }
  },
  onPageScroll(event) {
    this.scrollTop = event.scrollTop
  },
  created () {

  },
  onLoad(query) {
    this.getDetail(query.id || 'dog_1')
  },
  mounted() {
    setTimeout(() => {
      const query = mpvue.createSelectorQuery()
      query.select('#fixed').boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(res => {
        // res[0].top       // #the-id节点的上边界坐标
        // res[1].scrollTop // 显示区域的竖直滚动位置
        console.log(res);
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
    /*display: flex;*/
    span:first-child {
      margin-right: 50rpx;
    }
  }
  &-attrs {
    display: flex;
    flex-wrap: wrap;

    &__item {
      width: 50%;
      font-size: 30rpx;
      color: #999;
    }
  }
  &-fixed {
    position: fixed;
    top: 0;
    left: 0;
  }

  .rich-text {
    color: #222;
    font-size: 28rpx;
    line-height: 50rpx;
  }
}
</style>
