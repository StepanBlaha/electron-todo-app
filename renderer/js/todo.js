

$(document).ready(function(){
    addEventListeners();
   
    taskLoad();



   
});

function addEventListeners() {
    const button = document.getElementById('submitTaskButton');
    if (button) {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            addTodo();
        });
    }
    const timerStartMenu = document.getElementById('timerRun');
    if (timerStartMenu) {
        timerStartMenu.addEventListener('click', function(event) {
            event.preventDefault();
            startTimer();
        });
    }
    const timerStopMenu = document.getElementById('timerStop');
    if (timerStopMenu) {
        timerStopMenu.addEventListener('click', function(event) {
            event.preventDefault();
            stopTimer();
        });
    }
    const timerResetMenu = document.getElementById('timerReset');
    if (timerResetMenu) {
        timerResetMenu.addEventListener('click', function(event) {
            event.preventDefault();
            resetTimer();
        });
    }
}
async function deleteTask() {
     // Use event delegation on #todoContent for habitCheckId
     $("#todoContent").on("click", ".deleteTaskButton", function() {
        // Get the id of the task to delete
        const taskID = $(this).data("id");
        console.log(taskID);
        //Run the delete function
        const result = deleteTodo(taskID);
        //Get the result from the promise
        result.then(result => {
            console.log(result);
        }).then(() => {
            //Reload the tasks
            const posts =getTodos();
            //Get the result from the promise
            posts.then(result => {
                console.log(result);
                loadTasks(result);
            })
        })


        
    });
}


async function checkTask() {
    // Use event delegation on #todoContent for habitCheckId
    $("#todoContent").on("click", ".item", function() {
        // Get the checked state (whether the checkbox is checked or not)
        const taskState = $(this).find('.habitCheckId').is(":checked") ? "todo" : "done";
        // Get the id of the checked task
        const taskID = $(this).find('.habitCheckId').val();
        console.log(taskID);


        console.log("Clicked Task ID:", taskID);
        console.log("Task State:", taskState);
        const result =  updateTodo(taskID, taskState)
        result.then(result => {
            console.log(result);
        }).then(() => {
            const posts =getTodos();
            //Get the result from the promise
            posts.then(result => {
                console.log(result);
                loadTasks(result);
            })
        })
    });
}


function taskLoad(){
    //getLocalTodos();
    //Get the todo (returns a promise)
    const posts =getTodos();
    //Get the result from the promise
    posts.then(result => {
        loadTasks(result);
    }).then(() => {
        checkTask();
        deleteTask();
    })
}













