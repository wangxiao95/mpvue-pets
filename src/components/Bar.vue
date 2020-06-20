<template>
  <i-tab-bar i-class="tab-bar" :current="active" :color="color" @change="handleChange" :fixed="true">
    <i-tab-bar-item v-for="bar in bars" i-class="tab-bar__item" :key="bar.key" :icon="bar.icon"
                    :current-icon="bar.currentIcon" :title="bar.title" @click="goPage(bar.link)"></i-tab-bar-item>
  </i-tab-bar>
</template>

<script>
  export default {
    name: "Bar",
    props: {
      active: {
        type: String,
        default: 'home'
      },
      color: {
        type: String,
        default: '#ff7800'
      }
    },
    data() {
      return {
        bars: [
          {
            key: "home",
            title: "首页",
            icon: "homepage",
            currentIcon: "homepage_fill",
            link: "../home/main"
          },
          {
            key: "square",
            title: "广场",
            icon: "systemprompt",
            currentIcon: "systemprompt_fill",
            link: "../square/main"
          },
          {
            key: "mine",
            title: "我的",
            icon: "mine",
            currentIcon: "mine_fill",
            link: "../mine/main"
          }
        ]
      };
    },
    methods: {
      handleChange(e) {
        const key = e.target.key
        const bar = this.bars.filter(item => {
          return item.key === e.target.key
        })
        let url = ''
        if (bar && bar.length) {
          url = bar[0].link
        } else {
          url = `../${key}/main`
        }
        mpvue.navigateTo({
          url,
        })
        this.$emit('change')

      },
      goPage(link) {
        mpvue.navigateTo({
          url: link,
        })
      }
    }
  };
</script>

<style lang="less">
  .tab-bar {
    height: 120rpx !important;
    &__item {
      margin-top: -20rpx;
    }
  }
</style>
