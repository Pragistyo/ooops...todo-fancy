<template>
  <div class="hello">
    <div class="text-center">
    <h1><strong>{{ msg }}</strong></h1>
    <!-- FB DATA AREA -->
      <img :src="profpic" class="img-responsive img-circle center-block" alt="">
      <legend v-if="isLogin" style="color:silver; font-family: Comic Sans MS"><h1>Welcome : {{username}}</h1></legend>
      <!-- FACEBOOK LOGIN AREA -->

      <button v-if="isLogin" v-on:click="logoutfb()" class="btn btn-info">logout</button><br>
      <!-- <div id="fb-root"> -->
      <div v-if="!isLogin" class="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false"></div><br>
      <!-- </div> -->
    </div>

    <Todo/>


    <!-- TO DO AREA -->

  </div>
</template>


<script>
import axios from 'axios'
import Todo from '@/components/Todo'
// import FB from 'fb'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Vue.js Todo App',
      username: null,
      profpic: null,
      isLogin: false
    }
  },
  components: {
    Todo
  },
  mounted: function () {
    // FB SDK
    (function (d, s, id) {
      var js
      var fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      js = d.createElement(s); js.id = id
      // js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10&appId=119308148780939";
      js.src = '//connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
    // FB init
    var self = this
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '119308148780939', // id fbApp
        cookie: true,  // enable cookies to allow the server to access
                            // the session
        xfbml: true,  // parse social plugins on this page
        version: 'v2.8' // use graph api version 2.8
      })
      window.FB.getLoginStatus(function (response) {
        self.statusChangeCallback(response)
      })
    }
  },
  methods: {
    statusChangeCallback (response) {
      console.log('statusChangeCallback')
      console.log(response)
      if (response.status === 'connected') {
        localStorage.setItem('fb_access_token', response.authResponse.accessToken)
        // location.reload()
        this.testAPI()
      } else {
        document.getElementById('status').innerHTML = 'Please log in'
      }
    },
    testAPI () {
      var self = this
      console.log('Welcome!  Fetching your information.... ')
      axios.get('http://localhost:3000/login/fb', {
        headers: {fb_access_token: localStorage.getItem('fb_access_token')}
      })
        .then(response => {
          alert('sukses login')
          self.isLogin = true
          console.log('data dari server', response.data)
          this.profpic = response.data.picture.data.url
          this.username = response.data.name
          localStorage.setItem('userId', response.data.id)
          console.log('=== ', response.data.picture.data.url)
        })
        .catch(err => {
          console.log(err)
        })
    },
    logoutfb () {
      var self = this
      window.FB.logout(function (response) {
        localStorage.clear()
        self.isLogin = false
        location.reload()
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

body {
  background-image: url("/static/1.jpg");
}

h1, h2 {
  font-size:20px;
  font-weight: normal;
}

.text-center {
  font-weight: normal;
  /*font-family: sans-serif;
  text-align: center;*/
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
