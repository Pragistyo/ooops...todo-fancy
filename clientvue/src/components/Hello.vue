<template>
  <div class="hello">
    <div class="text-center">
      <legend></legend>
      <h1 style="color:dimgrey"><strong>{{ msg }}</strong></h1>
    <!-- FB DATA AREA -->
      <!-- <img :src="profpic" class="img-responsive img-circle center-block" alt=""> -->
      <!-- <legend v-if="isLogin" style="color:silver; font-family: Comic Sans MS"><h2>Welcome : {{username}}</h2></legend> -->
      <!-- FACEBOOK LOGIN AREA -->
      <!-- <button v-if="isLogin" v-on:click="logoutfb()" class="btn btn-info">logout</button><br> -->
      <!-- <div id="fb-root"> -->
      <button v-if="!isLogin" v-on:click="loginfb()" class="btn btn-default" style="font-size:24px;font-family:gruppo">Continue with Facebook</button>
    </div>
    <h2 v-if="!isLogin" class="text-center" style="color:dimgray">To Continue please login </h2>
    <legend></legend>
    <Todo 
      v-if="isLogin" 
      :login="isLogin"  
      :username="username" 
      @clicked="emitGet" 
      :userid="userid">
    </Todo>
    <Demo></Demo>
  </div>
</template>


<script>
import axios from 'axios'
import swal from 'sweetalert'
import Demo from '@/components/DemoTodo'
import Todo from '@/components/Todo'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Vue.js Todo App',
      userid: null,
      username: null,
      profpic: null,
      isLogin: false
    }
  },
  components: {
    Todo,
    Demo
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
    // var self = this
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '119308148780939', // id fbApp
        cookie: true,  // enable cookies to allow the server to access
                            // the session
        xfbml: true,  // parse social plugins on this page
        version: 'v2.8' // use graph api version 2.8
      })
    }
  },
  methods: {
    statusChangeCallback (response) {
      console.log('statusChangeCallback')
      console.log(response)
      if (response.status === 'connected') {
        localStorage.setItem('fb_access_token', response.authResponse.accessToken)
        this.testAPI()
      } else {
        document.getElementById('status').innerHTML = 'Please log in'
      }
    },
    loginfb () {
      window.FB.login(response => {
        console.log('statusChangeCallback')
        console.log(response)
        if (response.status === 'connected') {
          localStorage.setItem('fb_access_token', response.authResponse.accessToken)
          this.testAPI()
        } else {
          swal('Please login', '', 'error')
        }
      }, {scope: 'email, public_profile', return_scopes: true})
    },
    testAPI () {
      console.log('Welcome!  Fetching your information.... ')
      axios.get('http://35.197.157.222/login/fb', {
      // axios.get('http://localhost:3000/login/fb', {
        headers: {fb_access_token: localStorage.getItem('fb_access_token')}
      })
        .then(response => {
          // console.log('=======', response)
          // alert(JSON.stringify(response))
          localStorage.setItem('token', response.data.thisToken)
          this.username = response.data.dataFB.username
          if (response.data.dataFB.username) {
            this.isLogin = true
            swal(this.username + ' Welcome !', '', 'success')
            this.$router.push('/todo')
          }
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
        this.$router.push('/')
        alert(this.username)
      })
    },
    emitGet (value) {
      alert(value)
      console.log(value)
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
  /* color: MediumSeaGreen   ; */
  font-weight: normal;
  text-shadow: 2px 1px 7px black;
}

.text-center {
  font-weight: normal;
  font-family: sans-serif;
  text-align: center;
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

