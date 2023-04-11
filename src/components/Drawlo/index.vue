<template>
  <div>
    <h1 class="hl">详情</h1>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in Data.arrlogo" :key="item">
        <img :src="item">
      </el-carousel-item>
    </el-carousel>
    <h1 class="lo">价格:{{ Data.Price }}</h1>
    <h2>服务名称： {{ Data.h1 }}</h2>
    <h3 class="h3"> 介绍：{{ Data.h6 }}</h3>
    <div>
     <span class="qk">详细情况</span>
      <ul class="infinite-list" style="overflow:auto">
        <li v-for="i in Data.biglogo" class="infinite-list-item">
          <img :src="i">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {xqApi} from "@/api/details";

export default {
  name: "Drawlo",
  props: {
    llokun: Number,
  },
  data() {
    return {
      Data: [],
      id: ''
    }
  }
  ,
  mounted() {
    this.init()
  },
  watch: {
    llokun(newVal, oldVal) {
      if (oldVal != newVal) {
        this.Data=[]
        this.init()
      }

    }

  }
  ,
  methods: {
    async init() {
      console.log(this.llokun)
      const {data} = await xqApi({cid: this.llokun})
      // this.$emit('lohkom',data[0].id)
      console.log(data[0])
      this.Data = data[0]
    }
  }
}
</script>

<style lang="scss" scoped>
.qk{
  display: inline-block;
  margin-left: 20px;
  margin-bottom: 20px;
  color: purple;
  font-size: 15px;
}
.h3{
  margin-left: 20px;
  margin-bottom: 20px;
  color: purple;
  font-size: 16px;
}
h2 {
  margin-left: 20px;
  margin-bottom: 20px;
  color: brown;
  font-size: 20px;
}

.lo {
  margin-left: 20px;
  margin-bottom: 20px;
  color: brown;
  font-size: 20px;
}

.hl {
  text-align: center;
  margin-bottom: 20px;
}

.el-carousel__item img {
  color: #475669;
  font-size: 14px;
  width: 100%;
  height: 100%;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.infinite-list {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>