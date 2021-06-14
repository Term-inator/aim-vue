<template>
  <div class="slidebar">
    <slot>
    </slot>
  </div>
</template>

<script>
export default {
  name: "slideBar"
}
</script>

<style scoped>
.slidebar{
  display:flex;
  position: fixed;
  box-shadow: 0 2px 5px rgba(0,0,0,.5);
  top:0;
  left:0;
  right:0;
}
</style>
