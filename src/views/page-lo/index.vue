<template>
  <!--  服务管理-->
  <div class="ordering">
    <div class="lok">
      <el-table
          :data="tableData"
          stripe
          border
          header-align="center"
      >
        <el-table-column
            prop="h1"
            label="服务名称"
            header-align="center"
            align="center">
        </el-table-column>
        <el-table-column
            prop="h4"
            label="介绍"
            header-align="center"
            align="center">
        </el-table-column>
        <el-table-column
            prop="category"
            label="类目"
            header-align="center"
            align="center"
            width="80px"
        >
        </el-table-column>
        <el-table-column
            prop="jg"
            label="价格"
            header-align="center"
            align="center"
            width="80px"
        >
        </el-table-column>
        <el-table-column
            prop="img"
            label="图片"
            width="200"
            header-align="center">
          <template v-slot="{row}">
            <el-image
                style="width:100%; height: 180px"
                :src="row.img"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
            label="查看规格"
            header-align="center"
            align="center"
        >
          <template v-slot="{row}">
            <el-button size="mini" type="info" @click="guan(row.cid)"> 规格</el-button>
          </template>
        </el-table-column>
        <el-table-column
            prop="value"
            label="操作"
            header-align="center"
            align="center"
            width="100px"
        >
          <template v-slot="{row}">
            <el-button v-show="row.onsale==1" style="margin-bottom: 10px" type="success" @click="sj(row.id)">上架
            </el-button>
            <el-button v-show="row.onsale==0" style="margin-bottom: 10px" type="danger" @click="xj(row.id)">下架
            </el-button>
            <el-button v-show="row.oonsale==2" style="background-color: purple" type="danger" @click="tj(row.id)">热门
            </el-button>
            <el-button v-show="row.oonsale==3" type="success" @click="rm(row.id)">推荐</el-button>
          </template>
        </el-table-column>
        <el-table-column
            prop="rank"
            label="排序"
            sortable
            header-align="center"
            align="center"
            width="80px"
        >
        </el-table-column>
        <el-table-column label="操作" header-align="center" align="center" width="200px"
        >
          <template v-slot="{row}">
            <el-button style="margin: 10px" v-show="row.ooosale===1" size="mini" type="info" @click="lope(row.id)"> 详情
            </el-button>
            <el-button style="margin: 10px" size="mini" v-show="row.ooosale===0" type="success" @click="tjxq(row.id)">
              添加详情
            </el-button>
            <el-button
                style="margin: 10px"
                size="mini"
                type="primary"
                @click="handleEdit(row)">编辑
            </el-button>
            <el-button
                style="margin: 10px"
                size="mini"
                type="danger"
                @click="handleDelete(row.id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
    <el-drawer
        :visible.sync="drawer"
        :with-header="false">
      <template>
        <!--        @lohkom="lokm"-->
        <drawlo :llokun="this.cid" ref="lokm"></drawlo>
      </template>
    </el-drawer>
    <el-drawer
        :visible.sync="lohg"
        :with-header="false"
        size="35%"
    >
      <template>
        <tjxq :lokun="this.cid" @fatherMethod="fatherMethod"></tjxq>
      </template>
    </el-drawer>
    <el-dialog :visible.sync="spec">
      <template>
        <specifications :guang="this.cid"></specifications>
      </template>
    </el-dialog>
  </div>

</template>

<script>
import {Message} from "element-ui";
import {AdminApi, deinApi, sjxjApi, tjrmApi} from "@/api/Administration";
import router from "@/router";
import drawlo from "@/components/Drawlo/index.vue";
import Tjxq from "@/components/Tjxq/index.vue";
import {xqApi} from "@/api/details";
import Specifications from "@/components/speci-fications/index.vue";

export default {
  name: 'page-lo',
  components: {Specifications, drawlo, Tjxq},
  data() {
    return {
      drawer: false,
      lohg: false,
      spec: false,
      direction: 'rtl',
      tableData: [],
      cid: 0,
      // 分页
      pageable: {
        pageSize: 5,
        total: 15,
        page: 1
      },
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 编辑
    handleEdit(row) {
      router.push({name: 'table-number', query: row})
    },
    //  删除
    async handleDelete(id) {
      await deinApi(id)
      this.pageable.page=1
      this.init()
    },
    // 页码
    pageChange(page) {
      this.pageable.page = page
      this.init()
    },
    // 获取
    async init() {
      const {data} = await AdminApi({page: this.pageable.page, pageSize: this.pageable.pageSize})
      this.tableData = data.list
      this.pageable = {
        page: data.page,
        total: data.total,
        pageSize: data.pageSize
      }
    },
    // 关闭抽屉
    fatherMethod() {
      this.lohg = false
      console.log(1)
      this.init()
    },
    // 抽屉
    lope(w) {
      this.cid = w
      this.drawer = true
    },
    tjxq(w) {
      this.cid = w
      this.lohg = true
    },
    // 上下架
    async sj(l) {
      await sjxjApi({id: l, onsale: 0})
      this.init()
    },
    async xj(l) {
      await sjxjApi({id: l, onsale: 1})
      this.init()
    },
    // 热门推荐
    async tj(l) {
      await tjrmApi({id: l, oonsale: 3})
      this.init()
    },
    async rm(l) {
      await tjrmApi({id: l, oonsale: 2})
      this.init()
    },
    guan(l){
      console.log(l)
      this.cid=l
      this.spec=true
    }
  }
}
</script>
page=lo
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
  text-align: center;
}
</style>
