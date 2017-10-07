<template lang="html">

    <div class="container">
      <div class="row">
      <div class="col-md-8 col-md-offset-2">
      <form class="form-horizontal">
        <fieldset>
          <!-- <legend>Legend</legend> -->
          <div class="form-group">
            <label for="inputDescription" class="col-lg-2 control-label" style="color:teal; font-size:24px; padding-bottom:0px;">DESCRIPTION</label><br>
            <div class="col-lg-12">
              <input type="text" class="form-control" id="inputDescription" placeholder="What do you want to do?" v-model="description">
            </div>
          </div>


          <div class="form-group">
            <label for="kategori" class="col-lg-2 control-label" style="color:teal; font-size:24px">CATEGORY</label>
            <div class="col-lg-12">

              <select v-model="category" id="milih">
                  <option v-for="(categ, index) in categories">{{ categ.name }}</option>
              </select>

            </div>
          </div>

          <!-- DUE DATE -->
          <div class="form-group">
            <label for="tanggal" class="col-lg-1 control-label"style="color:teal; font-size:24px" >Due Date</label>
            <div class="col-lg-12">
              <input type="date" id="tanggal" v-model="date">
            </div>
          </div>

          <!-- BUTTON -->
          <div class="form-group" style="padding-left:14px">
            <div class="text-center">
              <button type="reset" class="btn btn-success" v-on:click="addNew()">
                <i class="fa fa-plus icon"></i>
                Add
              </button>
              <button type="submit" class="btn btn-danger" v-on:click="deleteTodo()">
                <i class="fa fa-trash-o icon"></i>
                delete
              </button>
            </div>
          </div>


          <!-- LIST TODO -->
          <div class="form-group">
            <div class="text-center">
              <legend><label class="control-label" style="color:teal; font-size:24px">Your List</label></legend>
            </div>
            <div class="col-lg-12">
              <div class="radio" v-for="(item,index) in todo">
                <label>
                  <input type="checkbox"  name="optionsRadios" id="optionsRadios1" v-model="complete">
                  <font size="30px">
                     {{item.description}}, CATEGORY : {{item.categories[0]}}
                  </font><br>
                  <div class="text-center" style="size:90px">
                    <i class="fa fa-calendar"></i>
                    {{item.date}}
                  </div>
                </label>
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
  data () {
    return {
      description: null,
      category: null,
      date: null,
      complete: false,
      todo: [],
      categories: [
        {name: 'Personal'},
        {name: 'Work'},
        {name: 'School'},
        {name: 'Other'}
      ]
    }
  },
  mounted: function () {
    this.getData()
  },
  methods: {
    getData () {
      var self = this
      // alert('yuhuuuuuuu', localStorage.userId)
      // console.log('=============' + localStorage.userId)
      axios.get(`http://localhost:3000/todo/${localStorage.userId}`).then(result => {
        self.todo = result.data
        console.log(result.data)
        console.log('=====')
        console.log(result)
      })
    },
    addNew () {
      var self = this
      self.todo.push({
        description: self.description,
        category: self.category,
        date: self.date,
        complete: false,
        userId: localStorage.userId
      })
      console.log('==========', self.todo)
      alert(JSON.stringify(self.todo))
      localStorage.setItem('taskItems', JSON.stringify(self.todo))
      axios.post('http://localhost:3000/todo', {
        description: self.description.toUppercase(),
        categories: self.category,
        date: self.date,
        complete: false,
        userId: localStorage.userId
      })
      .then(result => {
        alert('You add a todo list')
      })
      .catch(err => {
        console.log(err)
        alert('Error adding todo')
      })
    },
    updateTodo () {
    },
    deleteTodo () {
      alert(localStorage.taskItems)
    }
  }
}
</script>

<style lang="css">
.btn {
  align:center;
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
  font-size: 26px;
}
</style>
