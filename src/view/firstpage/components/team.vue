<template>
  <div class="team">
    <div class="create">
      <div class="title">
        创建的小组
        <img alt="" class="create-team" src="@/assets/img/add.svg" @click="createTeam"/>
      </div>
      <div class="create-wrapper">
        <ul>
          <li v-for="(item, index) in create" :key="index" @click="visitTeam(item.id)">{{ item.name }}</li>
        </ul>
      </div>
    </div>
    <div class="join">
      <div class="title">
        加入的小组
        <img alt="" class="join-team" src="@/assets/img/add.svg" @click="joinTeam"/>
      </div>
      <div class="join-wrapper">
        <ul>
          <li v-for="(item, index) in join" :key="index" @click="visitTeam(item.id)">{{ item.name }}</li>
        </ul>
      </div>
    </div>
    <Modal
      v-model="create_team"
      :mask-closable="false"
      title="创建小组"
      width="32"
      @on-ok="insertCreate"
      @on-cancel="resetObject(buffer.team)">
      <div>
        <div style="height: 8vh; margin: 1vh 0 2vh 0; font-size: 2.2vh;">
          小组名称
          <input v-model="buffer.team.name" style="width: 90%;" type="text">
        </div>
        <div style="font-size: 2.2vh">
          小组描述
          <textarea v-model="buffer.team.description" placeholder="可不填" rows="3" style="width: 90%;"></textarea>
        </div>
      </div>
    </Modal>
    <Modal
      v-model="join_team"
      :mask-closable="false"
      cancel-text="取消"
      ok-text="加入"
      title="加入小组"
      width="32"
      @on-ok="insertJoin"
      @on-cancel="resetObject(buffer.teamToJoin)">
      <Row>
        <Col span="3">
          <div style="font-size: 2.2vh;">小组号</div>
        </Col>
        <Col span="19">
          <div style="height: 8vh; font-size: 2.2vh;">
            <input v-model="buffer.teamToJoin.teamId" style="width: 96%;" type="text">
          </div>
        </Col>
        <Col span="2">
          <img alt="" src="@/assets/img/firstpage/search.svg"
               style="width: 4vh; height: 4vh; cursor: pointer;"
               @click="searchTeam"/>
        </Col>
      </Row>
      <Row v-if="buffer.teamToJoin.status == 1">
        <Col>
          <div style="font-size: 2.2vh">搜索结果</div>
        </Col>
      </Row>
      <Row v-if="buffer.teamToJoin.status == 1">
        <Col span="24">
          <div style="font-size: 2.2vh">小组名称: {{ buffer.teamToJoin.name }}</div>
        </Col>
      </Row>
      <Row v-if="buffer.teamToJoin.status == -1">
        <Alert type="error">查不到该小组</Alert>
      </Row>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "team",
  props: {
    VisiteeId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      create_team: false,
      join_team: false,
      buffer: {
        team: {
          name: "",
          description: ""
        },
        teamToJoin: {
          status: 0, //-1没搜到, 0没搜, 1搜到
          teamId: "",
          name: ""
        }
      },
      create: [],
      join: []
    }
  },
  created() {
    //我创建
    this.$axios.get(
      '/user/getCreateTeams',
      {
        params:{
          userId: this.VisiteeId
        }
      }
    ).then(success => {
      this.create = success.data
      console.log(success.data)
    }, failure => {
      console.log(failure.data);
    })

    //我加入
    this.$axios.get(
      '/user/getJoinTeams',
      {
        params:{
          userId: this.VisiteeId
        }
      }
    ).then(success => {
      this.join = success.data
      console.log(success.data)
    }, failure => {
      console.log(failure.data);
    })
  },
  methods: {
    createTeam() {
      this.create_team = true
    },
    insertCreate() {//创建一个小组
      this.$axios.post(
        '/team/addOrUpdate',
        {
          userId: localStorage.getItem("userId"),
          name: this.buffer.team.name,
          description: this.buffer.team.description
        }
      ).then(success => {
        console.log(success.data)
      }, failure => {
        console.log(failure.data);
      })
      this.resetObject(this.buffer.team)
    },
    searchTeam() {
      if (this.buffer.teamToJoin.teamId == "") {
        this.$Notice.error({
          title: '小组号不能为空'
        });
        return
      }
      this.$axios.get('/team/getTeam/', {
        params: {
          teamId: this.buffer.teamToJoin.teamId
        }
      }).then(success => {
        console.log(success)
        this.buffer.teamToJoin.teamId = success.data.id
        this.buffer.teamToJoin.name = success.data.name
        this.buffer.teamToJoin.status = 1
        if (success.data == "") {
          this.buffer.teamToJoin.status = -1
        }

        console.log(this.buffer.teamToJoin)
      }, failure => {
        console.log(failure.data)
      })
    },
    joinTeam() {
      this.join_team = true
    },
    insertJoin() {
      this.$axios.post(
        '/team/joinTeam',
        {
          userId: localStorage.getItem("userId"),
          teamId: this.buffer.teamToJoin.teamId
        }
      ).then(success => {
        if(success.data) {
          this.$Notice.success({
            title: '加入成功',
          })
        }
        else {
          this.$Notice.error({
            title: '已是该小组成员',
          })
        }
      }, failure => {
        console.log(failure.data);
      })

      this.resetObject(this.buffer.teamToJoin)
    },
    visitTeam(teamId) {
      this.$router.push({name: "teampage", params: {teamId: teamId}})
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
ul, li {
  padding: 0;
  margin: 0;
  list-style: none;
}

.team {
  position: fixed;
  right: 0;
  width: 25%;
  height: 100vh;
  padding: 9vh 0 0 0;
  border-left: 0.5px solid white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, .5);
}

.team .create {
  width: 100%;
  height: 35%;
}

.team .create .create-wrapper {
  max-height: 25vh;
  overflow-y: auto;
}

.team .create .create-wrapper::-webkit-scrollbar {
  border-width: 1px;
}

.team .join {
  width: 100%;
  max-height: 65%;
}

.team .join .join-wrapper {
  max-height: 65vh;
  overflow-y: auto;
}

.team .join .join-wrapper::-webkit-scrollbar {
  border-width: 1px;
}

.team .create .title, .team .join .title {
  height: 6vh;
  font-size: 3.5vh;
  font-weight: bold;
  border-bottom: 1px solid rgba(0, 0, 0, .4);
}

.team .create .create-team, .team .join .join-team {
  float: right;
  width: 4vh;
  height: 4vh;
  padding: 1vh 0 0 0;
  cursor: pointer;
}

.team .create li, .team .join li {
  float: left;
  clear: left;
  width: 100%;
  height: 5.5vh;
  padding: 0.5vh 0 0 1vw;
  font-size: 2.8vh;
  border-top: 0.5px solid white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .5);
  cursor: pointer;
}

</style>
