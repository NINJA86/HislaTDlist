// defining $ as document for less codse as you might know
const $ = document;
const todoForm = $.querySelector("#form") as HTMLFormElement;
const todoNameinput = $.querySelector("#todoNameInput") as HTMLInputElement;
const closeTodoBtn = $.querySelector("#cancelBtn") as HTMLButtonElement;
const openTodoBtn = $.querySelector("#openBtn") as HTMLButtonElement;
// use whenever we didn't have task
const noTaskContainer = $.querySelector("#noTask") as HTMLDivElement;

const addTaskBtn = $.querySelector("#addTaskBtn") as HTMLButtonElement;

let taskComponent: string = `` as string;

function showingForm(): void {
  todoForm.classList.add("active");
  console.log("logged");
}
function closingForm(event: Event): void {
  event.preventDefault();
  todoNameinput.value = "" as string;
  todoForm.classList.remove("active");
}
function addTodo(event: Event) {}
todoNameinput.addEventListener("click", showingForm);
openTodoBtn.addEventListener("click", closingForm);
closeTodoBtn.addEventListener("click", (event) => closingForm(event));
addTaskBtn.addEventListener("click", (event) => addTodo(event));
