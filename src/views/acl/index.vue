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
      <el-button type="primary" icon="el-icon-search" @click="cxyh">查询</el-button>
    </div>
    <!-- 操作区域 -->
    <div class="opera-view">
      <el-button type="primary" @click="addUser">添加</el-button>
    </div>
    <!-- 表格区域 -->
    <el-table v-loading="isLoading" :data="userList" style="width: 100%" border stripe
              @selection-change="selectUser = $event">
      <el-table-column label="序号" type="index" width="100px" align="center" prop="id"/>
      <el-table-column label="用户名" prop="xm"/>
      <el-table-column label="用户昵称" prop="nc"/>
      <el-table-column
          prop="time"
          label="日期"
          show-overflow-tooltip
          :formatter="formatter"
          header-align="center"
          align="center"
      />
      <el-table-column label="状态" prop="gmtCreate">
        <template v-slot="{row}">
          <el-switch
              v-model="!!row.onsale"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="ztgb(row.id,row.onsale)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template v-slot="{ row }">
          <!-- 文字按钮 -->
          <el-button type="text" @click="showRoleDialog(row)">设置角色</el-button>
          <el-button type="text" @click="xgyh(row)">修改用户</el-button>
          <el-button type="text" @click="scyh(row.id)">删除用户</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分配角色 对话框 -->
    <el-dialog title="设置角色" :visible.sync="roleDialog.dialogVisible">
      <el-form label-width="80px">
        <el-form-item label="用户名">
          <el-input disabled :value="user.xm"/>
        </el-form-item>
        <el-form-item label="角色列表">
          <!-- 控制全选 -->
          <el-checkbox v-model="roleDialog.checkAll" :indeterminate="roleDialog.isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"/>
          <!-- 多选框组 -> 已选中的选项 -->
          <el-checkbox-group v-model="roleDialog.selectRoleList" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="role in roleDialog.allRoleList" :key="role.id" :label="role.id">{{
                role.label
              }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="roleDialog.dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="roleDialog.loading" @click="saveRole">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增用户 | 修改用户 对话框 -->
    <el-dialog :title="user.id ? '修改用户' : '新增用户'" :visible.sync="userDialog">
      <el-form ref="userForm" label-width="80px" :model="user" :rules="userRules">
        <el-form-item label="用户名" prop="xm">
          <el-input v-model="user.xm"/>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nc">
          <el-input v-model="user.nc"/>
        </el-form-item>
        <el-form-item label="用户账号" prop="phone">
          <el-input v-model="user.phone"/>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="user.password" show-password/>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="userDialog = false">取 消</el-button>
        <el-button type="primary" @click="tjyh">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {deyhApi, yxqApi, yhxqApi, cxyhApi, xgyhApi, getjspi, putjspi} from "@/api/hqyhxx";
import {loginApi} from "@/api/log";
import index from "vuex";

export default {
  name: "user",
  data() {
    return {
      // 搜索查询参数
      params: {
        username: ''
      },
      // 加载状态
      isLoading: false,
      // 用户列表
      userList: [],
      // 用户对话框显示状态
      userDialog: false,
      // 用户信息
      user: {
        xm: '',
        nc: '',
        password: '',
        phone: '',
        id: ''
      },
      // 角色对话框
      roleDialog: {
        dialogVisible: false,
        loading: false,
        // 所有角色列表
        allRoleList: [],
        // 已选择角色列表
        selectRoleList: [],
        checkAll: false,
        isIndeterminate: true
      },
      // 用户验证规则
      userRules: {
        xm: [
          {required: true, message: '用户名不能为空'},
        ],
        nc: [
          {required: true, message: '用户名不能为空'},
        ],
        password: [
          {required: true, message: '密码不能为空'},
        ],
        phone: [
          {required: true, message: '账号不能为空'},
        ]
      },
      selectUser: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    //
    async init() {
      const {data} = await yxqApi()
      this.userList = data
      this.lohid = data.id
      console.log(data)
    },
    addUser() {
      this.user = {}
      this.userDialog = true
      this.$nextTick(() => {
        // 清除验证
        this.$refs.userForm.clearValidate()
      })
    },
    //  添加用户
    async tjyh() {
      this.user.id ? await yhxqApi(this.user) : await loginApi(this.user)
      this.$message.success('操作成功')
      this.userDialog = false
      this.user = {}
      this.init()
    },
    // 修改用户
    xgyh(row) {
      this.user = {...row}
      console.log(this.user.id)
      this.userDialog = true
    },
    // 删除
    async scyh(id) {
      await deyhApi(id)
      this.init()
    },
    // 查询
    async cxyh() {
      const {data} = await cxyhApi({xm: this.params.username})
      this.userList = data
    },
    // 设置状态
    async ztgb(e, l) {
      await xgyhApi({id: e, onsale: l ? 0 : 1})
      this.init()
    },
    // 设置角色
   async showRoleDialog(row) {
      this.user = row
     const {data}=await getjspi({id: row.id})
     // 保存角色列表
     this.roleDialog.allRoleList = data.roleList2
     this.roleDialog.selectRoleList = data.data[0].roleList.map(item => item.id)
     console.log( this.roleDialog.allRoleList, this.roleDialog.selectRoleList)
      this.roleDialog.dialogVisible = true
    },
    // 全选|反选操作
    handleCheckAllChange(val) {
      const { allRoleList } = this.roleDialog
      // true -> 全选   false -> 全不选
      this.roleDialog.selectRoleList = val ? allRoleList.map(item => item.id) : []
      console.log(this.roleDialog.selectRoleList)
      this.roleDialog.isIndeterminate = false
    },
    // 选中操作
    handleCheckedCitiesChange(value) {
      console.log(value)
      const checkedCount = value.length
      // 当选中数量 等于 所有数量 ->  全选
      this.roleDialog.checkAll = checkedCount === this.roleDialog.allRoleList.length
      // 选中数量 > 0 并且 小于所有数量 -> 半选
      this.roleDialog.isIndeterminate = checkedCount > 0 && checkedCount < this.roleDialog.allRoleList.length
    },
    // 保存角色分配
    async saveRole() {
      this.roleDialog.loading = true
      const ids = this.roleDialog.selectRoleList.join(',')
      try {
        await putjspi({id:this.user.id, ids})
        this.$message.success('保存成功')
        this.roleDialog.dialogVisible = false
        this.roleDialog.loading = false
        this.init()
      } catch (error) {
        console.log(error)
        this.roleDialog.loading = false
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

<style scoped>
.search-input {
  width: 200px;
  margin-right: 10px;
}

.opera-view {
  margin: 5px 0;
}
</style>