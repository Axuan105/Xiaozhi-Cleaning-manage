<template>
  <!--  订单-->
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
          header-align="center"
          align="center"
      >
      </el-table-column>
      <el-table-column
          label="订单信息"
          prop="label">
      </el-table-column>
      <el-table-column
          prop="img"
          label="logo">
        <template v-slot="{row}">
          <img :src="row.img" style="width: 100px;height: 100px">
        </template>
      </el-table-column>
      <el-table-column
          label="订单价格"
          prop="peice"
          header-align="center"
          align="center"
          width="80px"
      >
      </el-table-column>
      <el-table-column
          prop="address"
          label="订单地址">
      </el-table-column>
      <el-table-column label="状态">
        <template v-slot="{row}">
          <el-button
              size="mini"
              v-show="row.onsale==1"
              style="background-color: purple;color: #FFFFFF"
              :disabled="row.onsale==1"

          >待支付
          </el-button>
          <el-button
              size="mini"
              v-show="row.onsale==2"
              style="background-color: purple;color: #FFFFFF"
              @click="dzf(row)"
          >支付完成
          </el-button>
          <el-button
              size="mini"
              type="danger"
              v-show="row.onsale==3"
              style="background-color: #ff2aa7;color: #FFFFFF"
              @click="dzf(row)">待派单
          </el-button>
          <el-button
              size="mini"
              type="danger"
              v-show="row.onsale==4"
              style="background-color: #2bffae;color: #FFFFFF"
              @click="dzf(row)">已接单
          </el-button>
          <el-button
              size="mini"
              type="danger"
              v-show="row.onsale==5"
              style="background-color: #2bffae;color: #FFFFFF"
              @click="dzf(row)">服务完成
          </el-button>
          <el-button
              size="mini"
              type="danger"
              v-show="row.onsale==7"
              style="background-color: #2bffae;color: #FFFFFF">取消订单
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{row}">
          <el-button
              size="mini"
              @click="handleEdit(row.id)"
              :disabled="row.onsale==1 || row.onsale==2 || row.onsale==3 || row.onsale==4 "
          >删除
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

import {ordinApi, orinApi, orxgApi} from "@/api/order";

export default {
  name: 'Order',
  data() {
    return {
      tableData: [],
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
    // 删除
    async handleEdit(id) {
      await ordinApi(id)
      this.init()
    },
    // 分页
    pageChange(page) {
      this.pageable.page = page
      this.init()
    },
    // 获取订单列表
    async init() {
      const {data} = await orinApi({page: this.pageable.page, pageSize: this.pageable.pageSize})
      console.log(data.list)
      this.tableData = data.list
      this.pageable = {
        page: data.page,
        total: data.total,
        pageSize: data.pageSize
      }
    },

    // 修改状态
    async dzf(w) {
      console.log(w)
      if (w.onsale == 2) {
        await orxgApi({id: w.id, onsale: 3})
        this.init()
      }
      if (w.onsale == 3) {
        await orxgApi({id: w.id, onsale: 4})
        this.init()
      }
      if (w.onsale == 4) {
        await orxgApi({id: w.id, onsale: 5})
        return this.init()
      }
    },
    formatter(row) {
      const zoneDate = new Date(row.time).toJSON()
      const date = new Date(+new Date(zoneDate) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      return date
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
