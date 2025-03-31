
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

        const lastId = todoRecords[todoRecords.length - 1] ? todoRecords[todoRecords.length - 1].id : 0;
        const newId = lastId + 1;
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


