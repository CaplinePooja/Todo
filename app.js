const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

let allTodos=getTodos();
updateTodoList();

todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    addTodo();
})

function addTodo(){
    const todoText =todoInput.value.trim();
    if(todoText.length > 0){
        const todoObject = {
            text: todoText,
            completed:  false
        }
        allTodos.push(todoObject);
        updateTodoList();
        saveTodo();
        todoInput.value = "";

    }
}
function updateTodoList(){
    todoListUL.innerHTML="";
    allTodos.forEach((todo,todoIndex)=>{
        todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
    })
}
function createTodoItem(todo, todoIndex){
    const todoId = "todo-" + todoIndex;
    const todoLI  = document.createElement("li");
    const todoText =todo.text;
    todoLI.className = "todo";
    todoLI.innerHTML = `
                <input type="checkbox" id="${todoId}" ${todo.completed ? "checked" : ""}>
                <label class="custom-checkbox" for="${todoId}">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                    </svg>
                      
                </label>
                <label for="${todoId}" class="todo-text">
                    ${todoText}
                </label>
                <button class="delete-button">
                    <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T520-120h-240"  />
                    </svg>
                </button>
                `;

    const deleteButton = todoLI.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
        deleteTodoItem(todoIndex);
    })
    const checkbox = todoLI.querySelector(`input[type="checkbox"]`);
    checkbox.addEventListener("change",()=>{
        allTodos[todoIndex].completed = checkbox.Checked;
        saveTodo();
    })
    checkbox.checked = todo.completed;
    return todoLI;

}
function deleteTodoItem(todoIndex){
    allTodos = allTodos.filter((_, i) =>i !== todoIndex);
    saveTodo();
    updateTodoList();
}
function saveTodo(){
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJson);
}
function getTodos(){
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}