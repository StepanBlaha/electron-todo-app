/*
async function addTodo() {
    //Get the task name from the input field
    const todoName = document.getElementById('addTaskInput').value;
    if (!todoName) {
        return;
    }
    try {
        //Get the records
        const todoRecords = JSON.parse(localStorage.getItem('todoRecords')) || [];
        //Format the data
        const newId = todoRecords.length
        todoRecords.push({
            id: newId,
            title: todoName,
            state: 'todo',
            date: new Date()
        });
        //Set the new records to local storage
        localStorage.setItem('todoRecords', JSON.stringify(todoRecords));
        console.log("Task Added Successfully!");
    } catch (error) {
        console.log("Task added successfully.");
    }
    const posts =getTodos();
    //Get the result from the promise
    posts.then(result => {
        console.log(result);
        loadTasks(result);
    })
}

//function for getting todos from the local storage
async function getTodos() {
    try{
        //Run fetch request to get all todos
        const response = JSON.parse(localStorage.getItem('todoRecords')) || [];
        console.log("Tasks fetched successfully!");
        return response;
    }
    catch(error){
        console.error("Error:", error);
    }
}

//Function for updating task
async function updateTodo(postId, postState) {
    try {
        //Get the records
        const response = JSON.parse(localStorage.getItem('todoRecords')) || [];
        //Update the state of the task
        for(let i = 0; i < response.length; i++){
            if(response[i].id == postId){
                response[i].state = postState;
                response[i].date = new Date();
            }
        }
        //Set the new records to local storage
        localStorage.setItem('todoRecords', JSON.stringify(response));
        console.log("Task updated Successfully!");
    } catch (error) {
        console.log("Error updating task.");
    }
}
//Function for deleting task
async function deleteTodo(postId) {
    try {
        //Get the records
        const response = JSON.parse(localStorage.getItem('todoRecords')) || [];
        let newRecords = [];
        //Filter the records to remove the deleted task
        for(let i = 0; i < response.length; i++){
            if(response[i].id != postId){
                newRecords.push(response[i]);
            }
        }
        //Set the new records to local storage
        localStorage.setItem('todoRecords', JSON.stringify(newRecords));
        console.log("Task deleted Successfully!");

    } catch (error) {
        console.log("Error deleting task.");
    }
}


*/
/*

Server version- not yet compatible with the build
*/


async function addTodo() {
    //Get the task name from the input field
    const todoName = document.getElementById('addTaskInput').value;
    if (!todoName) {
        return;
    }
    //Format the data
    const data = {
        title: todoName,
        state: 'todo',
        date: new Date()
    };

    try {
        //Run fetch request to add a todo
        const response = await fetch('http://localhost:3000/add-todo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        //Parse the response
        const result = await response.json();
        if (result.success) {
            console.log("Task Added Successfully!");
        } else {
            console.log("Failed to add task.");
        }
    } catch (error) {
        console.error("Error:", error);
        console.log("Server error.");
    }
    const posts =getTodos();
    //Get the result from the promise
    posts.then(result => {
        console.log(result);
        loadTasks(result);
    })
}

//not used yet
async function addLocalTodo() {
    //Get the task name from the input field
    const todoName = document.getElementById('addTaskInput').value;
    if (!todoName) {
        return;
    }
    //Format the data
    const data = {
        title: todoName,
        state: 'todo',
        date: new Date()
    };
    const filePath = "data.json";



}
async function getLocalTodos(){
    const filePath = "js/data.json";
    fetch(filePath)
    .then(response => response.json())
    .then(data => {
        console.log("Todos:", data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
}
//not used yet

async function getTodos() {
    try{
        //Run fetch request to get all todos
        const response = await fetch('http://localhost:3000/get-todos', {
            method: 'GET'
        });
        //Parse the response
        const result = await response.json();
        const posts = result.posts;

        if (result.success) {
            console.log("Tasks fetched successfully!");
            return posts;
        } else {
            console.log("Failed to fetch tasks.");
            return "error";
        }
    }
    catch(error){
        console.error("Error:", error);
    }
}
window.getTodos = getTodos;

async function updateTodo(postId, postState) {
    data = {
        postID: postId,
        newPost: {
            state: postState,
            date: new Date(),
        }
    }

    try {
        //Run fetch request to add a todo
        const response = await fetch('http://localhost:3000/update-todo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        //Parse the response
        const result = await response.json();
        console.log("rend".result);
        if (result.success) {
            console.log("Task updated Successfully!");
            return result;
        } else {
            console.log("Failed to update task.");
            return result;
        }
    } catch (error) {
        console.error("Error:", error);
        console.log("Server error.");
    }
}
async function deleteTodo(postId) {
    data = {
        postID: postId,
    }

    try {
        //Run fetch request to add a todo
        const response = await fetch('http://localhost:3000/delete-todo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        //Parse the response
        const result = await response.json();
        console.log("rend".result);
        if (result.success) {
            console.log("Task deleted Successfully!");
            return result;
        } else {
            console.log("Failed to delete task.");
            return result;
        }
    } catch (error) {
        console.error("Error:", error);
        console.log("Server error.");
    }
}
 