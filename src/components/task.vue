<template>
  <div class="task">
    <div class="task-double">
      <div class="task-content">
        <Row>
          <Col span="20" offset="1">
            <Row>
              <Col v-if="editable" span="2" class-name="complete">
                <img v-if="isFinish" @click="finish" :src="Green" alt="" />
                <img v-else @click="finish" :src="Red" alt="" />
              </Col>
            </Row>
            <Row style="height: 10vh; font-size: 3.5vh; white-space: pre-wrap;">
              <Col v-if="isShow" offset="2" span="18">
                <textarea type="text" name="taskChange" style="width: 100%;" v-model="newValue" />
              </Col>
              <Col v-else offset="2" span="18">
                <div>{{ value }}</div>
              </Col>
            </Row>
            <Row>
              <Col v-if="isShow" span="18" offset="2">
                <Date-picker
                  type="datetime"
                  format="yyyy-MM-dd HH:mm"
                  size="small"
                  placeholder="选择任务截止日期"
                  style="width: 100%"
                  v-model="newDdl">
                </Date-picker>
              </Col>
              <Col v-else span="18" offset="2">
                <span style="font-size: 1.8vh;"> {{ ddl }} </span>
              </Col>
            </Row>
          </Col>
          <Col span="2">
            <Row style="font-size: 2vh;" @click.native="privacy">
              <div v-if="isPrivacy">公开</div>
              <div v-else>私密</div>
            </Row>
            <Row>
              {{ parsePeriod }}
            </Row>
            <Row v-if="isShow" type="flex" align="bottom" style="height: 7vh">
              <img src="@/assets/img/delete.svg" alt="" style="width: 3.4vh; height: 3.4vh;" @click="del" />
            </Row>
            <Row v-if="isShow">
              <img src="@/assets/img/confirm.svg" alt="" style="width: 2.5vh; height: 2.5vh;" @click="confirm" />
            </Row>
            <Row v-if="isShow">
              <img src="@/assets/img/cancel.svg" alt="" style="width: 2.3vh; height: 2.3vh;" @click="cancel" />
            </Row>

            <Row v-if="editable && !isShow" type="flex" align="bottom" style="height: 13vh">
              <img src="@/assets/img/modify.svg" alt="" style="width: 3.5vh; height: 3.5vh;" @click="show" />
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "task",
  props: {
    editable: {
      type: Boolean,
      required: true
    },
    TaskData: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
      id: this.TaskData.id,
      value: this.TaskData.name,
      isShow:false,
      isFinish:false,
      Red:require('@/assets/img/task/red.svg'),
      Green:require('@/assets/img/task/green.svg'),
      period: this.TaskData.period,
      ddl: this.TaskData.deadline.substring(0, 10) + " " + this.TaskData.deadline.substring(11, 16),
      isPrivacy: this.TaskData.isPrivacy,

      newValue: "",
      newDdl: "",
      oldIsPrivacy: ""
    }
  },
  watch:{
    isShow(){
      this.newValue = this.value
      this.newDdl = this.ddl
      this.oldIsPrivacy = this.isPrivacy
    }
  },
  computed: {
    parsePeriod: function() {
        if(this.period == "once") {
          return ""
        }
        else if(this.period == "daily") {
          return "每天"
        }
        else if(this.period == "weekly") {
          return "每周"
        }
        else if(this.period == "monthly") {
          return "每月"
        }
        else if(this.period == "yearly") {
          return "每年"
        }
        else {
          return ""
        }
      }
    },
  methods:{
    show(){
      this.isShow = !this.isShow
    },
    finish(){
      this.isFinish = !this.isFinish
      //axios?
    },
    privacy(){
      if(this.isShow) {
        this.isPrivacy = !this.isPrivacy
      }
    },
    confirm() {
      this.show()
      this.value = this.newValue
      this.ddl = new Date(this.newDdl).toLocaleString()
      //axios
    },
    cancel() {
      this.show()
      this.isPrivacy = this.oldIsPrivacy
    },
    del() {
      this.$emit("deleteTask", this.id)
    }
  }
}
</script>

<style scoped>
.task{
  display: inline-block;
  position: relative;
  display: flex;
  margin: 1vh 0 0 0;
  align-content:space-between;
  background: white;
}

.task-double{
  display: flex;
  justify-content: center;
}

.task-double .task-content{
  height: 22vh;
  width: 22vw;
  padding: 1vh 0vw 1vh 0vw;
  border: 0.5px solid white;
  box-shadow: 0 2px 5px rgba(0,0,0,.5);
  white-space: nowrap;
}
</style>
