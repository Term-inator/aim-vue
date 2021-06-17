<template>
  <div class="firstpage">
    <div v-for="(item, index) in tasks" :key="index">
      <task :TaskData="item"></task>
    </div>
    <team></team>
  </div>
</template>

<script>
import task from '@/components/task'
import team from '@/view/firstpage/components/team'
export default {
  name: "firstpage",
  components:{
    task,
    team
  },
  data() {
    return {
      tasks: [
        {
          value:"这是一个我每天都要做的任务",
          isFinish:false,
          time: new Date().toLocaleString(),
          isPrivacy:true
        },
        {
          value:"这是一个任务",
          isFinish:false,
          time: new Date().toLocaleString(),
          isPrivacy:true
        }
      ]
    }
  }
}
</script>

<style scoped>
.firstpage{
  overflow:scroll;
}

</style>
