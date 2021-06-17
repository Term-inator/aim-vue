<template>
  <div class="task">
    <div class="task-double">
      <div class="task-content">
        <div class="left-container">
          <div class="complete">
            <img v-if="isFinish" @click="finish" :src="Green" alt="" />
            <img v-else @click="finish" :src="Red" alt="" />
          </div>
        </div>
        <div class="middle-container">
          <div v-if="isShow" class="value">
            <textarea type="text" name="taskChange" style="width: flex;" v-model="newValue" />
          </div>
          <div v-else class="value">{{ value }}</div>
          <div v-if="!isShow" isclass="complete-time">
            <span> {{ ddl }} </span>
          </div>
          <div v-else>
            <Date-picker type="datetime" format="yyyy-MM-dd HH:mm" size="small" placeholder="选择日期和时间（不含秒）" style="width: 100%" v-model="newDdl"></Date-picker>
          </div>
        </div>
        <div class="right-container">
          <div class="privacy" @click="privacy">
            <div v-if="isPrivacy">公开</div>
            <div v-else>私密</div>
          </div>
          <img v-if="!isShow" src="@/assets/img/task/modify.svg" class="edit" alt="" @click="show" />
          <img v-if="isShow" src="@/assets/img/task/cancel.svg" class="cancel" alt="" @click="cancel" />
          <img v-if="isShow" src="@/assets/img/task/confirm.svg" class="confirm" alt="" @click="confirm" />
        </div>
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
      newValue: "",
      isShow:false,
      isFinish:false,
      Red:require('@/assets/img/task/red.svg'),
      Green:require('@/assets/img/task/green.svg'),
      ddl: this.TaskData.ddl, //TODO set dll
      newDdl: "",
      isPrivacy: true,
    }
  },
  watch:{
    isShow(){
      this.newValue = this.value
      this.newDdl = this.ddl
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
  padding: 1vh 1vw 1vh 1vw;
  border: 0.5px solid white;
  box-shadow: 0 2px 5px rgba(0,0,0,.5);
  white-space: nowrap;
  overflow: hidden;
}

.task-content .left-container {
  float: left;
  width: 10%;
  height: 100%;
  vertical-align: top;
}

.task-content .middle-container {
  display: inline-block;
  width: flex;
  max-width: 80%;
  height: 100%;
  vertical-align: top;
}

.task-content .middle-container .value {
  width: flex;
  height: 64%;
  margin: 3vh 0 0 0;
  font-size: 3.5vh;
  white-space: pre-wrap;
}

.task-content .middle-container .complete-time{
  font-size: 1.8vh;
}

.task-content .right-container {
  float: right;
  width: 10%;
  height: 100%;
  vertical-align: top;
}

.task-content .right-container .privacy{
  font-size: 2vh;
}

.task-content .right-container .edit {
  position: absolute;
  bottom: 2vh;
  width: 4vh;
  height: 4vh;
}

.task-content .right-container .confirm {
  position: absolute;
  bottom: 2vh;
  width: 3vh;
  height: 3vh;
}

.task-content .right-container .cancel {
  position: absolute;
  bottom: 6vh;
  width: 2.5vh;
  height: 2.5vh;
}
</style>
