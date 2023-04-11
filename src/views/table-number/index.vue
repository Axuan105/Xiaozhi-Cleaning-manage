<template>
<!--  发布服务-->
  <div class="ordering">
    <div class="lokj">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="服务名称" prop="bigh">
          <el-input v-model="form.h1"></el-input>
        </el-form-item>
        <el-form-item label="介绍" prop="xh">
          <el-input v-model="form.h4"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="jg">
          <el-input v-model="form.jg"></el-input>
        </el-form-item>
        <el-form-item label="选择类目" prop="category">
          <el-select v-model="form.category" placeholder="请选择" @change="lo" @visible-change="mkl">
            <el-option
                v-for="item in options "
                :key="item.id"
                :label="item.label"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="cid" prop="cid">
          <el-input v-model="form.cid"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="onsale">
          <el-radio v-model="form.onsale" :label="1">上</el-radio>
          <el-radio v-model="form.onsale" :label="0">下</el-radio>
        </el-form-item>
        <el-form-item label="排序" prop="rank">
          <el-input  v-model="form.rank"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <Upload :image-url="form.img" @imgs="imgss"></Upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="logioh">保存</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import Upload from "@/components/Upload/index.vue";
import {addinApi, classApi, sjxjApi, xginApi} from "@/api/Administration";
import router from "@/router";
import {Message} from "element-ui";

export default {
  name: 'TableNumber',
  components: {Upload},
  data() {
    return {
      form: {
        h1: '',
        h4: '',
        category: '',
        jg: '',
        onsale: '1',
        rank: '',
        img: '',
        cid: '5'
      },
      options: [],
      rules: {
        h1: [{required: true, message: '请输入服务名称', trigger: 'blur'}],
        h4: [{required: true, message: '请输入服务名称', trigger: 'blur'}],
        jg: [{required: true, message: '请输入服务名称', trigger: 'blur'}],
        rank: [{required: true, message: '请输入服务名称', trigger: 'blur'}]
      }
    }
  },
  mounted() {
    console.log(this.$route.query)
    this.form = {...this.$route.query, onsale: parseInt(this.$route.query.onsale)}
  },
  methods: {
    imgss(mg) {
      this.form.img = mg
    },
    // 获取类目
    async mkl(e) {
      if (e == false) return
      const {data} = await classApi()
      this.options = data
    },
    lo(e) {
      this.form.cid = e
      const data = this.options.filter(item => item.id === e)
      this.form.category = data[0].label

    }
    ,
    async logioh() {
      console.log(this.form)
      // if (this.form!= {}) return Message.error('不能为空')
      this.$route.query.id ? await xginApi(this.form) : await addinApi(this.form)
      if (!this.$route.query.id){
        await sjxjApi({cid:this.$route.query.cid,onsale:this.form.onsale})
        console.log(1)
      }
      Message.success('添加成功')
      this.form = {}
      await router.push('/page-lo')
      console.log(1)
    }
  }
}
</script>

<style lang="scss" scoped>
.lokj {
  width: 400px;
  margin: 0 auto;
}

</style>
