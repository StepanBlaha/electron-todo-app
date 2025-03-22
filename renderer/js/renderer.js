async function addTodo() {
    //Get the task name from the input field
    const todoName = document.getElementById('addTaskInput').value;
    if (!todoName) {
        alert("Enter a task first!");
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
        console.log(posts)
        if (result.success) {
            document.getElementById('info').innerText = "Tasks fetched successfully!";
        } else {
            document.getElementById('info').innerText = "Failed to fetch tasks.";
        }
    }
    catch(error){
        console.error("Error:", error);
    }
}