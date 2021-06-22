<template>
  <div class="user">
    <div class="main">
      <Row align="bottom">
        <Col span="6" offset="1">
          <div style="width: 45vh; height: 45vh; border-radius: 50%; background-color: grey"><img src="" alt=""></div>
        </Col>
        <Col span="14" offset="2">
          <Row type="flex" align="middle">
            <Col span="6" style="font-size: 4vh"><b>最近在做</b></Col>
            <Col span="4" offset="14" style="font-size: 2vh; cursor: pointer;" @click.native="more">更多>></Col>
          </Row>
          <Row type="flex" align="bottom" style="height: 100%;">
            <Col v-for="(item, index) in normalTasks" :key="index" class-name="task">
                <task v-if="partialTask(index)" :editable="false" :TaskData="item"></task>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>

      </Row>
      <Row>

      </Row>
      <Row>

      </Row>
      <Row>

      </Row>
    </div>
  </div>
</template>

<script>
import task from '@/components/task'
export default {
  name: "user",
  components: {
    task
  },
  data() {
    return {
      visiteeId: 0,
      normalTasks: [
        {
          id: 0,
          value:"这是一个任务",
          isFinish:false,
          ddl: new Date().toLocaleString(),
          isPrivacy:true
        },
        {
          id: 1,
          value:"这是一个任务1",
          isFinish:false,
          ddl: new Date().toLocaleString(),
          isPrivacy:true
        },
        {
          id: 2,
          value:"这是一个任务2",
          isFinish:false,
          ddl: new Date().toLocaleString(),
          isPrivacy:true
        }
      ]
    }
  },
  computed: {
    partialTask() {
      return function(index) {
        if(index < 2) {
          return true
        }
        else {
          return false
        }
      }
    }
  },
  created() {
    this.visiteeId = this.$route.params.id
  },
  mounted() {
    console.log(2)
  },
  methods: {
    more() {
      //this.$router.push({name: 'firstpage', params: {userId: this.visiteeId}})
    }
  }
}
</script>

<style scoped>
.user {
  overflow: hidden;
}

.user .main {
  height: 88vh;
  padding: 14vh 0 0 0;
}

.user .main .task {
  display: inline-block;
  margin: 1vh 1vw 1vh 0.8vw;
}
</style>
