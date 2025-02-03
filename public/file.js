const insertButton = document.getElementById("invia"); // definizione di variabili DOM, tra cui un bottone che chiamiamo "insertButton"
const todoInput = document.getElementById("activity");
const lista = document.getElementById("lista");

let todos = []; // lista dei task

const render = (todos, lista) => {
   lista.innerHTML="";
   lista.innerHTML=todos.map((line)=>`<li>${line}</li>`).join("");
}

const send = (todo) => {

    return new Promise((resolve, reject) => {
       fetch("/todo/add", {
          method: 'POST',
 
          headers: {
 
             "Content-Type": "application/json"
 
          },
          body: JSON.stringify(todo)
       })
       .then((response) => response.json())
       .then((json) => {
          resolve(json); // risposta del server all'aggiunta
       })
    })
 
}
 
const load = () => {
 
    return new Promise((resolve, reject) => {
        fetch("/todo")
        .then((response) => response.json())
        .then((json) => {
            resolve(json); // risposta del server con la lista
       })
    })
 
}



insertButton.onclick = () => {

    const todo = todoInput.value;
 
    send({todo: todo}) // 1. invia la nuova Todo
        .then(() => load()) // 2. caricala nuova lista
        .then((json) => { 
        todos = json.todos;
        todoInput.value = "";
        render(todos,lista);  // 3. render della nuova lista
    });
 
}



load().then((json) => {
    todos = json.todos;
    render(todos,lista);
 });



 setInterval(() => {

    load().then((json) => {
 
       todos = json.todos;
 
       todoInput.value = "";
 
       render(todos,lista);
 
    });
 
 }, 30000);