<template>
  <div class="detail">
    <swiper class="swiper">
      <swiper-item v-for="(item, i) in detail.imgs" :key="i">
        <div class="swiper-item">
          <img :src="item" alt="">
        </div>
      </swiper-item>
    </swiper>
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
      detail: {}
    }
  },
  methods: {
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
    height: 100%;
  }
}
</style>
