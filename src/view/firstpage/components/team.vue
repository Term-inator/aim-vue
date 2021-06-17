<template>
  <div class="team">
    <div class="create">
      <p>你创建的小组</p>
      <img src="@/assets/img/firstpage/add.svg" alt="" class="create-team"/>
      <div>
        <ul>
          <li v-for="(item, index) in create" :key="index">{{ item.teamName }}</li>
        </ul>
      </div>
    </div>
    <div class="join">
      <p>你加入的小组</p>
      <img src="@/assets/img/firstpage/add.svg" alt="" class="join-team"/>
      <div>
        <ul>
          <li v-for="(item, index) in join" :key="index">{{ item.teamName }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "team",
  data() {
    return {
      create: [
        {
          teamName: "小组1"
        },
        {
          teamName: "小组2"
        }
      ],
      join: [
        {
          teamName: "小组4"
        },
        {
          teamName: "小组5"
        }
      ]
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

.team {
  position: fixed;
  right: 0;
  width: 25%;
  height: 100vh;
  padding: 9vh 0 0 0;
  border-left: 0.5px solid white;
  box-shadow: 0 2px 5px rgba(0,0,0,.5);
}

.team .create {
  width: 100%;
  height: 35%;
}

.team .join {
  width: 100%;
  height: 65%;
}

.team .create p, .team .join p {
  float: left;
  height: 6vh;
  font-size: 3.5vh;
  font-weight: bold;
}

.team .create .create-team, .team .join .join-team {
  float: right;
  width: 4vh;
  height: 4vh;
  padding: 1vh 0 0 0;
  cursor: pointer;
}

.team .create li, .team .join li {
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
