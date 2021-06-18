<template>
  <div class="team">
    <div class="create">
      <div class="title">
        你创建的小组
        <img src="@/assets/img/firstpage/add.svg" alt="" class="create-team" @click="createTeam" />
      </div>
      <div class="create-wrapper">
        <ul>
          <li v-for="(item, index) in create" :key="index">{{ item.teamName }}</li>
        </ul>
      </div>
    </div>
    <div class="join">
      <div class="title">
        你加入的小组
        <img src="@/assets/img/firstpage/add.svg" alt="" class="join-team" @click="joinTeam"/>
      </div>
      <div class="join-wrapper">
        <ul>
          <li v-for="(item, index) in join" :key="index">{{ item.teamName }}</li>
        </ul>
      </div>
    </div>
    <Modal
      width="32"
      title="创建小组"
      v-model="create_team"
      :closable="false"
      @on-ok="insertCreate"
      @on-cancel="reset(buffer.team)">
      <div>
        <div style="height: 8vh; margin: 1vh 0 2vh 0; font-size: 2.2vh;">
          小组名称
          <input type="text" style="width: 90%;" v-model="buffer.team.teamName">
        </div>
        <div style="font-size: 2.2vh">
          小组描述
          <textarea rows="3" style="width: 90%;" placeholder="可不填" v-model="buffer.team.description"></textarea>
        </div>
      </div>
    </Modal>
    <Modal
      width="32"
      title="加入小组"
      v-model="join_team"
      :closable="false"
      ok-text="加入"
      cancel-text="取消"
      @on-ok="insertJoin"
      @on-cancel="reset(buffer.teamToJoin)">
      <Row>
        <Col span="3"><div style="font-size: 2.2vh;">小组号</div></Col>
        <Col span="19">
          <div style="height: 8vh; font-size: 2.2vh;">
            <input type="text" style="width: 96%;" v-model="buffer.teamToJoin.teamId">
          </div>
        </Col>
        <Col span="2">
          <img src="@/assets/img/firstpage/search.svg" alt=""
            style="width: 4vh; height: 4vh; cursor: pointer;"
            @click="searchTeam"/>
        </Col>
      </Row>
      <Row v-if="buffer.teamToJoin.status == 1">
        <Col><div style="font-size: 2.2vh">搜索结果</div></Col>
      </Row>
      <Row v-if="buffer.teamToJoin.status == 1">
        <Col span="24">
          <div style="font-size: 2.2vh">{{ buffer.teamToJoin.teamName }}</div>
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
  data() {
    return {
      create_team: false,
      join_team: false,
      buffer: {
        team: {
          teamName: "",
          description: ""
        },
        teamToJoin: {
          status: 0, //-1没搜到, 0没搜, 1搜到
          teamId: "",
          teamName: ""
        }
      },
      create: [
        {
          teamName: "小组1"
        },
        {
          teamName: "小组2"
        },
        {
          teamName: "小组3"
        },
        {
          teamName: "小组4"
        },
        {
          teamName: "小组5"
        },
        {
          teamName: "小组6"
        },
        {
          teamName: "小组7"
        },
        {
          teamName: "小组8"
        },
      ],
      join: [
        {
          teamName: "小组4"
        },
        {
          teamName: "小组5"
        }
      ]
    }
  },
  methods: {
    createTeam() {
      this.create_team = true
    },
    insertCreate() {
      //TODO fail or succeed
      //axios
      this.reset(this.buffer.team)
    },
    searchTeam() {
      //TODO
      //axios
    },
    joinTeam() {
      this.join_team = true
    },
    insertJoin() {
      //TODO fail or succeed
      //axios
      this.resetObject(this.buffer.teamToJoin)
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
  box-shadow: 0 2px 5px rgba(0,0,0,.5);
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
	border-width:1px;
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
	border-width:1px;
}

.team .create .title, .team .join .title {
  height: 6vh;
  font-size: 3.5vh;
  font-weight: bold;
  border-bottom: 1px solid rgba(0,0,0,.4);
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
  box-shadow: 0 1px 2px rgba(0,0,0,.5);
  cursor: pointer;
}

</style>
