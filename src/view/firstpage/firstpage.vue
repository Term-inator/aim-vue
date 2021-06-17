<template>
  <div class="firstpage">
    <div v-for="(item, index) in tasks" :key="index">
      <task :TaskData="item" :style="[taskPosition(index)]"></task>
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
          id: 0,
          value:"这是一个我每天都要做的任务",
          isFinish:false,
          time: new Date().toLocaleString(),
          isPrivacy:true
        },
        {
          id: 1,
          value:"这是一个任务",
          isFinish:false,
          time: new Date().toLocaleString(),
          isPrivacy:true
        },
        {
          id: 2,
          value: "下一个",
          isFinish: false,
          time: new Date().toLocaleString(),
          isPrivacy: true
        },
        {
          id: 2,
          value: "下一个",
          isFinish: false,
          time: new Date().toLocaleString(),
          isPrivacy: true
        },
        {
          id: 2,
          value: "下一个",
          isFinish: false,
          time: new Date().toLocaleString(),
          isPrivacy: true
        },
        {
          id: 2,
          value: "下一个",
          isFinish: false,
          time: new Date().toLocaleString(),
          isPrivacy: true
        },
        {
          id: 2,
          value: "下一个",
          isFinish: false,
          time: new Date().toLocaleString(),
          isPrivacy: true
        }
      ]
    }
  },
  computed: {
    taskPosition() {
      return function(index) {
        let left_base = 1
        let top_base = 15
        let width = 27
        let height = 27
        let row = Math.floor(index/2)
        let col = index%2
        let horizontal_gap = 3
        let vertical_gap = 6
        return {'left': left_base + col*width + col*horizontal_gap + 'vw', 'top': top_base + row*height + row*vertical_gap + 'vh'}
      }
    }
  }
}
</script>

<style scoped>
.firstpage{
  padding: 0 0 147.5vh 0;
}

</style>
