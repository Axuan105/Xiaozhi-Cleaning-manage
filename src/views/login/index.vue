<template>
  <div id="backcont">
    <!-- logo -->
    <div class="meituan-content">
      <div class="login-cont">
        <div class="meituan-title">小智到家管理端</div>
        <div class="meituan-user">
          <p>账号</p>
          <el-input v-model="phone" class="inptflex" placeholder="请输入账号"></el-input>
        </div>
        <div class="meituan-user">
          <p>密码</p>
          <el-input v-model="password" class="inptflex" placeholder="请输入密码" show-password></el-input>
        </div>
        <!-- 登录或注册 -->
        <el-button type="success" class="meituan-btn" @click="login({ phone, password })">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {loginApi} from '@/api/log'
import {mapActions} from "vuex";
import {yxqApi} from "@/api/hqyhxx";

export default {
  data() {
    return {
      load: false,
      // 19876543216
      phone: '13245459876',
      password: '123456'
    }
  },
  methods: {
    login() {
      return login
    },
    ...mapActions(['login']),
  }
}
</script>

<style scoped="scoped">
#backcont {
  background-image: url('@/assets/background.jpg');
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
}

.meituan-content {
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translate(0%, -50%);
}

.login-cont {
  width: 500px;
  height: 300px;
  background-image: url('@/assets/login_form.png');
  border-radius: 5px;
  background-size: 100% 100%;
  color: #fff;
}

.meituan-title {
  text-align: center;
  color: #fff;
  font-size: 30px;
  padding-top: 30px;
  font-family: Arial, Helvetica, sans-serif;
}

.meituan-user {
  width: 400px;
  margin: 0 auto;
  padding-top: 30px;
  height: 40px;
  display: flex;
  align-items: center;
}

.meituan-user p {
  width: 50px;
  color: #ffffff;
  font-size: 16px;
}

.inptflex {
  flex: 1;
}

.reg-view {
  width: 400px;
  display: flex;
  justify-content: flex-end;
  margin: 0 auto;
  padding-top: 10px;
  cursor: pointer;
}

.meituan-btn {
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto 0 auto;
  font-size: 16px;
}
</style>
