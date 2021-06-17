<template>
  <div class="firstpage">
    <div class="main">
      <div class="add-wrapper">
        <img src="@/assets/img/firstpage/add.svg" alt="" class="add" @click="add">
      </div>
      <div class="period-task">
        <div v-for="(item, index) in periodTasks" :key="index" class="task">
          <task :TaskData="item"></task>
        </div>
      </div>
      <div class="normal-task">
        <div v-for="(item, index) in normalTasks" :key="index" class="task">
          <task :TaskData="item"></task>
        </div>
      </div>
      <team style="float: right;"></team>
    </div>
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
      periodTasks: [
        {
          id: 0,
          value:"周期1",
          isFinish:false,
          ddl: new Date().toLocaleString(),
          isPrivacy:true
        },
        {
          id: 1,
          value:"周期2",
          isFinish:false,
          ddl: new Date().toLocaleString(),
          isPrivacy:true
        }
      ],
      normalTasks: [
        {
          id: 0,
          value:"这是一个我每天都要做的任务",
          isFinish:false,
          ddl: new Date().toLocaleString(),
          isPrivacy:true
        },
        {
          id: 1,
          value:"这是一个任务",
          isFinish:false,
          ddl: new Date().toLocaleString(),
          isPrivacy:true
        },
        {
          id: 2,
          value: "下一个",
          isFinish: false,
          ddl: new Date().toLocaleString(),
          isPrivacy: true
        },
        {
          id: 2,
          value: "下一个",
          isFinish: false,
          ddl: new Date().toLocaleString(),
          isPrivacy: true
        },
        {
          id: 2,
          value: "下一个",
          isFinish: false,
          ddl: new Date().toLocaleString(),
          isPrivacy: true
        },
        {
          id: 2,
          value: "下一个",
          isFinish: false,
          ddl: new Date().toLocaleString(),
          isPrivacy: true
        },
        {
          id: 2,
          value: "下一个",
          isFinish: false,
          ddl: new Date().toLocaleString(),
          isPrivacy: true
        },
        {
          id: 2,
          value: "下一个",
          isFinish: false,
          ddl: new Date().toLocaleString(),
          isPrivacy: true
        },
        {
          id: 2,
          value: "下一个",
          isFinish: false,
          ddl: new Date().toLocaleString(),
          isPrivacy: true
        }
      ]
    }
  },
  computed: {
    periodTaskPosition() {
      return function() {
        //let height = 22
        //let vertical_gap = 4
        // let left_base = 2
        // let top_base = 15.5
        //let row = index
        return {
          'display': 'inline-block',
          // 'top': row*height + row*vertical_gap + 'vh',
          'margin': '1vh 0vw 3vh 2vw' 
        }
      }
    },
    normalTaskPosition() {
      return function() {
        // let width = 22
        // let height = 22
        // let horizontal_gap = 2
        // let vertical_gap = 4
        // let left_base = 2 + width + horizontal_gap
        // let top_base = 15.5
        // let row = Math.floor(index/2)
        // let col = index%2
        return {
          'display': 'inline-block',
          // 'left': col*width + col*horizontal_gap + 'vw',
          // 'top': row*height + row*vertical_gap + 'vh',
          'margin': '1vh 0.5vw 3vh 1.5vw'
        }
      }
    }
  },
  watch: {
    tasks: {
      handler(val) {
        for (let i = 0; i < val.length; i++) {
          console.log(val)
        }
      },
      deep: true
    }
  },
  methods: {
    add() {
      //TODO
      console.log("TODO")
      this.insertTask({
        
          id: 2,
          value: "nothing",
          isFinish: false,
          ddl: new Date().toLocaleString(),
          isPrivacy: true
        
      })
    },
    insertTask(task) {
      //in some specific order
      this.$set(this.tasks, 1, task)
    }
  }
}
</script>

<style scoped>
@import "../../assets/css/base.css";
.firstpage{
  overflow: hidden;
}

.firstpage .main {
  height: 88vh;
  vertical-align: top;
}

.firstpage .main .add-wrapper {
  float: left;
  width: 75%;
  height: flex;
  padding: 0 3vw 0 0;
  margin: 10vh 0 0 0;
}

.firstpage .main .add-wrapper .add {
  float: right;
  width: 4vh;
  height: 4vh;
  cursor: pointer;
}

.firstpage .main .period-task {
  float: left;
  max-height: 83vh;
  width: 26vw;
  overflow-y: auto;
}

.firstpage .main .period-task::-webkit-scrollbar {
	border-width:1px;
}

.firstpage .main .normal-task {
  float: left;
  max-height: 83vh;
  width: 50vw;
  overflow-y: auto;
}

.firstpage .main .normal-task::-webkit-scrollbar {
	border-width:1px;
}

.firstpage .main .period-task .task {
  display: inline-block;
  margin: 1vh 1vw 1vh 0.8vw;
}

.firstpage .main .normal-task .task {
  display: inline-block;
  margin: 1vh 0.8vw 1vh 0.1vw;
}

</style>
