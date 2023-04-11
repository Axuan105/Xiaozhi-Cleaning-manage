<template>
  <el-upload
      class="avatar-uploader"
      :headers="{authorization:'Bearer ' + this.$store.state.token}"
      action='http://192.168.43.95:4090/dish/dishs/addlogos'
      :show-file-list="false"
      name="file"
      :on-success="handleAvatarSuccess">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
import {getToken} from "@/utils/auth";

export default {
  name: 'Upload',
  props: ['imageUrl'],
  // data() {
  //   return {
  //     imageUrl: ''
  //   };
  // },
  mounted() {
  },
  methods: {
    handleAvatarSuccess(res, file) {
      const url = res.data
      this.imageUrl=url
      this.$emit('imgs', url)
    },

  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>