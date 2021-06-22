<template>
  <div class="request">
    <div class="request-double">
      <div class="request-content">
        <Row>
          <Col span="20" offset="1">
            <Row style="height: 10vh">
              <Col offset="2" class-name="value" span="18">
                <div>{{ value }}</div>
              </Col>
            </Row>
            <Row>
              <Col span="18" offset="2">
                <span> {{ ddl }} </span>
              </Col>
            </Row>
          </Col>
          <Col span="2">
            <Row>
              <img src="@/assets/img/confirm.svg" alt="" style="width: 2.5vh; height: 2.5vh;" @click="confirm" />
            </Row>
            <Row>
              <img src="@/assets/img/cancel.svg" alt="" style="width: 2.3vh; height: 2.3vh;" @click="cancel" />
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "request",
  data(){
    return{
      id: this.TaskData.id,
      value: this.TaskData.value,
      isShow:false,
      isFinish:false,
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
      console.log(this.id)
      this.$emit("deleteTask", this.id)
    }
  }
}
</script>

<style scoped>
.request{
  display: inline-block;
  position: relative;
  display: flex;
  margin: 1vh 0 0 0;
  align-content:space-between;
  background: white;
}

.request-double{
  display: flex;
  justify-content: center;
}

.request-double .request-content{
  height: 22vh;
  width: 22vw;
  padding: 1vh 0vw 1vh 0vw;
  border: 0.5px solid white;
  box-shadow: 0 2px 5px rgba(0,0,0,.5);
  white-space: nowrap;
}

.request-content .value {
  width: flex;
  height: 12vh;
  font-size: 3.5vh;
  white-space: pre-wrap;
}

.request-content .complete-time{
  font-size: 1.8vh;
}

.request-content .privacy{
  font-size: 2vh;
}
</style>
