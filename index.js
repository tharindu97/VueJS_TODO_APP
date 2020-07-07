const express = require('express');
const app = express();
const connectDB = require('./database/db');
//Models
require('./model/todos');
// body paser wenuwat && data add middleware
app.use(express.json());

//Connect mongodb
connectDB();
// create port
const PORT = process.env.PORT || 5100
app.listen(PORT, () =>{
    console.log(`Server Started at ${PORT}`);
});