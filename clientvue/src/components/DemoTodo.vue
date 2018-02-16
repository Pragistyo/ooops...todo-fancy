<template lang="html">

    <div class="container">
      <div class="row">
      <div class="col-md-8 col-md-offset-2">
      <form class="form-horizontal">
        <fieldset>
          
        <!-- LIST TODO -->
          <div class="form-group">
            <div class="text-center">
              <br>
              <h1 class="demotext">Demo Todo</h1>
              <legend>
                <label class="control-label" style="color:silver; font-family: Comic Sans MS;">
                      <h2>Your List</h2>
                </label>
              </legend>
            </div>
            <div class="col-xs-12">
            <div v-if="todo.length === 0 ">
                <h1 class="todoText"><strong>You don't Have any List to do yet</strong></h1>
            </div>
              <div class="" v-for="(item,index) in todo">
                <!-- <label> -->
                    <div :class="{linethrough: item.complete, todoText: true, row:true}">
                        <div class="col-xs-1">
                            <input type="checkbox" class="my_checkbox" @change="updateTodo(index)" style="text-center">
                        </div>
                        <div :class="{linethrough: item.complete, 'col-xs-4': true}">
                            {{item.description}}
                        </div>
                        <div :class="{linethrough: item.complete, 'col-xs-3':true, calender:true}">
                            <i class="fa fa-calendar"></i>
                            {{item.date}}
                        </div>
                        <div class="col-xs-2">
                            <span :class="item.categories" disabled="disabled">
                                <p :class="{linethrough: item.complete}" style="color:silver">
                                {{item.categories}}
                                </p>
                            </span>
                        </div>
                        <div class="col-xs-2">
                            <button type="submit" class="btn btn-danger btn-lg" @click="deleteTodo(index)">
                                <i class="fa fa-trash-o icon"></i>
                                delete
                            </button>
                        </div>
                    </div>
                <!-- </label> -->
                <p></p>
              </div>
            </div>
          </div>

          <div class="text-center">
              <legend><label class="control-label" style="color:silver; font-family: Comic Sans MS"><h2>Add Todo</h2></label></legend>
          </div>
          <div class="container-fluid bg-3">

            <div class="form-group">
                <label 
                for="inputDescription" 
                class="col-lg-2 control-label" 
                style="color:silver; font-size:30px; padding-bottom:0px; font-family:gruppo;"
                >DESCRIPTION</label><br>
                <div class="col-lg-12">
                    <input 
                    type="text" 
                    class="form-control input-lg" 
                    id="inputDescription" 
                    placeholder="What do you want to do?"
                    style="border-radius:15px"
                    v-model="description" >
                </div>
            </div>


        <div class="row">
            <!-- CATEGORY -->
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
                style="border-radius:15px;">
                    <!-- <option value="audi" selected>Audi</option> -->
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
                <div class="col-sm-12">
                    <label 
                    for="tanggal" 
                    class="col-sm-12 control-label"
                    style="color:silver; font-size:30px; font-family:gruppo;" >
                    DUEDATE
                    </label>
                </div>
                <div class="col-sm-12">
                    <input 
                    type="date" 
                    id="tanggal" 
                    v-model="date"
                    class="form-control somethingDueDate"
                    style="border-radius:15px; font-size:26px; font-family:gruppo;">
                </div>
            </div>
        </div>

            <!-- BUTTON -->
            <div class="form-group">
                <div class="text-center">
                <button type="reset" class="btn btn-success btn-lg" v-on:click="addNew()">
                    <i class="fa fa-plus icon"></i>
                    ADD
                </button>
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
// import axios from 'axios'
import swal from 'sweetalert'
export default {
  props: ['login', 'userid', 'username'],
  data () {
    return {
      ogi: 'hahahah',
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
  watch: {
    login: function (newQuestion) {
    }
  },
  mounted: function () {
  },
  methods: {
    getData () {
    },
    addNew () {
      var self = this
      if (self.description === null || self.category === null || self.date === null) {
        swal('Please fill of all your todo data', '', 'warning')
      } else {
        swal.close()
        self.todo.push({
          description: self.description,
          categories: self.category,
          date: self.date,
          complete: false
        })
        swal('Please Login to save your todo list !!', 'This is only demo', 'warning')
        this.clearData()
      }
    },
    clearData () {
      this.description = null
      this.category = null
      this.date = null
    },
    updateTodo (index) {
      this.todo[index].complete = !this.todo[index].complete
      swal('Your todo updated', '', 'success')
    },
    deleteTodo (index) {
      this.todo.splice(index, 1)
    },
    onClickButton (event) {
      this.$emit('clicked', 'ogitampan')
    },
    bla () {
      swal('hahahahha')
    }
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
}

.Work { 
    background: #8e44ad; 
    border: none;
    color: white;
    padding: 4px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 24px;
}

.School { 
    background: #f39c12; 
    border: none;
    color: white;
    padding: 4px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 24px;
}

.Cleaning { 
    background: #16a085; 
    border: none;
    color: white;
    padding: 4px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 24px;
}

.Other { 
    background: #d35400; 
    border: none;
    color: white;
    padding: 4px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 24px;
    font-weight: 500;
}
.fa-calendar {
  margin-right: 10px;
  font-size: 16px;
}

.form-gorup {
  opacity:0.5;
}
.demotext {
    /* background: teal; */
    color:white  ;
    text-shadow: 2px 1px 7px black;
    font-family: Comic Sans MS;
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
@media (min-width: 700px) {
  .somethingDueDate {
      text-align: right;
      float: right;
  }
}
</style>
