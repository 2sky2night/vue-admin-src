<template>
  <!--登录注册页面-->
  <div class="login-page">
    <div class="login-infor">
      <h2>XXX后台管理系统</h2>
      <img src="../../assets/year2022.4983644a.svg">
    </div>

    <div class="login-form">
      <h1>登陆</h1>
      <el-form :model="user" label-position="top">
        <el-form-item label="用户名">
          <el-input v-model="user.usename" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="user.password" placeholder="请输入密码" />
        </el-form-item>
        <div class="code-box el-form-item">
          <div class="el-form-item__label">验证码</div>
          <el-button :type="isCheck ? 'success' : 'primary'" @click="toCheckRobot" :disabled="isCheck">{{
            isCheck ? '验证通过' : '点我验证' }}</el-button>
        </div>
        <el-form-item>
          <el-button type="primary" @click="toLogin" :disabled="!isCheck" style="width:100%">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang='ts' setup>
import useUserStore from '@/store/user/user';
import { reactive, ref } from 'vue'
import vcode from '@/renderElement/Vcode'
import { ElMessage } from 'element-plus'
import { login } from '@/api/login'
import { useRouter } from 'vue-router'
// 获取用户钩子
const userStore = useUserStore()

// 是否验证通过?
const isCheck = ref<boolean>(false)

// 路由实例对象
const $router = useRouter()

// 用户信息
const user = reactive<{ usename: string, password: string }>({
  usename: '',
  password: ''
})

// 验证用户信息
async function toCheckRobot() {
  try {
    await vcode()
    isCheck.value = true
    ElMessage.success("验证成功")
  } catch {
    ElMessage.error("验证失败")
  }
}

// 登陆
async function toLogin() {
  if (!user.usename || !user.password) {
    ElMessage.error("登录失败,请输入有效字段!")
    return
  }
  try {
    const res = await login(user.usename, user.password)
    userStore.setToken(res.data.token)
    localStorage.setItem("token", res.data.token)
    $router.push('/dashboard')
    console.log($router.getRoutes());
    
  } catch (error) {
    ElMessage.error("登录失败,请稍后再试!")
  }
}

</script>
<style scoped>
/**登陆页码左侧的图片等系统信息 */
.login-infor {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  position: absolute;
  height: 500px;
  width: 500px;
}

.login-infor img {
  margin-top: 30px;
  height: 100%;
  width: 100%;
}

.login-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #2c4a68;
  height: 100vh;
  box-sizing: border-box;
  padding: 0 60px;
  overflow: hidden;
  position: relative;
}

.login-form {
  background-color: var(--el-bg-color);
  height: 350px;
  width: 480px;
  align-self: flex-end;
  border-radius: 10px;
  padding: 20px 30px;
  box-sizing: border-box;
}

@media screen and (max-width:1100px) {
  .login-form {
    align-self: center;
  }

  .login-infor {
    display: none;
  }
}

.code-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.code-box .el-form-item__label {
  margin: 0 !important;
  padding: 0;
}
</style>