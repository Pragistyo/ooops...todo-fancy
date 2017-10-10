<template lang="html">


    <div class="container">
      <div class="row">
      <div class="col-md-8 col-md-offset-2">
      <form class="form-horizontal">
        <fieldset>
          <img :src="profpic" class="img-responsive img-circle center-block" alt=""><br>
          <button href="#" class="fb-login-button  center-block" @click="logoutfb()" name="button">logout</button>
          <legend style="color:silver; font-family: Comic Sans MS" class="text-center"><h2>Welcome : {{username}}</h2></legend>
          <p> BLABLA</p>
          <!-- <legend>Legend</legend> -->
          <!-- <button type="button" name="button" @click="test()">test</button> -->
          <div class="form-group">
            <label for="inputDescription" class="col-lg-2 control-label" style="color:silver; font-size:24px; padding-bottom:0px;">DESCRIPTION</label><br>
            <div class="col-lg-12">
              <input type="text" class="form-control" id="inputDescription" placeholder="What do you want to do?" v-model="description" >
            </div>
          </div>


          <div class="form-group">
            <label for="kategori" class="col-lg-2 control-label" style="color:silver; font-size:24px">
              CATEGORY
            </label>
            <div class="col-lg-12">

              <select v-model="category" id="milih" >
                  <option v-for="(categ, index) in categories">{{ categ.name }}</option>
              </select>

            </div>
          </div>

          <!-- DUE DATE -->
          <div class="form-group">
            <label for="tanggal" class="col-lg-2 control-label"style="color:silver; font-size:24px" >
              DUEDATE
            </label>
            <div class="col-lg-12">
              <input type="date" id="tanggal" v-model="date" >
            </div>
          </div>

          <!-- BUTTON -->
          <div class="form-group">
            <div class="text-center">
              <button type="reset" class="btn btn-success" v-on:click="addNew()">
                <i class="fa fa-plus icon"></i>
                Add
              </button>
              <!-- <button type="submit" class="btn btn-danger" v-on:click="deleteTodo()">
                <i class="fa fa-trash-o icon"></i>
                delete
              </button> -->
            </div>
          </div>


          <!-- LIST TODO -->
          <div class="form-group">
            <div class="text-center">
              <legend><label class="control-label" style="color:teal; font-size:24px">Your List</label></legend>
            </div>
            <div class="col-lg-12">
              <div class="radio" v-for="(item,index) in todo">
                <!-- <label> -->
                  <input type="checkbox"  name="optionsRadios" id="optionsRadios1" v-model="item.complete" @change="updateTodo(item._id,item.complete,index)" style="text-center">
                  <div class="" style="color:gold;">
                    <strong>
                    {{item.description}}, CATEGORY : {{item.categories}}
                  <!-- <div class="text-center" style="size:90px"> -->
                    <i class="fa fa-calendar"></i>
                    {{item.date}}
                    <!-- <p>{{item._id}}</p> -->
                  </strong>
                  <button type="submit" class="btn btn-danger" @click="deleteTodo(item._id,index)">
                    <i class="fa fa-trash-o icon"></i>
                    delete
                  </button>
                  <!-- <p>{{login}}</p> -->
                </div>
                  <!-- </div> -->
                <!-- </label> -->
              </div>
            </div>
          </div>

        </fieldset>
      </form>
    </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  props: ['login', 'userid'],
  data () {
    return {
      ogi: 'hahahah',
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
    // whenever question changes, this function will run
    login: function (newQuestion) {
      this.answer = true
      // this.getAnswer()
    }
  },
  mounted: function () {
    // alert(localStorage.username)
    if (!localStorage.getItem('userId')) {
      this.$router.push('/')
    } else {
      this.getData()
      this.profpic = localStorage.profpic
      this.username = localStorage.username
    }
  },
  methods: {
    getData () {
      var self = this
      // alert('===========')
      axios.get(`http://localhost:3000/todo/${localStorage.userId}`).then(result => {
        // alert(JSON.stringify(result.data))
        // localStorage.setItem('taskItems', JSON.stringify(result.data))
        self.todo = result.data
        console.log(result.data)
        console.log('=====')
        console.log('+++++')
        console.log(self.todo)
        console.log(localStorage.taskItems)
      })
      .catch(err => {
        console.log(err)
      })
    },
    addNew () {
      var self = this
      if (self.description === null || self.category === null || self.date === null) {
        alert('Please fill of all your todo data')
      // }
      // else if (!this.login) {
      //   alert('Please login')
      } else {
        // console.log('==========', self.todo)
        // alert(JSON.stringify(self.todo))
        axios.post('http://localhost:3000/todo', {
          description: self.description,
          categories: self.category,
          date: self.date,
          complete: false,
          userId: localStorage.userId
        })
        .then(result => {
          self.todo.push(result.data)
          alert('You add a todo list')
          // alert(JSON.stringify(self.todo[self.todo.length - 1]))
          // self.description = null
          // self.category = null
          // self.date = null
        })
        .catch(err => {
          console.log(err)
          alert('Error adding todo')
        })
      }
    },
    updateTodo (idTodo, status, index) {
      // var self = this
      axios.put(`http://localhost:3000/todo/${idTodo}`, {
        complete: status
      })
      .then(result => {
        // this.todo[index].complete = status
        // alert(idTodo)
        // alert(result)
        // alert(JSON.stringify(self.todo))
        alert('Your todo updated')
      })
    },
    deleteTodo (idTodo, index) {
      // alert(this.login)
      var self = this
      alert(idTodo)
      axios.delete(`http://localhost:3000/todo/${idTodo}`)
      .then(result => {
        self.todo.splice(index, 1)
        alert('Success delete your todo')
      })
      .catch(err => {
        alert('Error delete your todo')
        console.log(err)
      })
    },
    onClickButton (event) {
      this.$emit('clicked', 'ogitampan')
    },
    logoutfb () {
      // alert(this.username)
      var self = this
      // window.FB.logout(function (response) {
      localStorage.clear()
      self.isLogin = false
      this.$router.push('/')
        // location.reload()
      // })
    }
  }
}
</script>

<style lang="css">
.btn {
  align:center;
}

.container {

}

.complete-true {
  text-decoration: line-through;
  color: #bebebe;
}

.category-Personal { background: #2980b9; }

.category-Work { background: #8e44ad; }

.category-School { background: #f39c12; }

.category-Cleaning { background: #16a085; }

.category-Other { background: #d35400; }

.taskList .taskDate {
  color: #95a5a6;
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
  display: block;
  margin-left: 41px;
}

.fa-calendar {
  margin-right: 10px;
  font-size: 24px;
}

.form-gorup {
  opacity:0.5;
}
</style>
