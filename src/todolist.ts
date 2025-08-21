// defining $ as document for less codse as you might know
const $ = document;
const todoForm = $.querySelector("#form") as HTMLFormElement;
const todoNameinput = $.querySelector("#todoNameInput") as HTMLInputElement;
const closeTodoBtn = $.querySelector("#cancelBtn") as HTMLButtonElement;
const openTodoBtn = $.querySelector("#openBtn") as HTMLButtonElement;
// use whenever we didn't have task
const noTaskContainer = $.querySelector("#noTask") as HTMLDivElement;

const addTaskBtn = $.querySelector("#addTaskBtn") as HTMLButtonElement;
const todoWrapper = $.querySelector("#todoContainer") as HTMLDivElement;

let todosArray: Todo[] = [];
/*

*/

// // تاریخ مقصد
// const targetDate = new Date("2025-08-23");

// // تاریخ امروز
// const today = new Date();

// // اختلاف زمان بر حسب میلی‌ثانیه
// const diffTime = targetDate.getTime() - today.getTime();

// // اختلاف روز
// const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

// console.log(`تا ${targetDate.toDateString()} ${diffDays} روز مونده`);

interface Todo {
  title: string;
  category: string;
  priority: string;
  date: string;
  description?: string;
}

function showingForm(): void {
  todoForm.classList.add("active");
  console.log("logged");
}
function closingForm(event: Event): void {
  event.preventDefault();
  todoNameinput.value = "" as string;
  todoForm.classList.remove("active");
}
function addTodo(event: Event) {
  const category = $.querySelector("#category") as HTMLSelectElement;
  const priority = $.querySelector("#priority") as HTMLSelectElement;
  const date = $.querySelector("#date") as HTMLInputElement;
  const description = $.querySelector("#description") as HTMLTextAreaElement;

  event.preventDefault();
  const todo: Todo = {
    title: todoNameinput.value,
    category: category.value,
    date: date.value ? date.value : new Date().toLocaleDateString("en-CA"),
    priority: priority.value,
    description: description.value,
  };
  todosArray.push(todo);
  appendTodo();
}
function appendTodo() {
  let taskComponent: string = `` as string;
  todoWrapper.innerHTML = "";
  todosArray.forEach((item: Todo) => {
    taskComponent += `<div
            class="bg-subInput border bordesr-black-border rounded-default min-w-[74rem] px-[7rem] py-[3rem] my-9"
          >
            <div class="flex items-center justify-between">
              <div class="flex gap-[7px] items-center">
                <label
                  class="relative inline-block pl-9 mb-1 cursor-pointer text-base select-none mt-[-1.2rem] -ml-12"
                >
                  <input
                    type="checkbox"
                    checked
                    class="peer absolute opacity-0 h-0 w-0 cursor-pointer"
                  />
                  <span
                    class="absolute top-0 left-0 h-6 w-6 bg-gray-200 rounded transition-all duration-300 shadow-md peer-checked:bg-lightColor peer-checked:shadow-lg peer-checked:shadow-secbg-lightColor after:content-[''] after:absolute after:left-2 after:top-0.5 after:w-2 after:h-3.5 after:border-white after:border-r-2 after:border-b-2 after:rotate-45 after:opacity-0 after:transition-opacity peer-checked:after:opacity-100"
                  >
                  </span>
                </label>
                <h3 class="font-bold text-3xl">${item.title}</h3>
              </div>
              <button
                class="rounded-default bg-red-400 py-3 px-6 cursor-pointer text-white transition-colors hover:bg-red-700 border border-black-border"
              >
                Delete
              </button>
            </div>
            <p class="my-3">
             ${item.description}
            </p>
            <div class="flex items-center gap-10">
              <div class="flex items-center gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-tag w-4 h-4 text-gray-400"
                >
                  <path
                    d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"
                  ></path>
                  <circle
                    cx="7.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </svg>
                <span>${item.category}</span>
              </div>
              <div class="flex items-center gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-flag w-3 h-3"
                >
                  <path
                    d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"
                  ></path>
                  <line x1="4" x2="4" y1="22" y2="15"></line>
                </svg>
                <span>${item.priority}</span>
              </div>
              <div class="flex items-center gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-calendar w-4 h-4"
                >
                  <path d="M8 2v4"></path>
                  <path d="M16 2v4"></path>
                  <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                  <path d="M3 10h18"></path>
                </svg>
                <span>${item.date}</span>
              </div>
            </div>
          </div>
`;
  });
  todoWrapper.insertAdjacentHTML("beforeend", taskComponent);
}

todoNameinput.addEventListener("click", showingForm);
openTodoBtn.addEventListener("click", closingForm);
closeTodoBtn.addEventListener("click", (event) => closingForm(event));
addTaskBtn.addEventListener("click", (event) => addTodo(event));
