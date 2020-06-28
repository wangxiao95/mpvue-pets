<template>
  <div class="search-result">
    <div class="search-result__card" v-for="(item, i) in list" :key="i">
      <Card card-type="large" :type="item.type" :item="item"></Card>
    </div>
  </div>
</template>

<script>
  import Card from "../../components/Card"
  import _ from 'lodash'
  import { file } from '../../utils/env'
  import store from '../../store'

  const db = mpvue.cloud.database()

  export default {
    components: {
      Card
    },

    data() {
      return {
        list: [],
      }
    },
    computed: {
      kw() {
        return store.state.searchKw
      }
    },
    watch: {
      kw: {
        immediate: true,
        handler(val) {
          this.list = []
          if (val) {
            this.getData()
          }
        }
      }
    },
    methods: {
      async getData() {
        const dogRes = await db.collection('dog').where({
            name: db.RegExp({
              regexp: this.kw,
              options: 'i',
            })
          }).get()
        const catRes = await db.collection('cat').where({
          name: db.RegExp({
            regexp: this.kw,
            options: 'i',
          })
        }).get()
        const dog = _.map(dogRes.data, item => {
          return _.assign(item, { type: 'dog' })
        })
        const cat = _.map(catRes.data, item => {
          return _.assign(item, { type: 'cat' })
        })
        const list = dog.concat(cat)
        this.list = list
        console.log(this.list)
      }
    },
    mounted() {
    },

    created() {

    },
    onLoad(query) {
      // const { kw } = query
      // console.log(kw)
      // kw && (this.kw = kw)
      // this.getData()
    },
    onShow() {
      // this.list = []
    }
  };
</script>

<style lang="less">
.search-result {
  padding: 10px;
  background: #f2f2f2;
  &__card {
    background: #fff;
    margin-bottom: 10px;
    padding: 8px;
    border-radius: 10px;
    overflow: hidden;
  }
}
</style>
