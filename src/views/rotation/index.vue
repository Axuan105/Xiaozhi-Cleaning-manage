<template>
<!--  图片-->
  <div class="ordering">
    <el-button type="primary" round @click="ible" class="polo">添加图片</el-button>
    <div class="lok">
      <el-table
          :data="tableData"
          stripe
          border
      >
        <el-table-column
            prop="logos"
            label="图片"
            width="500"
        >
          <template v-slot="{row}">
            <el-image
                style="width:480px; height: 200px"
                :src="row.logos"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px" header-align="center">
          <template v-slot="{row}">
            <el-button
                size="mini"
                @click="modify(row)">编辑
            </el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(row.id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--    对话框-->
    <el-dialog
        title="添加图片"
        :visible.sync="Visible"
        width="30%"
        center>
      <Upload @imgs="imgss" :image-url="img"></Upload>
      <span slot="footer" class="dialog-footer">
    <el-button @click="Visible = false">取 消</el-button>
    <el-button type="primary" @click="tjtp()">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
import {addingApi, getingApi, ingApi, modifyingApi} from "@/api/img";
import Upload from "@/components/Upload/index.vue";

export default {
  name: 'Settings',
  components: {Upload},
  data() {
    return {
      Visible: false,
      tableData: [],
      img: '',
      id: ''
    };
  },
  mounted() {
    this.inglog()
  },
  methods: {
    imgss(mg) {
      this.img = mg
    },
    // 添加图片
    async tjtp() {
      this.id ? await modifyingApi({id: this.id, logos: this.img}) : await addingApi({logos: this.img})
      this.Visible = false
      this.inglog()
    },
    // 初始化数据
    async inglog() {
      const {data} = await ingApi()
      this.tableData = data
      // console.log(this.tableData)
    },
    // 删除
    async handleDelete(id) {
      await getingApi(id)
      this.inglog()
    },
    ible() {
      this.Visible = true
      this.img = ''
    },
    //   修改
    modify(mod) {
      this.id = mod.id
      this.img = mod.logos
      this.Visible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.set-image {
  width: 240px;
  height: 240px;
  border-radius: 5px;
}

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

.polo {
  margin-bottom: 30px;
}

.lok {
  width: 700px;
  margin: 0 auto;
  text-align: center;
}
</style>
