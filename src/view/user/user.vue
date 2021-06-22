<template>
  <div class="user">
    <div class="main">
      <Row align="bottom">
        <Col span="6" offset="1">
          <div style="width: 45vh; height: 45vh; border-radius: 50%; background-color: grey"><img src="" alt=""></div>
        </Col>
        <Col span="14" offset="2">
          <Row style="height: 8vh;"></Row>
          <Row type="flex" align="middle">
            <Col span="6" style="font-size: 4vh"><b>最近在做</b></Col>
            <Col span="4" offset="14" style="font-size: 2vh; cursor: pointer;" @click.native="more">更多>></Col>
          </Row>
          <Row type="flex" align="bottom">
            <Col v-for="(item, index) in normalTasks" :key="index" class-name="task">
                <task v-if="partialTask(index)" :editable="false" :TaskData="item"></task>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row type="flex" align="middle" style="margin: 5vh 0 0 0">
        <Col span="22" offset="2" style="font-size: 4vh;">
          <input v-if="edit_name" v-model="buffer.visitee.name"/>
          <b v-else>{{ visitee.name }}</b>
          <img v-if="edit_name" src="@/assets/img/confirm.svg" alt="" style="width: 4vh; height: 4vh;" @click="confirmEditName"/>
          <img v-if="edit_name" src="@/assets/img/cancel.svg" alt="" style="width: 3.5vh; height: 3.5vh" @click="cancelEditName" />
          <img v-if="!edit_name && user.id == visitee.id" src="@/assets/img/modify.svg" alt="" style="width: 4vh; height: 4vh;" @click="editName"/>
        </Col>
      </Row>
      <Row>
        <Col offset="8">
          <contribution
            :data="contribution"
            :year="2019"
            :rectWidth="12"
            :rectHeight="12"
            :fontSize="10"
            monthText="en" />
        </Col>
      </Row>
      <Row style="margin: 6vh 0 0 0">
        <Col offset="2">
          <b style="font-size: 4vh">消息</b>
        </Col>
      </Row>
      <Row>
        <Col>
        <request></request>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import task from '@/components/task'
import request from './components/request'
export default {
  name: "user",
  components: {
    task,
    request
  },
  data() {
    return {
      edit_name: false,
      buffer: {
        visitee: {
          id: "",
          name: ""
        }
      },
      user: {
        id: 0,
        token: 0
      },
      visitee: {
        id: 0,
        name: "张三"
      },
      normalTasks: [
        {
          id: 0,
          value:"这是一个任务",
          isFinish:false,
          ddl: new Date().toLocaleString(),
          isPrivacy:true
        },
        {
          id: 1,
          value:"这是一个任务1",
          isFinish:false,
          ddl: new Date().toLocaleString(),
          isPrivacy:true
        },
        {
          id: 2,
          value:"这是一个任务2",
          isFinish:false,
          ddl: new Date().toLocaleString(),
          isPrivacy:true
        }
      ],
      contribution: {
        '2019-1-1': 6,
        '2019-1-2': 1,
        '2019-1-3': 2,
        '2019-2-2': 23,
        '2019-2-3': 13,
        '2019-2-4': 7,
        '2019-4-1': 6,
        '2019-4-2': 1,
        '2019-5-3': 2,
        '2019-6-2': 23,
        '2019-6-3': 13,
        '2019-6-4': 7,
        '2019-12-20': 3,
        '2019-12-21': 0,
        '2019-12-22': 9,
        '2019-12-23': 5
      },
      requests: [
        {

        }
      ]
    }
  },
  computed: {
    partialTask() {
      return function(index) {
        if(index < 2) {
          return true
        }
        else {
          return false
        }
      }
    }
  },
  created() {
    this.visiteeId = this.$route.params.userId
    //axios查询visitee信息
    console.log('ok' + this.visitee.id)
  },
  mounted() {
  },
  methods: {
    more() {
      console.log(this.visiteeId)
      this.$router.push({name: 'firstpage', params: {userId: this.visiteeId}})
    },
    editName() {
      this.edit_name = true
      this.buffer.visitee.id = this.visitee.id
      this.buffer.visitee.name = this.visitee.name
    },
    confirmEditName() {
      this.edit_name = false
      this.visitee.name = this.buffer.visitee.name
      //axios
    },
    cancelEditName() {
      this.edit_name = false
      this.buffer.visitee.name = this.visitee.name
    }
  }
}
</script>

<style scoped>
.user .main {
  height: 88vh;
  padding: 14vh 0 0 0;
}

.user .main .task {
  display: inline-block;
  margin: 1vh 1vw 1vh 0.8vw;
}
</style>
