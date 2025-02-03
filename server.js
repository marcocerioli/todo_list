let http = require("http");

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));



app.use("/", express.static(path.join(__dirname, "public")));



const todos = [];

app.post("/todo/add", (req, res) => {

   const todo = req.body.todo;

   todo.id = "" + new Date().getTime();

   todos.push(todo);

   res.json({result: "Ok"});

});



app.get("/todo", (req, res) => {

    res.json({todos: todos});
 
});



const completeTodo = (todo) => {

    return new Promise((resolve, reject) => {
 
       fetch("/todo/complete", {
 
          method: 'PUT',
 
          headers: {
 
             "Content-Type": "application/json"
 
          },
 
          body: JSON.stringify(todo)
 
       })
 
       .then((response) => response.json())
 
       .then((json) => {
 
          resolve(json);
 
       })
 
    })
 
}



app.put("/todo/complete", (req, res) => {

    const todo = req.body;
 
    try {
 
       todos = todos.map((element) => {
 
          if (element.id === todo.id) {
 
             element.completed = true;
 
          }
 
          return element;
 
       })
 
    } catch (e) {
 
       console.log(e);
 
    }
 
    res.json({result: "Ok"});
 
});



const deleteTodo = (id) => {

    return new Promise((resolve, reject) => {
 
       fetch("/todo/"+id, {
 
          method: 'DELETE',
 
          headers: {
 
             "Content-Type": "application/json"
 
          },
 
       })
 
       .then((response) => response.json())
 
       .then((json) => {
 
          resolve(json);
 
       })
 
    })
 
}



app.delete("/todo/:id", (req, res) => {

    todos = todos.filter((element) => element.id !== req.params.id);
 
    res.json({result: "Ok"});  
 
})


 
const server = http.createServer(app);

server.listen(5500, () => {

  console.log("- server running");

});