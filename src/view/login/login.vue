<template>
  <div class="login">
    <div class="main">
      <div class="panel">
        <div v-if="is_register">
          <Row style="padding: 6vh 0 0 0;">
            <Col type="flex" align="middle"><b style="font-size: 4vh">注册</b></Col>
          </Row>
          <Row style="margin: 10vh 0 0 0; font-size: 3vh">
            <Col span="3" offset="3">昵称</Col>
            <Col span="14"><input type="text" v-model="user.name" /></Col>
          </Row>
          <Row style="margin: 4vh 0 0 0; font-size: 3vh">
            <Col span="3" offset="3">密码</Col>
            <Col span="14"><input type="password" v-model="user.password" /></Col>
          </Row>
          <Row style="margin: 8vh 0 0 0;">
            <Col span="7" offset="3"><Button long size="large" @click="register">返回</Button></Col>
            <Col span="7" offset="3"><Button long size="large" @click="confirm">确认</Button></Col>
          </Row>
        </div>
        <div v-else>
          <Row style="padding: 6vh 0 0 0;">
            <Col type="flex" align="middle"><b style="font-size: 4vh">登录</b></Col>
          </Row>
          <Row style="margin: 10vh 0 0 0; font-size: 3vh">
            <Col span="3" offset="3">id: </Col>
            <Col span="14"><input type="text" v-model="user.id" /></Col>
          </Row>
          <Row style="margin: 4vh 0 0 0; font-size: 3vh">
            <Col span="3" offset="3">密码</Col>
            <Col span="14"><input type="password" v-model="user.password" /></Col>
          </Row>
          <Row style="margin: 8vh 0 0 0;">
            <Col span="7" offset="3"><Button long size="large" @click="register">注册</Button></Col>
            <Col span="7" offset="3"><Button long size="large" @click="login">登录</Button></Col>
          </Row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
      return {
        is_register: false,
        user: {
          id: "",
          name: "",
          password: ""
        }
      }
  },
  created() {
      console.log('login')
  },
  methods: {
    login() {
      this.$axios.post('login',
        {
          id: this.user.id,
          password: this.user.password
        }).then(success => {
          localStorage.setItem("userId", success.data.userId)
          localStorage.setItem("token", success.data.token)
          console.log(success.data)
      }),failure => {
        console.log(failure.data)
      }
    },
    register() {
      this.resetObject(this.user)
      this.is_register = !this.is_register
    },
    confirm() {
      //注册
      this.$axios.post(
        '/user/addOrUpdate',
        {
          username: this.user.name,
          password: this.user.password
        }).then(success => {
          console.log(this.user.name)
          console.log(success.data)
        }, failure => {
          console.log(failure.data)
        })
      this.register()
    },
    resetObject(obj) {
      Object.keys(obj).forEach((key) => {
        obj[key] = ""
      })
    }
  }
}
</script>

<style scoped>
.login {
    overflow: hidden;
}

.login .main {
    height: 100vh;
    background: seagreen;
}

.login .main .panel {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  width: 30vw;
  height: 60vh;
  background-color: white;
  border-radius: 5%;
  box-shadow: 0 2px 10px rgba(0,0,0,.5);
}
</style>
