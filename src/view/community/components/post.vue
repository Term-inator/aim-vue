<template>
  <div class="post">
    <div class="post-double">
      <div class="post-content">
        <Row>
          <Col offset="1" span="20">
            <Row style="font-size: 2vh;">
              来自: {{ posterName }}
            </Row>
            <Row style="height: 19vh; margin: 1vh 0 0 0">
              <Col offset="2" span="18">
                <div style="font-size: 3vh; white-space: pre-wrap;">{{ title }}</div>
              </Col>
            </Row>
            <Row>
              <Col offset="2" span="18">
                <span style="font-size: 1.8vh;"> {{ createdAt }} </span>
              </Col>
            </Row>
          </Col>
          <Col span="2">
            <Row align="bottom" style="height: 26vh" type="flex">
              <img alt="" src="@/assets/img/add.svg" style="width: 3vh; height: 3vh;" @click="follow"/>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "post",
  props: {
    PostData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      id: this.PostData.id,
      poster: this.PostData.poster,
      posterName: this.PostData.posterName,
      title: this.PostData.title,
      createdAt: this.PostData.createdAt.substring(0, 10) + " " + this.PostData.createdAt.substring(11, 16),
      //createdAt: this.dateFormat("YYYY-mm-dd HH:MM", this.PostData.createdAt),
    }
  },
  created() {

  },
  methods: {
    follow() {
      this.$axios.post(
        '/follow/addFollow',
        {
          userId: this.poster,
          followingId: localStorage.getItem("userId")
        }
      ).then(success => {
        console.log(success.data)
      }, failure => {
        console.log(failure.data);
      })
      console.log(this.buffer.post.title)
      console.log("follow")
    },
  }
}
</script>

<style scoped>
.post {
  display: inline-block;
  position: relative;
  display: flex;
  margin: 1vh 0 0 0;
  align-content: space-between;
  background: white;
}

.post-double {
  display: flex;
  justify-content: center;
}

.post-double .post-content {
  height: 30vh;
  width: 22vw;
  padding: 1vh 0vw 1vh 0vw;
  border: 0.5px solid white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, .5);
  white-space: nowrap;
}
</style>
