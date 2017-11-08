<template>
  <div id="app">
    <div id="imgvue">
      <img src="./assets/logo.png">
    </div>
    <router-view ></router-view>
    <footer class="footer">
        <h3 class="text-center">@copyright: pragistyo.github.io</h3>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, 'sans-serif';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /*color: 	limegreen;*/
  /*margin-top: 60px;*/
}
#imgvue {
  text-align: center;
}
body {
  /*background: linear-gradient(-45deg,#23A6D5, #23D5AB);*/
  background-image: url("/static/1.jpg");
  /* background-image: url("/static/canvas1.jpg"); */
  /* background-image: url("/static/Canvas.jpg"); */
  width: 100%;
  height:100%;
}
footer {
  color: silver;
  font-family: gruppo;
  background: darkslategray;
  padding-block-end: 1px;
  opacity: .8;
  height:100%;
  width: 100%;
}

</style>
