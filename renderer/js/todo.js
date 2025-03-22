document.addEventListener('DOMContentLoaded', function() {
    addEventListeners();
    getTodos();
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










