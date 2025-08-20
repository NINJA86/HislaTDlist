// defining $ as document for less codse as you might know
const $ = document;
const todoForm = $.querySelector("#form") as HTMLFormElement;
const todoNameinput = $.querySelector("#todoNameInput") as HTMLInputElement;
const closeTodoBtn = $.querySelector("#cancelBtn") as HTMLButtonElement;
const openTodoBtn = $.querySelector("#openBtn") as HTMLButtonElement;

function showingForm(): void {
  todoForm.classList.add("active");
  console.log("logged");
}
function closingForm(event: Event): void {
  event.preventDefault();
  todoNameinput.value = "" as string;
  todoForm.classList.remove("active");
}

todoNameinput.addEventListener("click", showingForm);
openTodoBtn.addEventListener("click", closingForm);
closeTodoBtn.addEventListener("click", (event) => closingForm(event));
