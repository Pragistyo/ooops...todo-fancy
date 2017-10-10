<template>
  <div id="app">
    <div id="imgvue">
      <img src="./assets/logo.png" width="10%">
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
// (function (d, s, id) {
//   var js
//   var fjs = d.getElementsByTagName(s)[0]
//   if (d.getElementById(id)) return
//   js = d.createElement(s); js.id = id
//   // js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10&appId=119308148780939";
//   js.src = '//connect.facebook.net/en_US/sdk.js'
//   fjs.parentNode.insertBefore(js, fjs)
// }(document, 'script', 'facebook-jssdk'))
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
}
</style>
