<template>
  <div id="app">
    <slideBar v-if="$route.meta.showTab">
      <slideBarItem path="/firstpage">
       <div slot="item-text">任务</div>
      </slideBarItem>
      <slideBarItem path="/community">
        <div slot="item-text">社区</div>
      </slideBarItem>
      <slideBarItem path="/me">
        <div slot="item-text">我的</div>
      </slideBarItem>
      <slideBarItem></slideBarItem>
      <slideBarItem></slideBarItem>
      <slideBarItem></slideBarItem>
      <slideBarItem path="/login">
        <div slot="item-text">登录</div>
      </slideBarItem>
    </slideBar>
    <router-view></router-view>
  </div>
</template>

<script>
import slideBar from "@/components/slidebar/slideBar";
import slideBarItem from "@/components/slidebar/slideBarItem";
export default {
  name: 'App',
  components: {
    slideBar,
    slideBarItem,
  }
}
</script>

<style>
@import "assets/css/base.css";
#app {
  height:100vh;
  width:100%;
  font-family: normal;
}
</style>
