<template>
  <div class="ordering">
    <el-table
        :data="tableData"
        style="width: 100%"
        stripe
        border
    >
      <el-table-column
          prop="time"
          label="日期"
          show-overflow-tooltip
          :formatter="formatter"
      >
      </el-table-column>
      <el-table-column
          label="评价用户"
          prop="label">
      </el-table-column>
      <el-table-column
          prop="imgs"
          label="logo">
        <template v-slot="{row}">
          <img :src="row.img" style="width: 100px;height: 100px">
        </template>
      </el-table-column>
      <el-table-column
          label="师傅"
          prop="sf"
      >
      </el-table-column>
      <el-table-column
          prop="value"
          label="评价">
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{row}">
          <el-button
              size="mini"
              @click="handleEdit(row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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
import {depjApi, pjApi} from "@/api/comment";

export default {
  name: "comment",
  data() {
    return {
      tableData: [],
      pageable: {
        pageSize: 5,
        total: 15,
        page: 1
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async handleEdit(id) {
      await  depjApi(id)
      this.init()
    },
    pageChange(page) {
      this.pageable.page = page
      this.init()
    },
    // 获取评论
    async init() {
      const {data} = await pjApi({page:this.pageable.page, pageSize: this.pageable.pageSize})
      console.log(data.list)
      this.tableData = data.list
      this.pageable = {
        page: data.page,
        total: data.total,
        pageSize: data.size
      }
    },
    // 时间转换
    formatter(row) {
      const zoneDate = new Date(row.time).toJSON()
      const date = new Date(+new Date(zoneDate) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      return date
    }
  }

}
</script>

<style scoped>

</style>