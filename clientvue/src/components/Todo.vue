<template lang="html">


    <div class="container">
      <div class="row">
      <div class="col-md-8 col-md-offset-2">
      <form class="form-horizontal">
        <fieldset>
          <img :src="profpic" class="img-responsive img-circle center-block profpic" alt="profpic"><br>
          <button  class="btn btn-danger btn-lg  center-block out" @click="logoutfb()" name="button">LOGOUT</button>
          <legend 
            style="color:silver; font-family: Comic Sans MS; width:100%;" 
            class="text-center">
            <h2>
              <strong>
                 Welcome : {{username}}
              </strong>
            </h2>
          </legend>
          
          <!-- LIST TODO -->
          <div class="form-group">
            <div class="text-center">
              <br>
              <legend><label class="control-label" style="color:silver; font-family: Comic Sans MS;"><h2>Your List</h2></label></legend>
            </div>
            <div class="col-xs-12">
              <div v-if="todo.length === 0 ">
                <h1 class="todoText"><strong>You don't Have any List to do yet</strong></h1>
              </div>
              <div class="" v-for="(item,index) in todo" style="margin-left:-20px">
                <!-- <label> -->
                  <div :class="{linethrough: item.complete, todoText: true, row: true}">
                    <!-- <strong> -->
                      <div class="col-xs-1">
                        <input type="checkbox" class="my_checkbox" v-model="item.complete" @change="updateTodo(item._id,item.complete,index)" style="text-center">
                      </div>
                      <div :class="{linethrough: item.complete, 'col-xs-4': true}">
                        {{item.description}}
                      </div>
                      <div :class="{linethrough: item.complete, 'col-xs-3':true, calender:true}">
                        <i class="fa fa-calendar"></i>
                        {{item.date}}
                      </div>
                      <div :class="'col-xs-2'">
                        <span :class="item.categories[0]" disabled="disabled">
                          <p :class="{linethrough: item.complete}">
                            {{item.categories[0]}}
                          </p>
                        </span>
                      </div>
                      <div class="col-xs-2">
                        <button type="button" class="btn btn-danger btn-lg" @click="deleteTodo(item._id,index)">
                          <i class="fa fa-trash-o icon"></i>
                          Delete
                        </button>
                      </div>
                    <!-- </strong> -->
                  </div>
                <p></p>
              </div>
            </div>
          </div>


          <div class="text-center">
              <legend><label class="control-label" style="color:silver; font-family: Comic Sans MS"><h2>Add Todo</h2></label></legend>
          </div>
          <div class="form-group">
            <label 
              for="inputDescription" 
              class="col-md-2 control-label" 
              style="color:silver; font-size:30px; padding-bottom:0px; font-family:gruppo;">
              DESCRIPTION
            </label>
            <br>
            <div class="col-md-12">
              <input 
              type="text" 
              class="form-control" 
              id="inputDescription" 
              placeholder="What do you want to do?"
              style="border-radius:15px"
              v-model="description" >
            </div>
          </div>

          <div class="row">
            <div class="form-group col-sm-6">
              <label 
              for="kategori" 
              class="col-sm-2 control-label" 
              style="color:silver; font-size:30px; font-family:gruppo;">
                CATEGORY
              </label>
              <div class="col-sm-12">

                <select 
                v-model="category"
                class="form-control"
                id="milih" 
                style="border-radius:15px; height: 40px;">
                  <!-- <option value="" selected="">Choose Category</option> -->
                    <option 
                      v-for="(categ, index) in categories" 
                      style="font-size:26px; font-family:gruppo;">
                      {{ categ.name }}
                    </option>
                </select>

              </div>
            </div>

          <!-- DUE DATE -->
            <div class="form-group col-sm-6 somethingDueDate">
              <label 
              for="tanggal" 
              class="col-sm-11 control-label"
              style="color:silver; font-size:30px; font-family:gruppo;">
                DUEDATE
              </label>
              <div class="col-sm-12">
                <input 
                type="date" 
                id="tanggal" 
                v-model="date"
                class="form-control somethingDueDate"
                style="border-radius:15px; height: 40px;font-size:26px; font-family:gruppo;">
              </div>
            </div>
          </div>

          <!-- BUTTON -->
          <div class="form-group">
            <div class="text-center">
              <button type="reset" class="btn btn-success addlist" v-on:click="addNew()">
                <i class="fa fa-plus icon"></i>
                ADD TO LIST
              </button>
            </div>
          </div>


          

        </fieldset>
      </form>
    </div>
    <!-- <button></button> -->
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'
export default {
  props: ['login', 'userid'],
  data () {
    return {
      ogi: 'hahahah',
      userId: null,
      description: null,
      category: null,
      date: null,
      complete: false,
      todo: [],
      profpic: null,
      username: null,
      categories: [
        {name: 'Personal'},
        {name: 'Work'},
        {name: 'School'},
        {name: 'Other'}
      ]
    }
  },
  watch: {
  },
  mounted: function () {
    // this.fbSDK()
    if (!localStorage.getItem('token')) {
      this.$router.push('/')
    } else {
      this.getUser()
      this.getData()
    }
  },
  methods: {
    getUser () {
      axios.get(`http://35.197.157.222/login/verify`, {
        headers: {token: localStorage.token}
      })
      .then(result => {
        this.profpic = result.data.img
        this.username = result.data.username
        this.userId = result.data.userId
      })
    },
    getData () {
      var self = this
      axios.get(`http://35.197.157.222/login/verify`, {
        headers: {token: localStorage.token}
      })
      .then(result => {
        axios.get(`http://35.197.157.222/todo/${result.data.userId}`).then(result => {
          self.todo = result.data
        })
        .catch(err => {
          console.log(err)
        })
      })
    },
    addNew () {
      var self = this
      if (self.description === null || self.category === null || self.date === null) {
        swal('Please fill of all your todo data', '', 'warning')
      } else {
        axios.post('http://35.197.157.222/todo', {
          description: self.description,
          categories: self.category,
          date: self.date,
          complete: false,
          userId: self.userId
        })
        .then(result => {
          // alert(result.data)
          self.todo.push(result.data)
          swal('You add a todo list', '', 'success')
          // alert(JSON.stringify(self.todo[self.todo.length - 1]))
          self.description = null
          self.category = null
          self.date = null
        })
        .catch(err => {
          console.log(err)
          swal('Error adding todo', '', 'error')
        })
      }
    },
    updateTodo (idTodo, status, index) {
      axios.put(`http://35.197.157.222/todo/${idTodo}`, {
        complete: status
      })
      .then(result => {
        swal('Your todo updated', '', 'success')
      })
    },
    deleteTodo (idTodo, index) {
      var self = this
      // alert(idTodo)
      axios.delete(`http://35.197.157.222/todo/${idTodo}`)
      .then(result => {
        self.todo.splice(index, 1)
        swal('Success delete your todo', '', 'success')
      })
      .catch(err => {
        swal('Error delete your todo', '', 'error')
        console.log(err)
      })
    },
    onClickButton (event) {
      this.$emit('clicked', 'ogitampan')
    },
    logoutfb () {
      var self = this
      localStorage.clear()
      self.isLogin = false
      swal('You Logged Out form Application', '', 'info')
      this.$router.push('/')
      // window.FB.logout((response) => {
      //   alert('smth')
      // })
    },
    fbSDK () {
      (function (d, s, id) {
        var js
        var fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) return
        js = d.createElement(s); js.id = id
        // js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10&appId=119308148780939";
        js.src = '//connect.facebook.net/en_US/sdk.js'
        fjs.parentNode.insertBefore(js, fjs)
      }(document, 'script', 'facebook-jssdk'))
      //
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: '119308148780939', // id fbApp
          cookie: true,  // enable cookies to allow the server to access
                              // the session
          xfbml: true,  // parse social plugins on this page
          version: 'v2.8' // use graph api version 2.8
        })
      }
    } // END OF fb SDK
  }
}
</script>

<style lang="css">
.btn {
  align:center;
}

.Personal { 
    background-color: #2980b9; 
    border: none;
    color: white;
    padding: 4px 10px;
    margin-left: -20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 24px;
    width: 120px;
}

.Work { 
    background: #8e44ad; 
    border: none;
    color: white;
    padding: 4px 10px;
    margin-left: -20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 24px;
    width: 120px;
}

.School { 
    background: #f39c12; 
    border: none;
    color: white;
    padding: 4px 10px;
    margin-left: -20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 24px;
    width: 120px;
}

.Cleaning { 
    background: #16a085; 
    border: none;
    color: white;
    padding: 4px 10px;
    margin-left: -20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 24px;
    width: 120px;
}

.Other { 
    background: #d35400; 
    border: none;
    color: white;
    padding: 4px 10px;
    margin-left: -20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 24px;
    font-weight: 500;
    width: 120px;
}
.fa-calendar {
  margin-right: 10px;
  font-size: 16px;
}

.form-gorup {
  opacity:0.5;
}
.demotext {
    color:orange  ;
    text-shadow: 2px 2px 52px black;
}
.linethrough {
  text-decoration: line-through;
  color: #bebebe;
}
.todoText {
  color: mediumseagreen ;
  font-size: 28px;
  font-family: 'gruppo';
  text-shadow: 2px 2px 22px black;
}
.my_checkbox {
    width:30px;
    height:20px;
}
.calender {
    font-size: 26px;
}
.profpic {
  width: 250px;
}
.out {
  box-shadow: 1px 1px 50px black;
}
.addlist {
  box-shadow: 2px 2px 20px black;
}

@media (min-width: 700px) {
  .somethingDueDate {
      text-align: right;
      float: right;
  }
}
</style>
