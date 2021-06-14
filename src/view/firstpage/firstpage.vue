<template>
  <div class="firstpage">
    <task></task>
    <team></team>
  </div>
</template>

<script>
import task from '@/view/firstpage/components/task'
import team from '@/view/firstpage/components/team'
export default {
  name: "firstpage",
  components:{
    task,
    team
  }
}
</script>

<style scoped>
.firstpage{
  overflow:scroll;
}

</style>
