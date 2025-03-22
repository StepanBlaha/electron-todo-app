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
            document.getElementById('info').innerText = "Task Added Successfully!";
        } else {
            document.getElementById('info').innerText = "Failed to add task.";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById('info').innerText = "Server error.";
    }
    const posts =getTodos();
    //Get the result from the promise
    posts.then(result => {
        console.log(result);
        loadTasks(result);
    })
}

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
            document.getElementById('info').innerText = "Tasks fetched successfully!";
            return posts;
        } else {
            document.getElementById('info').innerText = "Failed to fetch tasks.";
            return "error";
        }
    }
    catch(error){
        console.error("Error:", error);
    }
}

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
            document.getElementById('info').innerText = "Task updated Successfully!";
            return result;
        } else {
            document.getElementById('info').innerText = "Failed to update task.";
            return result;
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById('info').innerText = "Server error.";
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
            document.getElementById('info').innerText = "Task deleted Successfully!";
            return result;
        } else {
            document.getElementById('info').innerText = "Failed to delete task.";
            return result;
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById('info').innerText = "Server error.";
    }
}