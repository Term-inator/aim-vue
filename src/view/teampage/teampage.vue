<template>
  <div class="teampage">
    <div class="main">
      <div class="add-wrapper">
        <div>{{ teamName }}</div>
        <img src="@/assets/img/add.svg" alt="" class="add" @click="addTask">
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
    <Modal
      width="32"
      title="添加任务"
      v-model="add_task"
      :closable="false"
      @on-ok="insertTask">
      <div>
        <div style="height: 4vh; margin: 0.5vh 0 0 0">
          <Radio-group v-model="buffer.task.TaskType">
            <Radio label="normal" size="large">
              <span>普通任务</span>
            </Radio>
            <Radio label="period" size="large">
              <span>周期任务</span>
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
import team from '@/view/teampage/components/teamInfo'
export default {
  name: "teampage",
  components:{
    task,
    team
  },
  data() {
    return {
      add_task: false,
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
  methods: {
    addTask() {
      this.add_task = true
    },
    insertTask() {
      //TODO
      console.log(this.buffer.task)
    }
  }
}
</script>

<style scoped>
@import "../../assets/css/base.css";
.teampage{
  overflow: hidden;
}

.teampage .main {
  height: 88vh;
  vertical-align: top;
}

.teampage .main .add-wrapper {
  float: left;
  width: 75%;
  height: flex;
  padding: 0 3vw 0 0;
  margin: 10vh 0 0 0;
}

.teampage .main .add-wrapper div {
  display: inline-block;
  margin: 0 16vw 0 2vw;
  font-size: 3vh;
}

.teampage .main .add-wrapper .add {
  float: right;
  width: 4vh;
  height: 4vh;
  cursor: pointer;
}

.teampage .main .period-task {
  float: left;
  max-height: 83vh;
  width: 26vw;
  overflow-y: auto;
}

.teampage .main .period-task::-webkit-scrollbar {
	border-width:1px;
}

.teampage .main .normal-task {
  float: left;
  max-height: 83vh;
  width: 50vw;
  overflow-y: auto;
}

.teampage .main .normal-task::-webkit-scrollbar {
	border-width:1px;
}

.teampage .main .period-task .task {
  display: inline-block;
  margin: 1vh 1vw 1vh 0.8vw;
}

.teampage .main .normal-task .task {
  display: inline-block;
  margin: 1vh 0.8vw 1vh 0.1vw;
}

</style>