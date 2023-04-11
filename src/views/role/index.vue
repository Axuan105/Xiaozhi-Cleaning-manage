<template>
  <div class="ordering">
    <!-- 搜索区域 -->
    <div class="search-view">
      <el-input
          v-model="params.username"
          class="search-input"
          placeholder="请输入用户名搜索"
          clearable
      />
      <el-button type="primary" icon="el-icon-search">查询</el-button>
    </div>
    <!-- 操作区域 -->
    <div class="opera-view">
      <!-- 按钮级权限： 无权限按钮隐藏  有权限按钮显示 -->
      <el-button type="primary" @click="userDialog = true">添加</el-button>
    </div>
    <!-- 表格区域 -->
    <el-table :data="tableData" style="width: 100%" border stripe>
      <!-- 展开项 -->
      <el-table-column type="expand">
      </el-table-column>
      <el-table-column label="序号" type="index" width="50px" align="center"/>
      <el-table-column label="角色名称" prop="label"/>
      <el-table-column label="角色备注" prop="bz"/>
      <el-table-column label="创建时间" :formatter="formatter" prop="time"/>
      <el-table-column label="更新时间" :formatter="formatter" prop="times"/>
      <el-table-column label="操作" width="250">
        <template v-slot="{ row }">
          <!-- 文字按钮 -->
          <el-button type="text" @click="showRightsDialog(row)">分配权限</el-button>
          <el-button type="text" @click="xgjs(row)">修改角色</el-button>
          <el-button type="text" @click="scjs(row.id)">删除角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增用户 | 修改用户 对话框 -->
    <el-dialog :title="user.id ? '修改用户' : '新增用户'" :visible.sync="userDialog">
      <el-form ref="userForm" label-width="80px" :model="user" :rules="userRules">
        <el-form-item label="角色名" prop="xm">
          <el-input v-model="user.label"/>
        </el-form-item>
        <el-form-item label="角色备注" prop="nc">
          <el-input v-model="user.bz"/>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="userDialog = false">取 消</el-button>
        <el-button type="primary" @click="tj">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配权限 对话框 -->
    <el-dialog :title="'分配权限 ' + role.label" :visible.sync="rightsDialogVisible">
      <!-- 树状结构 -->
      <!-- data 渲染数据  props 渲染字段配置 show-checkbox 显示多选框  default-expand-all 默认展开所有-->
      <div class="tree-view">
        <el-tree
            ref="tree"
            :data="rightsList"
            :props="props"
            node-key="id"
            show-checkbox
            default-expand-all
        />
      </div>
      <div slot="footer">
        <el-button>取 消</el-button>
        <el-button :disabled="rightsDialogLoading" :loading="rightsLoading" type="primary">确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {jsApi, jsxqApi, tjjsApi, dejsApi, cxjsApi, cxjsApi2, cxjsApi3} from "@/api/role";
import {deyhApi} from "@/api/hqyhxx";
import {itoc} from "core-js/internals/base64-map";

export default {
  name: "role",
  data() {
    return {
      tableData: [],
      params: {
        username: ''
      },
      // 分配权限对话框 是否显示
      rightsDialogVisible: false,
      // 操作的角色
      role: {},
      props:{

      },
      user: {
        label: '',
        bz: '',
        id: ''
      },
      // 所有权限列表
      rightsList: [],
      rightsLoading: false,
      rightsDialogLoading: false,
      userDialog: false,
      userRules: {
        label: [
          {required: true, message: '角色名不能为空'},
        ],
        bz: [
          {required: true, message: '备注名不能为空'},
        ]
      },
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const {data} = await jsApi()
      this.tableData = data
    },
    //  添加
    async tj() {
      this.user.id ? await jsxqApi(this.user) : await tjjsApi(this.user)
      this.user = {}
      this.userDialog = false
      this.init()
    },
    // 修改
    xgjs(row) {
      this.user = {...row}
      this.userDialog = true
    },
    // 删除
    async scjs(id) {
      await dejsApi(id)
      this.init()
    },
    formatter(row) {
      const zoneDate = new Date(row.time).toJSON()
      const date = new Date(+new Date(zoneDate) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      return date
    },
    async showRightsDialog(row) {
      this.role = {...row}
      this.rightsDialogVisible = true
      this.rightsDialogLoading = true
      // 查询当前角色的权限列表
      const res = await cxjsApi({id: row.id})

        res.data.forEach(item=>{
          console.log(item)
        })
      console.log(res.data)
      // this.rightsList = res.data.children
    },
  }
}
</script>

<style scoped>
.search-input {
  width: 200px;
  margin-right: 10px;
}

.opera-view {
  margin: 20px 0;
}

.tree-view {
  height: 400px;
  overflow-y: auto;
}

.el-tag {
  margin: 8px;
}

.flex-center {
  display: flex;
  align-items: center;
}

.bottom-border {
  border-bottom: 1px solid #eee;
}

.top-border {
  border-top: 1px solid #eee;
}

.row-view {
  min-height: 100px;
}
</style>