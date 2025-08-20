// defining $ as document for less codse as you might know
const $ = document;
const todoForm = $.querySelector("#form") as HTMLFormElement;
const todoNameinput = $.querySelector("#todoNameInput") as HTMLInputElement;
const closeTodoBtn = $.querySelector("#cancelBtn") as HTMLButtonElement;

function showingForm(): void {
  todoForm.classList.add("active");
  console.log("logged");
}
function closingForm(): void {
  todoForm.classList.remove("active");
}

todoNameinput.addEventListener("click", showingForm);
closeTodoBtn.addEventListener("click", closingForm);
