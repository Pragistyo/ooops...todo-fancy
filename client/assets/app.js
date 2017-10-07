//Define angular app
var app = angular.module('TaskManager', []);

//controllers
app.controller('taskController', function($scope) {
  
    $scope.dataTodo = function(){
      axios.get(`http://localhost:3000/todo/${localStorage.userId}`)
      .then(result=>{
        localStorage.setItem('taskItems', JSON.stringify(result.data))
      })
      .catch(err=>{
        alert('ERROR GET DATA USER >> ', err)
      })
    }
    $scope.today = new Date();
    $scope.saved = localStorage.getItem('taskItems');
    $scope.taskItem = (localStorage.getItem('taskItems')!==null) ?
    JSON.parse($scope.saved) : [ {description: "Why not add a task?", date: $scope.today, complete: false}];
    localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));

    $scope.newTask = null;
    $scope.newTaskDate = null;
    $scope.categories = [
        {name: 'Personal'},
        {name: 'Work'},
        {name: 'School'},
        {name: 'Cleaning'},
        {name: 'Other'}
    ];
    $scope.newTaskCategory = $scope.categories;
    $scope.addNew = function () {
        // masukin database
        if ($scope.newTaskDate == null || $scope.newTaskDate == '') {
            $scope.taskItem.push({
                description: $scope.newTask,
                date: "No deadline",
                complete: false,
                category: $scope.newTaskCategory.name,
                userId: localStorage.userId
            })
            axios.post('http://localhost:3000/todo',
            {
              description: $scope.newTask,
              date       : "No deadline",
              complete   : false,
              categories : $scope.newTaskCategory.name,
              userId     : localStorage.userId
            })
            .then(result=>{
              alert('Your task has been added !')
            })
            .catch(err=>{
              alert("Seems we've got an error")
            })
        } else {
            $scope.taskItem.push({
                description: $scope.newTask,
                date: $scope.newTaskDate,
                complete: false,
                category: $scope.newTaskCategory.name,
                userId: localStorage.userId
            })
            axios.post('http://localhost:3000/todo',
            {
              description: $scope.newTask,
              date       : $scope.newTaskDate,
              complete   : false,
              categories : $scope.newTaskCategory.name,
              userId     : localStorage.userId
            })
            .then(result=>{
              alert('Your task has been added !')
            })
            .catch(err=>{
              alert("Seems we've got an error")
            })
        };
        //clear all lagi
        $scope.newTask = '';
        $scope.newTaskDate = '';
        $scope.newTaskCategory = $scope.categories;
        localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));
    };
    $scope.deleteTask = function () {
        var completedTask = $scope.taskItem;
        $scope.taskItem = [];
        angular.forEach(completedTask, function (taskItem) {
            if (!taskItem.complete) {
                $scope.taskItem.push(taskItem);
            }
        });
        localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));
    };

    $scope.save = function () {
      //BIKIN AXIOS UPDATE
        localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));
    }
});
