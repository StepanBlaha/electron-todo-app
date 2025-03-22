

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
    //Get the todo (returns a promise)
    const posts =getTodos();
    //Get the result from the promise
    posts.then(result => {
        console.log(result);
        loadTasks(result);
    }).then(() => {
        checkTask();
    })
}









