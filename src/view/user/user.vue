<template>
  <div class="user">
    <div class="main">
      <Row align="bottom">
        <Col offset="1" span="6">
          <div style="width: 45vh; height: 45vh; border-radius: 50%; background-color: grey"><img alt="" src=""></div>
        </Col>
        <Col offset="2" span="14">
          <Row style="height: 8vh;"></Row>
          <Row align="middle" type="flex">
            <Col span="6" style="font-size: 4vh"><b>最近在做</b></Col>
            <Col offset="14" span="4" style="font-size: 2vh; cursor: pointer;" @click.native="more">更多>></Col>
          </Row>
          <Row align="bottom" type="flex">
            <Col v-for="(item, index) in normalTasks" :key="index" class-name="task">
              <task v-if="partialTask(index)" :TaskData="item" :editable="false"></task>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row align="middle" style="margin: 5vh 0 0 0" type="flex">
        <Col offset="2" span="22" style="font-size: 4vh;">
          <input v-if="edit_name" v-model="buffer.visitee.name"/>
          <b v-else>{{ visitee.name }}</b>
          <img v-if="edit_name" alt="" src="@/assets/img/confirm.svg" style="width: 4vh; height: 4vh;"
               @click="confirmEditName"/>
          <img v-if="edit_name" alt="" src="@/assets/img/cancel.svg" style="width: 3.5vh; height: 3.5vh"
               @click="cancelEditName"/>
          <img v-if="!edit_name && user.id == visitee.id" alt="" src="@/assets/img/modify.svg"
               style="width: 4vh; height: 4vh;" @click="editName"/>
        </Col>
      </Row>
      <Row>
        <Col offset="2" span="6" style="padding: 2vh 5vw 0 0">
          <Button v-if="this.visitee.id != this.user.id" long @click="followBehavior"><p v-if="reloadFollowState">{{ followState }}</p></Button>
        </Col>
        <Col span="12">
          <contribution v-if="loadingContribution"
            :data="contribution"
            :fontSize="10"
            :rectHeight="12"
            :rectWidth="12"
            :year="year"
            monthText="en"/>
        </Col>
      </Row>
      <Row style="margin: 6vh 0 0 0">
        <Col offset="2">
          <b style="font-size: 4vh">消息</b>
        </Col>
      </Row>
      <Row>
        <Col v-if="reloadRequests" offset="3">
          <div v-for="(item, index) in requests" :key="index" style="display: inline-block; margin: 0 4vw 4vh 0">
            <request :RequestData="item" @deleteRequest="deleteRequest"></request>
          </div>
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
      reloadRequests: true,
      reloadFollowState: true,
      loadingContribution: false,
      follow: false,
      year: new Date().getFullYear(),
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
      normalTasks: [],
      contribution: {},
      requests: []
    }
  },
  computed: {
    partialTask() {
      return function (index) {
        if (index < 2) {
          return true
        } else {
          return false
        }
      }
    },
    followState() {
      if(this.follow) {
        return "取消关注"
      }
      else {
        return "关注"
      }
    }
  },
  created() {
    this.user.id = localStorage.getItem("userId")
    this.user.token = localStorage.getItem("token")
    this.visiteeId = this.$route.params.userId
    //axios查询visitee信息
    this.$axios.get(
      '/user/getUser',
      {
        params:{
          userId: this.$route.params.userId
        }
      }
    ).then(success => {
      this.visitee.id = this.visiteeId
      this.visitee.name = success.data.username
      console.log(success.data)
    }, failure => {
      console.log(failure.data);
    })
    console.log('ok' + this.visitee.id)

    this.$axios.get(
      '/task/personalOnceTasks',
      {
        params: {
          userId: this.$route.params.userId
        }
      }).then(success => {
      console.log(success.data)
      this.normalTasks = success.data
    }, failure => {
      console.log(failure.data)
    })

    this.$axios.get(
      '/task/getTaskRecord',
      {
        params: {
          userId: this.$route.params.userId
        }
      }).then(success => {
      success.data.forEach(i => {
        let date = new Date(i.finishedAt)
        this.contribution[date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()] = i.amount
        this.loadingContribution = true
      })
    }, failure => {
      console.log(failure.data)
    })

    this.$axios.get(
      '/follow/getFollowState',
      {
        params:{
          followingId: localStorage.getItem("userId"),
          userId: this.visiteeId,
        }
      }
    ).then(success => {
      this.follow = success.data
      console.log(success.data)
    }, failure => {
      console.log(failure.data);
    })
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
    },
    followBehavior() {
      this.reloadFollowState = false;
      this.$nextTick(() => {
        this.reloadFollowState = true;
      })

      if (!this.follow) {
        //axios
        this.$axios.post(
          '/follow/addFollow',
          {
            followingId: localStorage.getItem("userId"),
            userId: this.visitee.id
          }
        ).then(success => {
          console.log(success.data)
        }, failure => {
          console.log(failure.data);
        })
      } else {
        this.$axios.post(
          '/follow/unfollow',
          {
            followingId: localStorage.getItem("userId"),
            userId: this.visitee.id
          }
        ).then(success => {
          console.log(success.data)
        }, failure => {
          console.log(failure.data);
        })
      }
      this.follow = !this.follow
    },
    deleteRequest(requestId) {
      this.reloadRequests = false;
      this.$nextTick(() => {
        this.reloadRequests = true;
      })

      for (let i = 0; i < this.requests.length; ++i) {
        if (this.requests[i].id == requestId) {
          this.requests.splice(i, 1);
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
.user .main {
  min-height: 88vh;
  padding: 14vh 0 10vh 0;
}

.user .main .task {
  display: inline-block;
  margin: 1vh 1vw 1vh 0.8vw;
}
</style>
