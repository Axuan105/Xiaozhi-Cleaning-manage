<template>
  <el-form :model="form" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item>
      <el-upload
          :headers="{authorization:'Bearer ' + this.$store.state.token}"
          action="http://192.168.43.95:4090/dish/dishs/addlogos"
          list-type="picture-card"
          name="file"
          :limit="limit"
          :class="{hide: hideUpload}"
          :on-preview="handlePictureCardPreview"
          :on-success="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogUrl" alt="">
      </el-dialog>
    </el-form-item>
    <el-form-item label="价格" prop="Price">
      <el-input v-model="form.Price"></el-input>
    </el-form-item>
    <el-form-item label="服务名称" prop="h1">
      <el-input v-model="form.h1"></el-input>
    </el-form-item>
    <el-form-item label="详情" prop="h6">
      <el-input v-model.number="form.h6"></el-input>
    </el-form-item>
    <el-form-item>
      <el-upload
          :headers="{authorization:'Bearer ' + this.$store.state.token}"
          action="http://192.168.43.95:4090/dish/dishs/addlogos"
          list-type="picture-card"
          name="file"
          :class="{hide: hddeUpload}"
          :limit="limit"
          :on-preview="handlePictureCardPreview"
          :on-success="Remove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogUrl" alt="">
      </el-dialog>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    </el-form-item>
  </el-form>

</template>

<script>

import {addxqApi} from "@/api/details";

export default {
  name: "index",
  props: {
    lokun: Number,
  },
  data() {
    return {
      dialogUrl: '',
      dialogVisible: false,
      Lid: '',
      limit: 4,
      form: {
        Price: '',
        h1: '',
        h6: '',
        arrlogo: [],
        cid: '',
        biglogo: [],
      },
      rules: {
        Price: [
          {required: true, message: '请输入价格', trigger: 'blur'},
        ],
        h1: [
          {required: true, message: '请输入价格', trigger: 'blur'},
        ],
        h6: [
          {required: true, message: '请输入价格', trigger: 'blur'},
        ],
      }
    }

  },
  computed: {
    hideUpload() {
      return this.form.arrlogo.length >= this.limit;
    },
    hddeUpload() {
      return this.form.biglogo.length >= this.limit;
    },
  },
  mounted() {
    this.Lid = this.lokun
  },
  watch: {
    lokun(newVal, oldVal) {
      if (oldVal != newVal) {
        this.form= {}
        this.init()
      }
    }

  }
  ,
  methods: {
    Remove(file, fileList) {
      this.dialogUrl = file.data
      this.form.biglogo.push(this.dialogUrl + '!h!j')
    },
    handleRemove(file, fileList) {
      this.dialogUrl = file.data
      this.form.arrlogo.push(this.dialogUrl + '!h!j')
    },

    handlePictureCardPreview(file) {
      this.dialogUrl = file.url;
      this.dialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.cid = this.Lid
          if (this.form.arrlogo.length == 0 || this.form.arrlogo.length == 0) return this.$message.error('图片不能为空')
          addxqApi(this.form)
          this.$message.success('添加成功')
          this.form = {}
          this.$emit('fatherMethod')
          console.log(this.form.arrlogo, this.form.biglogo)
        } else {
          this.$message.error('数据不能为空')
          return false;
        }
      });
      console.log(this.form, this.dialogUrl)
    },
  }
}
</script>

<style scoped>
.hide /deep/ .el-upload--picture-card {
  display: none
}

.display .el-upload--picture-card {
  width: 150px;
  height: 150px;
}

</style>