<template>
  <div class="hello">
        <div id="todo-list-example" class="container my-5">
            <div class="row">
                <div class="col-md-6 mx-auto">
                    <h1 class="text-center">TODO APP</h1>
                    <form v-on:submit.prevent = "addNewTask">
                        <label for="tasknameinput">Task Name</label>
                        <input v-model="taskname" type="text" id="tasknameinput" class="form-control" placeholder="Add The Task Here">
                        <button v-if="this.isEdit == false" type="submit" class="btn btn-success btn-block mt-3">
                            Submit
                        </button>
                        <button v-else v-on:click="updateTask()" type="button" class="btn btn-primary btn-block mt-3">
                            Update
                        </button>
                    </form>

                    <table class="table">
                        <tr v-for="(todo) in todos"
                         v-bind:key="todo._id"
                         v-bind:title="todo.title">

                         <td class="text-left">{{todo.title}}</td>
                         <td class="text-right">
                           <button class="btn btn-info" v-on:click="editTask(todo.title, todo._id)">Edit</button>
                           <button class="btn btn-danger" v-on:click="deleteTask(todo._id)">Delete</button>
                         </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
  data () {
      return {
          todos:[],
          id: '',
          taskname: '',
          isEdit: false
      }
  },
  mounted () {
      this.getTasks()
  },
  methods: {
      getTasks() {

          axios.get('/api').then(
              result => {
                  console.log(result.data)
                  this.todos = result.data
              },
              error => {
                  console.error(error)
              }
              
          )

      },
      addNewTask() {
          axios.post('/api/save', { title: this.taskname })
          .then((res)=>{
              this.taskname = ''
              this.getTasks()
          }).catch((err) => {
              console.log(err)
          })
      },

      editTask(name, id) {
          this.id = id
          this.taskname = name
          this.isEdit =true
      },

      updateTask() {
          axios.put(`/api/edit/${this.id}`,
           {title: this.taskname})
           .then((res) => {
               this.taskname = ''
               this.isEdit = false
               this.getTasks()
               console.log(res)
           })
           .catch((err) => {
               console.log(err)
           })
      },

      deleteTask(id) {
          axios.delete(`/api/delete/${id}`)
          .then((res) =>{
              this.taskname = ''
              this.getTasks()
              console.log(res)
          })
          .catch((err) =>{
              console.log(err)
          })
      }
  }
}

</script>

<style>

</style>
