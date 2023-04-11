<template>
  <div class="layout-container">
    <!-- 顶部 -->
    <div class="sidebar-top">
      <div>{{this.nc}}</div>
      <div @click="logout">退出</div>
    </div>
    <!-- 左侧菜单 -->
    <div class="sidebar-cont">
      <el-menu :default-active="activeIndex" router class="el-menu-demo" mode="vertical">
        <div v-for="(item, index) in sidebar" :key="index">
          <el-menu-item :index="item.router" v-if="item.Subclass.length === 0">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
            <!-- v-if="item.tip == 'order' && dingdan > 0" -->
            <span v-if="false" slot="title" class="span-tips" style="margin-left: 2.6875rem">{{ dingdan }}</span>
          </el-menu-item>
        </div>
        <div style="height: 50px"></div>
      </el-menu>
    </div>
    <!-- 音频 -->
    <div class="audio">
      <audio src="https://diancan-1252107261.cos.accelerate.myqcloud.com/mp3/dingdantixing.mp3" ref="audio"></audio>
    </div>
    <!-- 右侧内容 -->
    <router-view></router-view>
  </div>
</template>

<script>
import login from "@/views/login/index.vue";
import {getyhxxApi} from "@/api/log";

export default {
  name: 'Layout',
  methods: {
    login() {
      return login
    },
    // 退出登录
    logout() {
      this.$store.commit('RESET_STATE')
      this.$router.push('/login')
    },
    async lomk(){
      const {data} = await getyhxxApi()
      this.nc=data[0].nc
      console.log(data[0])
    }
  },
  mounted() {
    this.lomk()
  },
  data() {
    return {
      sidebar: [
          {
        title: '首页轮播',
        router: '/rotation',
        tip: 'rotation',
        Subclass: []
      },
        {
          title: '服务管理',
          router: '/page-lo',
          tip: 'page-lo',
          Subclass: []
        },
        {
          title: '服务类目',
          router: '/category',
          tip: 'category',
          Subclass: []
        },
        {
          title: '发布服务',
          router: '/table-number',
          tip: 'table-number',
          Subclass: []
        },
        {
          title: '订单管理',
          router: '/order',
          tip: 'order',
          Subclass: []
        },
        {
          title: '评论管理',
          router: '/comment',
          tip: 'comment',
          Subclass: []
        },
        {
          title: '用户管理',
          router: '/acl',
          tip: 'acl',
          Subclass: []
        },
        {
          title: '角色管理',
          router: '/role',
          tip: 'role',
          Subclass: []
        }

      ],
      nc:''
    }
  },

  computed: {
    activeIndex() {
      const {meta, path} = this.$route
      return meta.activeMenu ? meta.activeMenu : path
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-container {
  position: relative;
  width: 100%;
  min-height: 100vh;

  .sidebar-top {
    width: 100%;
    background: #FFFFFF;
    height: 50px;
    color: #333333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;

    div:nth-child(1) {
      padding-left: 22px;
      font-size: 18px;
    }

    div:nth-child(2) {
      padding-right: 22px;
      cursor: pointer;
    }
  }

  .sidebar-cont {
    position: fixed;
    top: 50px;
    left: 0;
    bottom: 50px;
    background: #8c939d;
    width: 200px;
    height: 100vh;
    color: #000000 !important;
    font-size: 16px;
    overflow-y: auto;
  }

  .el-menu {
    min-height: 100%;
  }

  .el-menu-item {
    font-size: 15px !important;
  }

  .el-submenu__title {
    font-size: 15px !important;
  }

  .span-tips {
    background-color: coral;
    width: 22px !important;
    height: 22px !important;
    border-radius: 50%;
    display: inline-table;
    line-height: 22px;
    text-align: center;
    font-size: 12px;
    color: #ffff;
  }
}
</style>
