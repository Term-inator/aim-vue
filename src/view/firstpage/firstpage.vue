<template>
  <div class="firstpage">
    <div class="main">
      <div class="add-wrapper">
        <div>周期任务</div>
        <div>普通任务</div>
        <img src="@/assets/img/add.svg" alt="" class="add" @click="addTask">
      </div>
      <div v-if="reloadPeriodTask" class="period-task">
        <div v-for="(item, index) in periodTasks" :key="index" class="task">
          <task :editable="true" :TaskData="item" @deleteTask="deletePeriodTask"></task>
        </div>
      </div>
      <div v-if="reloadNormalTask" class="normal-task">
        <div v-for="(item, index) in normalTasks" :key="index" class="task">
          <task :editable="true" :TaskData="item" @deleteTask="deleteNormalTask"></task>
        </div>
      </div>
      <team style="float: right;"></team>
    </div>
    <Modal
      width="32"
      title="添加任务"
      v-model="add_task"
      :mask-closable="false"
      @on-ok="insertTask">
      <div>
        <div style="height: 4vh; margin: 0.5vh 0 0 0">
          <Radio-group v-model="buffer.task.TaskType">
            <Radio label="once" size="large">
              <span>单次</span>
            </Radio>
            <Radio label="daily" size="large">
              <span>每天</span>
            </Radio>
            <Radio lable="weekly" size="large">
              <span>每周</span>
            </Radio>
            <Radio lable="monthly" size="large">
              <span>每月</span>
            </Radio>
            <Radio lable="yearly" size="large">
              <span>每年</span>
            </Radio>
          </Radio-group>
        </div>
        <div style="height: 4vh; margin: 1vh 0 0 0">
          <Radio-group v-model="buffer.task.privacyType">
            <Radio label="public" size="large">
              <span>公开</span>
            </Radio>
            <Radio label="private" size="large">
              <span>私密</span>
            </Radio>
          </Radio-group>
        </div>
        <div style="height: 8vh; margin: 1vh 0 2vh 0; font-size: 2.2vh;">
          任务名称
          <input type="text" style="width: 90%;" v-model="buffer.task.value">
        </div>
        <div style="height: 8vh;">
          <Date-picker
            type="datetime"
            format="yyyy-MM-dd HH:mm"
            size="large"
            placeholder="选择任务截止日期"
            style="width: 90%"
            v-model="buffer.task.ddl">
          </Date-picker>
        </div>
      </div>
    </Modal>
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
      add_task: false,
      reloadPeriodTask: true,
      reloadNormalTask: true,
      buffer: {
        task: {
          value: "",
          ddl: "",
          TaskType: "normal",
          privacyType: "public"
        }
      },
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
  created() {
    //axios
    let visiteeId = this.$route.params.id
    console.log(visiteeId)
    //axios
    //获取该user的数据
  },
  methods: {
    addTask() {
      this.add_task = true
    },
    insertTask() {
      //TODO
      //axios
      console.log(this.buffer.task)
    },
    deletePeriodTask(taskId) {
      this.reloadPeriodTask = false;
      this.$nextTick(() => {
        this.reloadPeriodTask = true;
      })
      
      for(let i = 0; i < this.periodTasks.length; ++i) {
        if(this.periodTasks[i].id == taskId) {
          this.periodTasks.splice(i, 1);
          return
        }
      }
      console.log("err");
      //axios
    },
    deleteNormalTask(taskId) {
      this.reloadNormalTask = false;
      this.$nextTick(() => {
        this.reloadNormalTask = true;
      })
      
      for(let i = 0; i < this.normalTasks.length; ++i) {
        if(this.normalTasks[i].id == taskId) {
          this.normalTasks.splice(i, 1);
          return
        }
      }
      console.log("err");
      //axios
    },
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

.firstpage .main .add-wrapper div {
  display: inline-block;
  margin: 0 16vw 0 2vw;
  font-size: 3vh;
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
  min-height: 83vh;
  width: 26vw;
  overflow-y: auto;
}

.firstpage .main .period-task::-webkit-scrollbar {
	border-width:1px;
}

.firstpage .main .normal-task {
  float: left;
  max-height: 83vh;
  min-height: 83vh;
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