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
  props: {
    name: String
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.name) !== -1;
    }
  },
  methods: {
    iClick() {
      let params = this.getParam(this.name)
      if (params == null) {
        this.$router.push({name: this.name});
      } else {
        this.$router.push({name: this.name, params: this.getParam()});
      }
    },
    getParam() {
      if (this.name == "firstpage") {
        return {userId: localStorage.getItem("userId")}
      } else if (this.name == "user") {
        return {userId: localStorage.getItem("userId")}
      } else {
        return null
      }
    }
  }
}
</script>

<style scoped>
.slide-bar-item {
  flex: 2;
  text-align: center;
  height: 8vh;
  font-size: 5vh;
  cursor: pointer;
}

.active {
  font-family: siyuan;
}
</style>
