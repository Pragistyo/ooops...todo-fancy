(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  // js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10&appId=119308148780939";
  js.src = "//connect.facebook.net/en_US/sdk.js"
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

var app = new Vue({
  el: '#app',
  data:{
      profpic  : null,
      username: null,
      categories      :[],
      newTask         :null,
      newTaskDate     :null,
      isLogin:false
      // newTaskCategory :
  },
  mounted: function(){
    var self = this
    window.fbAsyncInit = function() {
      window.FB = FB;
      FB.init({
        appId      : '119308148780939',  // id twatt
        cookie     : true,  // enable cookies to allow the server to access
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.8' // use graph api version 2.8
      });

      FB.getLoginStatus(function(response) {

        self.statusChangeCallback(response);
      });
    };


  },

  methods:{
      getData(){
        var self = this
      },
      addNew(){
        var self = this

      },
      deleteTask(){
        var self = this

      },

      save(){
        var self = this
      },

      fblogout(){
        alert('ok')
        localStorage.clear()
        window.location.href="index.html"
      },

      statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        if (response.status === 'connected') {
          localStorage.setItem('fb_access_token', response.authResponse.accessToken)
          this.testAPI();
        } else {
          document.getElementById('status').innerHTML = 'Please log in'
        }
      },
      testAPI() {
        console.log('Welcome!  Fetching your information.... ');
        axios.get('http://localhost:3000/login/fb', {
          headers: {fb_access_token: localStorage.getItem('fb_access_token')}
        })
          .then(response => {console.log('data dari server' , response.data)
            this.profpic = response.data.picture.data.url
            this.username= response.data.name
            localStorage.setItem('userId',response.data.id)
            console.log('=== ', typeof response.data.id);
            // axios.post('http://localhost:3000/login')
            // get dulu: foreach semua, cari userId, kalo ga nemu` baru post

          })
          // di dalam response axios ada data selain dari server
          .catch(err => {console.log(err);})
      }
  }

})
