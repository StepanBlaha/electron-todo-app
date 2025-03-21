import { insertPost } from './../mongo.js';
function addTodo(){
    const todoName = document.getElementById('addTaskInput').value;
    const data = {
        title: todoName,
        state: 'todo',
        date: new Date()
    }
    insertPost(data);
    console.log("ssfsfe")

}


function addEventListeners(){
    document.getElementById('submitTaskButton').addEventListener('click', function(event){
        event.preventDefault();
        addTodo();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    addEventListeners();
});