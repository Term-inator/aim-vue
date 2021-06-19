<template>
  <div class="login">
    <div class="main">

    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
      return {

      }
  },
  created() {
      console.log('login')
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
</style>