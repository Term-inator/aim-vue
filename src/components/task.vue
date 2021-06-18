<template>
  <div class="task">
    <div class="task-double">
      <div class="task-content">
        <Row>
          <Col span="2" class-name="complete">
            <img v-if="isFinish" @click="finish" :src="Green" alt="" />
            <img v-else @click="finish" :src="Red" alt="" />
          </Col>
          <Col span="2" offset="19" class-name="privacy" @click.native="privacy">
            <div v-if="isPrivacy">公开</div>
            <div v-else>私密</div>
          </Col>
        </Row>
        <Row style="height: 10vh">
          <Col v-if="isShow" class-name="value" span="18">
            <textarea type="text" name="taskChange" style="width: 100%;" v-model="newValue" />
          </Col>
          <Col v-else class-name="value" span="18">
            <div>{{ value }}</div>
          </Col>
        </Row>
        <br>
        <Row>
          <Col span="18">
            <Date-picker
              v-if="isShow"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              size="small"
              placeholder="选择任务截止日期"
              style="width: 100%"
              v-model="newDdl">
            </Date-picker>
            <div v-else>
              <span> {{ ddl }} </span>
            </div>
          </Col>
          <Col v-if="isShow" span="2" offset="1">
            <img src="@/assets/img/task/confirm.svg" alt="" style="width: 3vh; height: 3vh;" @click="confirm" />
          </Col>
          <Col v-if="isShow" span="2" class-name="cancel">
            <img src="@/assets/img/task/cancel.svg" alt="" style="width: 2.5vh; height: 2.5vh;" @click="cancel" />
          </Col>
          <Col v-if="!isShow" span="2" offset="3" class-name="edit">
            <img src="@/assets/img/modify.svg" alt="" style="width: 3.5vh; height: 3.5vh;" @click="show" />
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
    TaskData: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
      id: this.TaskData.id,
      value: this.TaskData.value,
      isShow:false,
      isFinish:false,
      Red:require('@/assets/img/task/red.svg'),
      Green:require('@/assets/img/task/green.svg'),
      ddl: this.TaskData.ddl, //TODO set dll
      isPrivacy: true,

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
  methods:{
    show(){
      this.isShow = !this.isShow
    },
    finish(){
      this.isFinish = !this.isFinish
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
    }
  }
}
</script>

<style scoped>
.task{
  position: relative;
  display: flex;
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
  padding: 1vh 0vw 1vh 1vw;
  border: 0.5px solid white;
  box-shadow: 0 2px 5px rgba(0,0,0,.5);
  white-space: nowrap;
}

.task-content .value {
  width: flex;
  height: 64%;
  font-size: 3.5vh;
  white-space: pre-wrap;
}

.task-content .complete-time{
  font-size: 1.8vh;
}

.task-content .privacy{
  font-size: 2vh;
}
</style>
