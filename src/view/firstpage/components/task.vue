<template>
  <div class="task">
    <div class="task-double">
      <div class="task-content">
        <div class="complete" style="float: left;">
          <img v-if="isFinish" @click="finish" :src="Red" alt="" />
          <img v-else @click="finish" :src="Green" alt="" />
        </div>
        <div class="privacy">
          <div v-if="isPrivacy">{{ privacy1 }}</div>
          <div v-else>{{ privacy2 }}</div>
        </div>
        <div v-if="isShow" @click="show">
          <input type="text" name="task-change" v-model="value"/>
        </div>
        <div v-else>{{ value }}</div>
        <div class="complete-time">
          <span> {{ time }} </span>
        </div>
        <img src="../../../assets/img/task/modify.svg" style="float: right;" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "task",
  data(){
    return{
      value:"这是一个我每天都要做的任务",
      isShow:false,
      isFinish:false,
      Red:require('../../../assets/img/task/red.svg'),
      Green:require('../../../assets/img/task/green.svg'),
      time: new Date().toLocaleString(),
      privacy1: "公开",
      privacy2: "私密",
      isPrivacy:true,
      // lists:[
      //   {
      //     content:"这是一个我每天都要做的任务",
      //   }
      // ],
    }
  },
  watch:{
    isShow(){
      console.log(this.isShow)
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
      this.isPrivacy = !this.isPrivacy
    }
  }
}
</script>

<style scoped>
.task{
  position: absolute;
  top: 20%;
  left: 0%;
  right: 30%;
  display: flex;
  align-content:space-between;
}
.task-double{
  display: flex;
  justify-content: center;
}
.task-double .task-content{
  border: 0.5px solid white;
  box-shadow: 0 2px 5px rgba(0,0,0,.5);
  height: 100%;
  width: 20%;
  flex: 1;
  text-align:center;
  font-size: 30px;
}
.task-content .privacy{
  float: right;
  font-size: 20px;
  margin-bottom: 100px;
}
.task-content .complete-time{
  font-size: 10px;
}
</style>
