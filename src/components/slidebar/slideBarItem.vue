<template>
  <div class="slide-bar-item" @click="iClick">
    <slot name="item-icon"></slot>
    <div :class={active:isActive}>
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "slideBarItem",
  props:{
    path: String
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1;
    }
  },
  methods:{
    iClick(){
      this.$router.replace(this.path);
    }
  }
}
</script>

<style scoped>
.slide-bar-item{
  flex: 2;
  text-align: center;
  height: 8vh;
  font-size: 5vh;
  cursor: pointer;
}
.active{
  font-family:siyuan;
}
</style>
