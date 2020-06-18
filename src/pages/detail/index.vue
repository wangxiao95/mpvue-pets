<template>
  <div class="detail">
    <swiper class="swiper">
      <swiper-item v-for="(item, i) in detail.imgs" :key="i">
        <div class="swiper-item">
          <img mode="aspectFill" :src="item" alt="">
        </div>
      </swiper-item>
    </swiper>

    <i-tabs :current="activeTab" scroll @change="changeActive">
      <i-tab key="tab1" title="选项1"></i-tab>
      <i-tab key="tab2" title="选项2"></i-tab>
      <i-tab key="tab3" title="选项3"></i-tab>
      <i-tab key="tab4" title="选项4"></i-tab>
      <i-tab key="tab5" title="选项5"></i-tab>
      <i-tab key="tab6" title="选项6"></i-tab>
      <i-tab key="tab7" title="选项7"></i-tab>
      <i-tab key="tab8" title="选项8"></i-tab>
      <i-tab key="tab9" title="选项9"></i-tab>
    </i-tabs>
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
      activeTab: 'tab5',
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
  created () {

  },
  onLoad(query) {
    this.getDetail(query.id || 'dog_1')
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
}
</style>
