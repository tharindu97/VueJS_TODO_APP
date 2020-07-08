const express = require('express');
const app = express();
const connectDB = require('./database/db');
//Models
require('./model/todos');
// body paser wenuwat && data add middleware
app.use(express.json());

const getTodos = require('./router/TodoApp/GetTodos');
const getTodo = require('./router/TodoApp/GetTodo');
const saveTodo = require('./router/TodoApp/SaveTodo');
const deleteTodo = require('./router/TodoApp/DeleteTodos');
const editTodo = require('./router/TodoApp/EditTodos');

//Connect mongodb
connectDB();
// create port
const PORT = process.env.PORT || 5100
app.listen(PORT, () =>{
    console.log(`Server Started at ${PORT}`);
});

//Http Request
app.use(getTodo);
app.use(getTodos);
app.use(saveTodo);
app.use(deleteTodo);
app.use(editTodo);