import './style.css'

interface Todo {
  title: string,
  isCompleted: boolean,
  readonly id: string
}

const todos: Todo[] = [];

const todosContainer = document.querySelector(".todoContainer") as HTMLDivElement;

const todoInput = document.getElementsByName("titl")[0] as HTMLInputElement;

const myForm = document.getElementById("myForm") as HTMLFormElement;


// console.log(todoInput)
myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const todo: Todo = {
    // title: "",
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.random() * 1000),
  };

  todos.push(todo);
  todoInput.value = "";
  // console.log(todos);
  renderTodo(todos);

}


const generateTodoItem = (title: string, isCompleted: boolean, id: string) => {

  const todo = document.createElement("div");

  todo.className = "todo";

  // creating a checkbox
  const checkBox: HTMLInputElement = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "isCompleted";
  checkBox.checked = isCompleted;
  checkBox.onchange = () => {
    todos.find(item => {
      if (item.id === id) item.isCompleted = checkBox.checked;
    })
    para.className = checkBox.checked ? "textCut" : "";
  };


  // Creating p for title 
  const para: HTMLParagraphElement = document.createElement("p");
  para.innerText = title;
  para.className = isCompleted ? "textCut" : "";

  //creating Delete button
  const btn: HTMLButtonElement = document.createElement("button");
  btn.innerText = "X";
  btn.className = "deleteBtn";
  btn.onclick = () => {
    deleteTodo(id);
  }

  // appending all to todo item 
  todo.append(checkBox, para, btn);
  todosContainer.append(todo);

};

const deleteTodo = (id: string) => {
  const idx = todos.findIndex(item => item.id === id);

  todos.splice(idx, 1);
  renderTodo(todos);
}

const renderTodo = (todos: Todo[]) => {
  todosContainer.innerHTML = "";
  todos.forEach(item => {
    generateTodoItem(item.title, item.isCompleted, item.id);
  })
}
