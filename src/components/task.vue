<template>
  <div class="task">
    <div class="task-double">
      <div class="task-content">
        <div class="left-container">
          <div class="complete">
            <img v-if="isFinish" @click="finish" :src="Red" alt="" />
            <img v-else @click="finish" :src="Green" alt="" />
          </div>
        </div>
        <div class="middle-container">
          <div v-if="isShow" class="value">
            <textarea type="text" name="taskChange" style="width: flex;" v-model="newValue" />
          </div>
          <div v-else class="value">{{ value }}</div>
          <div class="complete-time">
            <span> {{ time }} </span>
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
      time: this.TaskData.time,
      isPrivacy: true,
    }
  },
  watch:{
    isShow(){
      this.newValue = this.value;
    },
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
  position: absolute;
  top: 15vh;
  left: 0vw;
  display: flex;
  margin: 0 0 0 3vw;
  align-content:space-between;
  background: white;
}

.task-double{
  display: flex;
  justify-content: center;
}

.task-double .task-content{
  height: 27vh;
  width: 27vw;
  flex: 1;
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
  height: 70%;
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
  bottom: 1vh;
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
