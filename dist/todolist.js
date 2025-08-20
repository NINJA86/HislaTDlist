// defining $ as document for less codse as you might know
const $ = document;
const todoForm = $.querySelector("#form");
const todoNameinput = $.querySelector("#todoNameInput");
const closeTodoBtn = $.querySelector("#cancelBtn");
const openTodoBtn = $.querySelector("#openBtn");
function showingForm() {
    todoForm.classList.add("active");
    console.log("logged");
}
function closingForm() {
    todoForm.classList.remove("active");
}
todoNameinput.addEventListener("click", showingForm);
openTodoBtn.addEventListener("click", closingForm);
closeTodoBtn.addEventListener("click", closingForm);
//# sourceMappingURL=todolist.js.map