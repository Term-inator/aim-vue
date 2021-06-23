<template>
  <div class="community">
    <div class="main">
      <Row>
        <Col span="18">
          <Row style="padding: 2vh 0 0 0">
            <Col offset="22" span="2">
              <img alt="" src="@/assets/img/add.svg" style="width: 4vh; height: 4vh" @click="propagate"/>
            </Col>
          </Row>
          <Row>
            <Col span="24" style="padding: 0 0 0 2vw;">
              <div v-for="(item, index) in posts" :key="index" style="display: inline-block; margin: 0 2vw 2vh 0">
                <post :PostData="item"></post>
              </div>
            </Col>
          </Row>
        </Col>
        <Col span="6">
          <follower></follower>
        </Col>
      </Row>
    </div>
    <Modal
      v-model="is_propagate"
      :mask-closable="false"
      cancel-text="取消"
      ok-text="发布"
      title="发布"
      width="32"
      @on-ok="insertPost"
      @on-cancel="resetObject(buffer.post)">
      <textarea v-model="buffer.post.title" placeholder="不超过35字"
                style="width: 100%; height: 30vh; font-size: 3vh"></textarea>
    </Modal>
  </div>
</template>

<script>
import post from './components/post'
import follower from "./components/follower";

export default {
  name: "community",
  components: {
    post,
    follower
  },
  data() {
    return {
      is_propagate: false,
      buffer: {
        post: {
          poster: 0, //user
          title: ""
        }
      },
      posts: [
        // {
        //   id: 0,
        //   poster: 0,
        //   posterName: "张三",
        //   created_at: new Date().toLocaleString(),
        //   title: "123"
        // },
        // {
        //   id: 1,
        //   poster: 1,
        //   teamId: 1,
        //   posterName: "李四",
        //   created_at: new Date().toLocaleString(),
        //   title: "456"
        // },
        // {
        //   id: 2,
        //   poster: 1,
        //   teamId: 1,
        //   posterName: "李四",
        //   created_at: new Date().toLocaleString(),
        //   title: "平平无奇"
        // },
        // {
        //   id: 3,
        //   poster: 1,
        //   teamId: 1,
        //   posterName: "李四",
        //   created_at: new Date().toLocaleString(),
        //   title: "9"
        // }
      ]
    }
  },
  mounted() {
    console.log("community")
  },
  methods: {
    propagate() {
      this.is_propagate = true
    },
    insertPost() {
      //axios
      this.$axios.post(
        '/post/addPost',
        {
          poster: localStorage.getItem("userId"),
          title: this.buffer.post.title,
        }
      ).then(success => {
        console.log(success.data)
      }, failure => {
        console.log(failure.data);
      })
      console.log(this.buffer.post.title)
      this.resetObject(this.buffer.post)
    },
    resetObject(obj) {
      Object.keys(obj).forEach((key) => {
        obj[key] = ""
      })
    }
  },
  created() {
    this.$axios.get(
      '/post/getRecentPosts',
    ).then(success => {
      console.log(success.data)
      this.posts = success.data
      console.log(success.data)
    }, failure => {
      console.log(failure.data);
    })
  }
}
</script>

<style scoped>
.community .main {
  min-height: 88vh;
  padding: 8vh 0 10vh 0;
}
</style>
