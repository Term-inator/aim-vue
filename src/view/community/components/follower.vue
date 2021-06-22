<template>
  <div class="follower">
    <div class="interest">
      <div class="title">
        你可能想认识
      </div>
      <div class="interest-wrapper">
        <ul>
          <li v-for="(item, index) in interest" :key="index" @click="visit(item.id)">{{ item.name }}</li>
        </ul>
      </div>
    </div>
    <div class="follow">
      <div class="title">
        关注列表
      </div>
      <div class="follow-wrapper">
        <ul>
          <li v-for="(item, index) in follow" :key="index" @click="visit(item.id)">{{ item.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "follower",
  data() {
    return {
      interest: [
        {
          id: 0,
          name: "小明"
        },
        {
          id: 1,
          name: "小红"
        },
        {
          id: 3,
          name: "小军"
        }
      ],
      follow: [
        {
          id: 10,
          name: "小黄"
        },
        {
          id: 11,
          name: "小绿"
        }
      ]
    }
  },
  methods: {
    visit(userId) {
      this.$router.push({name: 'user', params: {userId: userId}})
    }
  }
}
</script>

<style scoped>
ul, li {
  padding: 0;
  margin: 0;
  list-style: none;
}

.follower {
  position: fixed;
  right: 0;
  width: 25%;
  height: 100vh;
  padding: 1vh 0 0 0;
  border-left: 0.5px solid white;
  box-shadow: 0 2px 5px rgba(0,0,0,.5);
}

.follower .interest {
  width: 100%;
  height: 35%;
}

.follower .interest .interest-wrapper {
  max-height: 25vh;
  overflow-y: auto;
}

.follower .interest .interest-wrapper::-webkit-scrollbar {
  border-width:1px;
}

.follower .follow {
  width: 100%;
  max-height: 65%;
}

.follower .follow .follow-wrapper {
  max-height: 65vh;
  overflow-y: auto;
}

.follower .follow .follow-wrapper::-webkit-scrollbar {
  border-width:1px;
}

.follower .interest .title, .follower .follow .title {
  height: 6vh;
  font-size: 3.5vh;
  font-weight: bold;
  border-bottom: 1px solid rgba(0,0,0,.4);
}

.follower .interest li, .follower .follow li {
  float: left;
  clear: left;
  width: 100%;
  height: 5.5vh;
  padding: 0.5vh 0 0 1vw;
  font-size: 2.8vh;
  border-top: 0.5px solid white;
  box-shadow: 0 1px 2px rgba(0,0,0,.5);
  cursor: pointer;
}

</style>
