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
            <Radio label="ONCE" size="large">
              <span>单次</span>
            </Radio>
            <Radio label="DAILY" size="large">
              <span>每天</span>
            </Radio>
            <Radio lable="WEEKLY" size="large">
              <span>每周</span>
            </Radio>
            <Radio lable="MONTHLY" size="large">
              <span>每月</span>
            </Radio>
            <Radio lable="YEARLY" size="large">
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
  components: {
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
          TaskType: "WEEKLY",
          privacyType: "public"
        }
      },
      periodTasks: [],
      normalTasks: []
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
    let visiteeId = this.$route.params.userId
    console.log(visiteeId)
    this.$axios.get(
      '/task/personalPeriodicTasks',
      {
        params: {
          userId: parseInt(visiteeId)
        }
      }).then(success => {
      this.periodTasks = success.data
      console.log(success.data)
    }, failure => {
      console.log(failure.data)
    })

    this.$axios.get(
      '/task/personalOnceTasks',
      {
        params: {
          userId: parseInt(visiteeId)
        }
      }).then(success => {
      this.normalTasks = success.data
      console.log(success.data)
    }, failure => {
      console.log(failure.data)
    })
  },
  methods: {
    addTask() {
      this.add_task = true
    },
    insertTask() {
      this.$axios.post('/task/addPersonalTask',
        {
          period: this.buffer.task.TaskType,
          teamTaskId: -1,
          name: this.buffer.task.value,
          isPrivate: (this.buffer.task.privacyType == "public") ? false : true,
          deadline: this.dateFormat("YYYY-mm-ddTHH:MM", this.buffer.task.ddl),
          userId: localStorage.getItem("userId")
        }).then(success => {
        console.log(success.data)
      }, failure => {
        console.log(failure.data)
      })
      console.log(this.buffer.task)
      this.resetObject(this.buffer.task)
    },
    deletePeriodTask(taskId) {
      this.reloadPeriodTask = false;
      this.$nextTick(() => {
        this.reloadPeriodTask = true;
      })

      for (let i = 0; i < this.periodTasks.length; ++i) {
        if (this.periodTasks[i].id == taskId) {
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

      for (let i = 0; i < this.normalTasks.length; ++i) {
        if (this.normalTasks[i].id == taskId) {
          this.normalTasks.splice(i, 1);
          return
        }
      }
      console.log("err");
      //axios
    },
    dateFormat(fmt, date) {
      let ret;
      const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        }
      }
      return fmt;
    },
    resetObject(obj) {
      Object.keys(obj).forEach((key) => {
        obj[key] = ""
      })
    },
  }
}
</script>

<style scoped>
@import "../../assets/css/base.css";

.firstpage {
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
  border-width: 1px;
}

.firstpage .main .normal-task {
  float: left;
  max-height: 83vh;
  min-height: 83vh;
  width: 50vw;
  overflow-y: auto;
}

.firstpage .main .normal-task::-webkit-scrollbar {
  border-width: 1px;
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
