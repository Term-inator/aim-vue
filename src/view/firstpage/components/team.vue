<template>
  <div class="team">
    <div class="create">
      <p>你创建的小组</p>
      <ul>
        <li>小组</li>
        <li>小组</li>
      </ul>
    </div>
    <div class="join">
      <p>你加入的小组</p>
      <ul>
        <li>小组</li>
        <li>小组</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "team",
  data() {
    return {
      create: [
        
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
  width: 35%;
  height: 100vh;
  margin: 8.2vh 0 0 0;
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
  height: 7vh;
  font-size: 3.5vh;
  font-weight: bold;
}

.team .create li, .team .join li {
  height: 5.5vh;
  padding: 0.5vh 0 0 1vw;
  font-size: 2.8vh;
  border-top: 0.5px solid white;
  box-shadow: 0 1px 2px rgba(0,0,0,.5);
}


</style>
