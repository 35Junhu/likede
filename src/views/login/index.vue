<template>
  <div class="login">
    <div class="loginForm">
      <!-- 登录的logo -->
      <img src="@/assets/common/logo.png" alt="" class="loginLogo">
      <!-- 登录的表单结构 -->
      <el-form ref="Login" :model="loginForm" :rules="rules">
        <!-- 用户名 -->
        <el-form-item prop="mobile">
          <span class="svg-container  el-icon-mobile-phone" />
          <el-input v-model="loginForm.mobile" placeholder="请输入账号" />
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <span class="svg-container  el-icon-lock" />
          <el-input ref="pwd" v-model="loginForm.password" placeholder="请输入密码" :type="passwordType" />
          <span class="eye">
            <svg-icon :icon-class="passwordType === 'password'?'eye':'eye-open'" @click="showPwd" />
          </span>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <span class="svg-container  el-icon-coffee" />
          <el-input v-model="loginForm.code" placeholder="请输入验证码" />
          <el-image
            class="yan"
            :src="img1"
            @click="code"
          />
        </el-form-item>
        <!-- 登录按钮 -->
        <el-button class="btn" :loading="loading" @click="login">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import { codeAPI } from '@/api/index'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('user')
export default {
  data() {
    return {
      img1: '',
      codeToken: '',
      loading: false,
      loginForm: {
        mobile: 'admin',
        password: 'admin',
        code: ''
      },
      passwordType: 'password',
      rules: {
        mobile: [
          {
            required: true,
            message: '账号不能为空',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          },
          {
            min: 5, max: 15,
            message: '密码格式不正确',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '请填写验证码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.code()
  },
  methods: {
    // vuex 中使用
    ...mapActions(['loginAction']),
    showPwd() {
      this.passwordType === 'password' ? this.passwordType = '' : this.passwordType = 'password'
      // 点完眼睛后会自动聚焦
      this.$nextTick(() => {
        this.$refs.pwd.focus()
      })
    },
    // 发送验证码请求
    async  code() {
      const str = uuidv4()
      const clientToken = str.toString().replace(/-/g, '')
      // console.log(clientToken)
      this.codeToken = clientToken
      const { data } = await codeAPI(clientToken)
      this.img1 = window.URL.createObjectURL(data)
      // console.log(this.img1)
    },
    async  login() {
      try {
        // await this.$refs.Login.validate()
        this.loading = true
        // await this.$store.dispatch('user/loginAction', {
        //   loginName: this.loginForm.mobile,
        //   password: this.loginForm.password,
        //   code: this.loginForm.code,
        //   clientToken: this.codeToken,
        //   loginType: 0
        // })
        await this.loginAction({
          loginName: this.loginForm.mobile,
          password: this.loginForm.password,
          code: this.loginForm.code,
          clientToken: this.codeToken,
          loginType: 0
        })
      // console.log(data)
      // console.log('111')
      } finally {
        this.loading = false
      }
    }
  }

}
</script>

<style scoped lang="scss">
.login {
  background-image: url('~@/assets/common/background.png');
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;

  .loginForm {
    position: absolute;
    width: 518px;
    height: 388px;
    top: 50%;
    left: 50%;
    margin-top: -194px;
    margin-left: -259px;
    padding: 76px 35px 0;
    background: #fff;
    -webkit-box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    border-radius: 10px;

    .loginLogo {
      position: absolute;
      width: 96px;
      height: 96px;
      top: -46px;
      left: 50%;
      margin-left: -48px;
    }

    .btn {
      color: #fff;
    }

    ::v-deep .el-form-item__content {
      display: flex;
      align-items: center;
      width: 100%;
      height: 52px;
      background: #fff;
      border: 1px solid #e2e2e2;
      border-radius: 4px;

      .el-input__inner {
        border:none
      }

      .yan {
        display: block;
        width: 45%;
        height: 52px
      }

      .svg-container {
        padding: 6px 5px 6px 15px;
        color: #889aa4;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
      }

      .eye {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: #889aa4;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

    }

    ::v-deep .el-button {
      width: 100%;
      height: 52px;
      background-color: #5c63e5;
      display: inline-block;
    }

  }
}
</style>
