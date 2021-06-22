<template>
  <div class="request">
    <div class="request-double">
      <div class="request-content">
        <Row>
          <Col offset="1" span="20">
            <Row style="height: 10vh; margin: 3vh 0 0 0">
              <Col offset="2" span="18">
                <div style="font-size: 3.5vh; white-space: pre-wrap;">{{ value }}</div>
              </Col>
            </Row>
            <Row>
              <Col offset="2" span="18">
                <span style="font-size: 1.8vh;"> {{ time }} </span>
              </Col>
            </Row>
          </Col>
          <Col span="2">
            <Row align="bottom" style="height: 14vh" type="flex">
              <img alt="" src="@/assets/img/confirm.svg" style="width: 2.5vh; height: 2.5vh;" @click="confirm"/>
            </Row>
            <Row>
              <img alt="" src="@/assets/img/cancel.svg" style="width: 2.3vh; height: 2.3vh; margin: 1vh 0 0 0"
                   @click="cancel"/>
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
  props: {
    RequestData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      id: this.RequestData.id,
      value: this.RequestData.value,
      time: this.RequestData.time,
    }
  },
  methods: {
    confirm() {
      //同意
      //axios
      this.del()
    },
    cancel() {
      //拒绝
      //axios
      this.del()
    },
    del() {
      console.log(this.id)
      this.$emit("deleteRequest", this.id)
    }
  }
}
</script>

<style scoped>
.request {
  display: inline-block;
  position: relative;
  display: flex;
  margin: 1vh 0 0 0;
  align-content: space-between;
  background: white;
}

.request-double {
  display: flex;
  justify-content: center;
}

.request-double .request-content {
  height: 22vh;
  width: 22vw;
  padding: 1vh 0vw 1vh 0vw;
  border: 0.5px solid white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, .5);
  white-space: nowrap;
}
</style>
