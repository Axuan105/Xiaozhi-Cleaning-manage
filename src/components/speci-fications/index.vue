<template>
  <div>
    <el-button type="primary" style="margin:20px" @click="tjgg">添加规格</el-button>
    <el-table :data="tableData" stripe border>
      <el-table-column label="规格名称" prop="label" header-align="center" align="center"></el-table-column>
      <el-table-column label="规格图片" header-align="center" align="center" v-if="">
        <template v-slot="{row}">
          <img :src="row.img" >
        </template>
      </el-table-column>
      <el-table-column label="规格价格" width="100px" prop="peice" header-align="center" align="center"  ></el-table-column>
      <el-table-column label="操作" header-align="center">
        <template v-slot="{row}">
          <el-button @click="xggg(row)">编辑</el-button>
          <el-button @click="scgg(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        :visible.sync="spec"
        width="30%"
        :modal-append-to-body="false"
    >
      <el-form :modal="form" label-width="80px">
        <el-form-item label="规格名称">
          <el-input v-model="form.label"/>
        </el-form-item>
        <el-form-item label="规格价格">
          <el-input v-model="form.peice"/>
        </el-form-item>
        <el-form-item label="log">
          <Upload @imgs="imgss" :image-url="form.img"></Upload>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="spec = false">取 消</el-button>
    <el-button type="primary" @click="loko">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import {addgauApi, degauApi, gauApi, xggauApi} from "@/api/gauge";
import {Message} from "element-ui";
import Upload from "@/components/Upload/index.vue";

export default {
  name: 'specifications',
  components: {Upload},
  props: {
    guang: Number
  },
  data() {
    return {
      tableData: [],
      spec: false,
      form: {
        label: '',
        img: '',
        peice: '',
        cid:'',
        id:''
      },
      lokid:''
    }
  },
  watch: {
    guang(newVal, oldVal) {
      if (oldVal != newVal) {
        this.tableData=[]
        this.init()
      }

    }

  },
  mounted() {
    console.log(this.guang)
    this.init()
  },
  methods: {
    // 图片
    imgss(mg) {
      console.log(mg)
      this.form.img = mg
    },
    // 获取规格列表
    async init() {
      const {data} = await gauApi({cid: this.guang})
      this.tableData = data
    },
    //  添加
    tjgg() {
      this.spec = true
      this.form={}
    },
    xggg(row) {
      this.form={...row}
      this.spec = true
      this.lokid=row.id
    },
    // 添加规格
    async loko() {
      this.form.cid=this.guang
   this.lokid ? await xggauApi(this.form) : await addgauApi(this.form)
      this.spec = false
      this.init()
    },
  // 删除
   async scgg(id){
     await degauApi(id)
     this.init()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
