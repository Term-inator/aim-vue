<template>
  <div class="teamInfo">
    <div class="description">
      <div class="title">
        简介
        <img v-if="showEditor" alt="" class="edit-description" src="@/assets/img/cancel.svg" style="width: 4.2vh; height: 4.2vh"
             @click="cancel">
        <img v-if="showEditor" alt="" class="edit-description" src="@/assets/img/confirm.svg" @click="confirm">
        <img v-if="!showEditor && !isNotMember" alt="" class="edit-description" src="@/assets/img/modify.svg" @click="editDescription"/>
      </div>
      <div class="description-wrapper">
        <div v-if="showEditor">
          <textarea v-model="team.newDescription" autofocus name="description" rows="12"
                    style="width: 90%; height: 20vh;"
                    type="text"></textarea>
        </div>
        <div v-else>{{ team.description }}</div>
      </div>
    </div>
    <div class="member">
      <div class="title">
        成员 {{ team.memberNum }} 人
      </div>
      <div v-if="reloadMember" class="member-wrapper">
        <ul>
          <li v-for="(item, index) in member" :key="index" @click="visitMember(item.id)">
            <Row>
              <Col span="18" @click="visitMember(item.id)">{{ item.username }}</Col>
              <Col offset="2" span="2">
                <img v-if="user.authority != 'member' && user.id != item.memberId"
                     alt="" src="@/assets/img/teamInfo/kick_out.svg" style="width: 4.2vh; height: 4.2vh"
                     @click="kickOut(item.id)">
                <img v-else alt="">
              </Col>
              <Col span="2" @click.native="changeLevel(item.memberId)">
                <img v-if="item.authority == 'creator'" alt="" src="@/assets/img/teamInfo/person_orange.svg"
                     style="width: 4.2vh; height: 4.2vh"/>
                <img v-if="item.authority == 'admin'" alt="" src="@/assets/img/teamInfo/person_green.svg"
                     style="width: 4.2vh; height: 4.2vh"/>
                <img v-if="item.authority == 'member'" alt="" src="@/assets/img/teamInfo/person_grey.svg"
                     style="width: 4.2vh; height: 4.2vh"/>
              </Col>
            </Row>
          </li>
        </ul>
      </div>
    </div>
    <Modal
      v-model="change_level"
      :mask-closable="false"
      title="更改权限"
      width="32"
      @on-ok="updateLevel"
      @on-cancel="resetObject(buffer.member)">
      <Radio-group v-model="buffer.member.authority">
        <Radio v-if="user.authority == 'creator'" label="creator" size="large">
          <span>创建者</span>
        </Radio>
        <Radio v-if="user.authority != 'member'" label="admin" size="large">
          <span>管理员</span>
        </Radio>
        <Radio label="member" size="large">
          <span>成员</span>
        </Radio>
      </Radio-group>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "teamInfo",
  props: {
    TeamData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showEditor: false,
      reloadMember: true,
      change_level: false,
      isNotMember: false,
      user: {},
      buffer: {
        member: {
          memberId: "",
          memberName: "",
          authority: ""
        }
      },
      team: {
        teamId: this.TeamData.teamId,
        memberNum: this.TeamData.memberNum,
        description: this.TeamData.description,

        newDescription: this.TeamData.description
      },
      member: []
    }
  },
  created() {
    this.$axios.get(
      '/team/getAllUsers',
      {
        params: {
          teamId: this.team.teamId
        }
      }).then(success => {
        this.member = success.data
        let flag = 0
        this.member.forEach((member) => {
          if (member.id == localStorage.getItem("userId")) {
            this.user = member
            flag = 1
          }
        })
        if (!flag) {
          this.user = {
            id: localStorage.getItem("userId"),
            authority: "member" //占坑
          }
          this.isNotMember = true
          if(this.isNotMember) {
            this.$emit("editable")
          }
        }
      }, failure => {
      console.log(failure.data)
    })
  },
  methods: {
    editDescription() {
      this.showEditor = !this.showEditor
    },
    confirm() {
      this.editDescription()
      this.team.description = this.team.newDescription
      //axios
    },
    cancel() {
      this.editDescription()
      this.team.newDescription = this.team.description
    },
    changeLevel(memberId) {
      this.member.forEach(e => {
        if (e.memberId == memberId) {
          this.buffer.member = e
        }
      })
      this.change_level = true
    },
    updateLevel() {
      //axios
      //undate picture
      this.reloadMember = false
      this.$nextTick(() => {
        this.reloadMember = true
      })
      console.log(this.buffer.member.memberId)
    },
    kickOut(memberId) {
      console.log(memberId)
      //axios
      //update member
      this.reloadMember = false
      this.$nextTick(() => {
        this.reloadMember = true
      })
      for (let i = 0; i < this.member.length; ++i) {
        if (this.member[i].memberId == memberId) {
          this.member.splice(i, 1)
          break
        }
      }
    },
    visitMember(memberId) {
      console.log(memberId)
      this.$router.push({name: "user", params: {userId: memberId}})
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

.teamInfo {
  position: fixed;
  right: 0;
  width: 25%;
  height: 100vh;
  padding: 9vh 0 0 0;
  border-left: 0.5px solid white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, .5);
}

.teamInfo .description {
  width: 100%;
  height: 35%;
}

.teamInfo .description .description-wrapper {
  max-height: 25vh;
  padding: 0.5vh 0 0 1vw;
  font-size: 2.8vh;
  overflow-y: auto;
}

.teamInfo .description .description-wrapper::-webkit-scrollbar {
  border-width: 1px;
}

.teamInfo .member {
  width: 100%;
  max-height: 65%;
}

.teamInfo .member .member-wrapper {
  max-height: 65vh;
  overflow-y: auto;
}

.teamInfo .member .member-wrapper::-webkit-scrollbar {
  border-width: 1px;
}

.teamInfo .description .title, .teamInfo .member .title {
  height: 6vh;
  font-size: 3.5vh;
  font-weight: bold;
  border-bottom: 1px solid rgba(0, 0, 0, .4);
}

.teamInfo .description .edit-description {
  float: right;
  width: 5vh;
  height: 5vh;
  padding: 1vh 0 0 0;
  cursor: pointer;
}

.teamInfo .description li, .teamInfo .member .member-wrapper li {
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
