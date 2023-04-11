<template>
<!--  类目-->
  <div class="ordering">
    <el-button type="primary" @click="Visible = true">添加服务</el-button>
    <div class="lok">
      <el-table
          :data="tableData"
          stripe
          border
      >
        <el-table-column
            prop="label"
            label="服务名称"
            width="280">
        </el-table-column>
        <el-table-column
            prop="img"
            label="商户log"
            width="280">
          <template v-slot="{row}">
            <img :src="row.img" width="50px" height="50px">
          </template>
        </el-table-column>
        <el-table-column
            prop="rank"
            label="排序"
            sortable
            width="180">
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template v-slot="{row}">
            <el-button
                size="mini"
                @click="handleEdit(row)">编辑
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
    <el-dialog
        title="添加服务类目"
        :visible.sync="Visible"
        width="30%"
        center>
      <el-form :modal="form" label-width="80px">
        <el-form-item label="服务项">
          <el-input v-model="form.label"/>
        </el-form-item>
        <el-form-item label="排序">
        <el-input v-model="form.rank"/>
      </el-form-item>
        <el-form-item label="log">
          <Upload @imgs="imgss" :image-url="form.img"></Upload>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="Visible = false">取 消</el-button>
    <el-button type="primary" @click="loko">确 定</el-button>
  </span>
    </el-dialog>
    <el-pagination
        background
        layout="prev, pager, next"
        :hide-on-single-page="true"
        :page-size="pageable.pageSize"
        :total="pageable.total"
        :current-page="pageable.page"
        @current-change="pageChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import {addclssApi, classApi, xglmApi,delmApi} from "@/api/class";
import {Message} from "element-ui";
import Upload from "@/components/Upload/index.vue";

export default {
  name: 'Category',
  components: {Upload},
  data() {
    return {
      tableData: [],
      pageable: {
        pageSize: 5,
        total: 20,
        page: 1
      },
      Visible: false,
      form: {
        label: '',
        img: '',
        rank: ''
      },
      loid: '',
      uid: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    imgss(mg) {
      console.log(mg)
      this.form.img = mg
    },
    handleEdit(row) {
      this.Visible = true
      this.form = {...row}
      console.log(row.id)
      this.loid = row.id
      this.uid = row.uid
    },
   //  删除
   async handleDelete(id) {
     await delmApi(id)
     this.init()
    },
    // 页码
    pageChange(page) {
      this.pageable.page = page
      this.init()
    },
    // 获取
    async init() {
      const {data} = await classApi({page: this.pageable.page, size: this.pageable.pageSize})
      this.tableData = data.list
      this.pageable = {
        page: data.page,
        total: data.total,
        pageSize: data.size
      }
    },
    // 添加
    async loko() {
      if (this.form.name == '' && this.form.value == '') return Message.error('不能为空')
      this.loid ? await xglmApi({id: this.loid, label: this.form.label,img:this.form.img,rank: this.form.rank, uid: this.uid}) : await addclssApi({
        label: this.form.label,
        img: this.form.img,
        rank: this.form.rank
      })
      this.Visible = false
      this.form = {}
      this.init()
    }
  }
}
</script>

<style lang="scss" scoped>
.orderly {
  height: 50px;
  line-height: 50px;
  margin-bottom: 40px;

  .orderly-black {
    width: 200px;
    display: inline-block;
    margin: 0 20px;
  }

  .el-table {
    margin: 0 auto;
  }
}

.lok {
  margin: 0 auto;
}
</style>
