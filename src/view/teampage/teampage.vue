<template>
  <div class="teampage">
    <div class="main">
      <div class="add-wrapper">
        <div class="title"><b>{{ team.teamName }}</b></div>
        <img src="@/assets/img/add.svg" alt="" class="add" @click="addTask">
        <img v-if="user.authority == 'creator'" src="@/assets/img/delete.svg" alt="" class="add" @click="deleteTeam" />
        <img v-else src="@/assets/img/exit.svg" alt="" class="add" @click="exitTeam" />
        <div>
            <div class="title">周期任务</div>
            <div class="title">普通任务</div>
        </div>
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
      <teamInfo style="float: right;" :TeamData="team"></teamInfo>
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
import teamInfo from '@/view/teampage/components/teamInfo'
export default {
  name: "teampage",
  components:{
    task,
    teamInfo
  },
  data() {
    return {
      add_task: false,
      user: {
          userId: 0,
          token: 0,
          authority: "creator"
      },
      buffer: {
        task: {
          value: "",
          ddl: "",
          TaskType: "normal",
          privacyType: "public"
        }
      },
      team: {
        teamId: "",
        teamName: "",
        memberNum: "",
        description: ""
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
    this.team.teamId = this.$route.params.teamId
    //axios
    this.team = {teamId: 0, teamName: "好好学习", memberNum: 10, description: "非常好"}
  },
  mounted() {
      
  },
  methods: {
    addTask() {
      this.add_task = true
    },
    insertTask() {
      //TODO
      console.log(this.buffer.task)
    },
    deleteTeam() {
        //axios
        //confirm
        console.log("delete team")
    },
    exitTeam() {
        //axios
        //confirm
        console.log("exit team")
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
  width: 26vw;
  overflow-y: auto;
}

.teampage .main .period-task::-webkit-scrollbar {
	border-width:1px;
}

.teampage .main .normal-task {
  float: left;
  max-height: 80vh;
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