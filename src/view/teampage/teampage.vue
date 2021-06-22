<template>
  <div class="teampage">
    <div class="main">
      <div class="add-wrapper">
        <div class="title"><b>{{ team.teamName }}</b></div>
        <img alt="" class="add" src="@/assets/img/add.svg" @click="addTask">
        <img v-if="user.authority == 'creator'" alt="" class="add" src="@/assets/img/delete.svg" @click="deleteTeam"/>
        <img v-else alt="" class="add" src="@/assets/img/exit.svg" @click="exitTeam"/>
        <div>
          <div class="title">周期任务</div>
          <div class="title">普通任务</div>
        </div>
      </div>
      <div v-if="reloadPeriodTask" class="period-task">
        <div v-for="(item, index) in periodTasks" :key="index" class="task">
          <task :TaskData="item" :editable="true" @deleteTask="deletePeriodTask"></task>
        </div>
      </div>
      <div v-if="reloadNormalTask" class="normal-task">
        <div v-for="(item, index) in normalTasks" :key="index" class="task">
          <task :TaskData="item" :editable="true" @deleteTask="deleteNormalTask"></task>
        </div>
      </div>
      <teamInfo :TeamData="team" style="float: right;"></teamInfo>
    </div>
    <Modal
      v-model="add_task"
      :mask-closable="false"
      title="添加任务"
      width="32"
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
          <input v-model="buffer.task.value" style="width: 90%;" type="text">
        </div>
        <div style="height: 8vh;">
          <Date-picker
            v-model="buffer.task.ddl"
            format="yyyy-MM-dd HH:mm"
            placeholder="选择任务截止日期"
            size="large"
            style="width: 90%"
            type="datetime">
          </Date-picker>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import task from '@/components/task'
import teamInfo from '@/view/teampage/components/teamInfo'

export default {
  name: "teampage",
  components: {
    task,
    teamInfo
  },
  data() {
    return {
      add_task: false,
      reloadPeriodTask: true,
      reloadNormalTask: true,
      user: {
        userId: 0,
        token: 0,
        authority: "creator"
      },
      buffer: {
        task: {
          value: "",
          ddl: "",
          TaskType: "once",
          privacyType: "public"
        }
      },
      team: {
        teamId: "",
        teamName: "",
        memberNum: "",
        description: ""
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
    this.team.teamId = this.$route.params.teamId

    this.$axios.get(
      '/team/getTeam',
      {
        params: {
          teamId: this.team.teamId
        }
      }
    ).then(success => {
      this.team.description = success.data.description
      this.team.memberNum = success.data.memberNum
      this.team.teamName = success.data.name
      console.log(success.data)
    }, failure => {
      console.log(failure.data)
    })

    this.$axios.get(
      '/task/teamPeriodicTasks',
      {
        params: {
          teamId: this.team.teamId,
          userId: localStorage.getItem("userId")
        }
      }
    ).then(success => {
      this.periodTasks = success.data
      console.log(success.data)
    }, failure => {
      console.log(failure.data)
    })

    this.$axios.get(
      '/task/teamOnceTasks',
      {
        params: {
          teamId: this.team.teamId,
          userId: localStorage.getItem("userId")
        }
      }
    ).then(success => {
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
      this.$axios.post(
        '/task/addTeamTask',
        {
          period: this.buffer.task.TaskType,
          completeNum: 0,
          name: this.buffer.task.value,
          isPrivate: (this.buffer.task.privacyType == "public") ? false : true,
          deadline: this.dateFormat("YYYY-mm-ddTHH:MM", this.buffer.task.ddl),
          teamId: this.team.teamId,
          userId: localStorage.getItem("userId")
        }
      ).then(success => {
        console.log(success.data)
      }, failure => {
        console.log(failure.data)
      })
      console.log(this.buffer.task)
      this.resetObject(this.buffer.task)

      this.reloadPeriodTask = false;
      this.$nextTick(() => {
        this.reloadPeriodTask = true;
      })
      this.reloadNormalTask = false;
      this.$nextTick(() => {
        this.reloadNormalTask = true;
      })
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
    deleteTeam() {
      //axios
      //confirm
      console.log("delete team")
    },
    exitTeam() {
      //axios
      //confirm
      //back to firstpage
      console.log("exit team")
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

.teampage {
  overflow: hidden;
}

.teampage .main {
  height: 80vh;
  vertical-align: top;
}

.teampage .main .add-wrapper {
  float: left;
  width: 75%;
  height: flex;
  padding: 0 3vw 0 0;
  margin: 10vh 0 0 0;
}

.teampage .main .add-wrapper .add {
  float: right;
  width: 4vh;
  height: 4vh;
  cursor: pointer;
}

.teampage .main .add-wrapper .title {
  display: inline-block;
  margin: 0 16vw 0 2vw;
  font-size: 3vh;
}

.teampage .main .period-task {
  float: left;
  max-height: 80vh;
  min-height: 80vh;
  width: 26vw;
  overflow-y: auto;
}

.teampage .main .period-task::-webkit-scrollbar {
  border-width: 1px;
}

.teampage .main .normal-task {
  float: left;
  max-height: 80vh;
  min-height: 80vh;
  width: 50vw;
  overflow-y: auto;
}

.teampage .main .normal-task::-webkit-scrollbar {
  border-width: 1px;
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
