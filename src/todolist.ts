// defining $ as document for less codse as you might know
const $ = document;
const todoForm = $.querySelector("#form") as HTMLFormElement;
const todoNameinput = $.querySelector("#todoNameInput") as HTMLInputElement;
const closeTodoBtn = $.querySelector("#cancelBtn") as HTMLButtonElement;
const openTodoBtn = $.querySelector("#openBtn") as HTMLButtonElement;
// use whenever we didn't have task
const noTaskContainer = $.querySelector("#noTask") as HTMLDivElement;
const taskContainerTitle = $.querySelector(
  "#taskContainerTitle"
) as HTMLTitleElement;
const addTaskBtn = $.querySelector("#addTaskBtn") as HTMLButtonElement;
const todoWrapper = $.querySelector("#todoContainer") as HTMLDivElement;
const noTaskAvailableContent = $.querySelector("#noTask") as HTMLDivElement;
// inputs
const category = $.querySelector("#category") as HTMLSelectElement;
const priority = $.querySelector("#priority") as HTMLSelectElement;
const date = $.querySelector("#date") as HTMLInputElement;
const description = $.querySelector("#description") as HTMLTextAreaElement;

//  array(todos)
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
  id: number;
  title: string;
  category: string;
  priority: string;
  date: string;
  status: boolean;
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
  clearInput();
}
function addTodo(event: Event): void {
  event.preventDefault();

  if (!todoNameinput.value || todoNameinput.value.length < 3) {
    showToast("Something went wrong!", "error");

    return;
  }
  showToast("Task added successfully!", "success");

  const todo: Todo = {
    id: todosArray.length,
    status: false,
    title: todoNameinput.value,
    category: category.value,
    date: date.value ? date.value : new Date().toLocaleDateString("en-CA"),
    priority: priority.value,
    description: description.value,
  };
  todosArray.push(todo);
  checkHasTodo();
  appendTodo();
  clearInput();
}
function appendTodo(): void {
  let taskComponent: string = ``;
  todoWrapper.innerHTML = "";
  todosArray.forEach((item: Todo) => {
    taskComponent += `
  <div
  class="group bg-subInput border cursor-pointer ${
    !item.status ? "border-red-400" : "border-green-400"
  } rounded-default min-w-[74rem] px-[7rem] py-[3rem] my-9 transition-all overflow-hidden relative"
>
  
  <div class="flex items-center justify-between">
    <div class="flex gap-[7px] items-center">
      <label
        class="relative inline-block pl-9 mb-1 cursor-pointer text-base select-none mt-[-1.2rem] -ml-12"
      >
        <input
          type="checkbox"
          class="peer absolute opacity-0 h-0 w-0 cursor-pointer todo-check"
          data-id="${item.id}"
          ${item.status ? "checked" : ""}
        />
        <span
          class="absolute top-0 left-0 h-6 w-6 bg-gray-200 rounded transition-all duration-300 shadow-md peer-checked:bg-green-400 peer-checked:shadow-lg peer-checked:shadow-secbg-green-400 after:content-[''] after:absolute after:left-2 after:top-0.5 after:w-2 after:h-3.5 after:border-white after:border-r-2 after:border-b-2 after:rotate-45 after:opacity-0 after:transition-opacity peer-checked:after:opacity-100"
        ></span>
      </label>
      <h3
        class="font-bold text-3xl ${
          item.status ? "line-through text-gray-400" : ""
        }"
      >
        ${item.title}
      </h3>
    </div>
          <div
      class="cursor-pointer p-2 border border-red-400 rounded-lg translate-x-16 opacity-0 transition-all duration-500 ease-in-out group-hover:translate-x-0 group-hover:opacity-100"
      onclick={deleteTodo(${item.id})}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke-width="1.5" stroke="#ff6467" class="size-7">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>
    </div>
  </div>

  <p class="my-3">${item.description || ""}</p>

  <div class="flex items-center gap-10">
    <div class="flex items-center gap-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-gray-400"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round">
        <path
          d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
        <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
      </svg>
      <span>${item.category}</span>
    </div>

    <div class="flex items-center gap-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-gray-400"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" x2="4" y1="22" y2="15" />
      </svg>
      <span>${item.priority}</span>
    </div>

    <div class="flex items-center gap-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-gray-400"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
      </svg>
      <span>${item.date}</span>
    </div>
  </div>
</>
    `;
  });

  todoWrapper.insertAdjacentHTML("beforeend", taskComponent);

  // وصل کردن event به همه checkbox ها
  const checkboxes =
    todoWrapper.querySelectorAll<HTMLInputElement>(".todo-check");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      const id = Number(checkbox.dataset.id);
      changeTodoStatus(event, id);
    });
  });
}

function clearInput(): void {
  description.value = "";
  todoNameinput.value = "";
}
function deleteTodo(todoId: number): void {
  todosArray = todosArray.filter((todo: Todo) => todo.id !== todoId);
  showToast("Todo Has successfully Deleted", "success");
  checkHasTodo();
  appendTodo();
}
function checkHasTodo(): void {
  if (todosArray.length === 0) {
    noTaskAvailableContent.classList.remove("hidden");
    todoWrapper.classList.add("hidden");
    taskContainerTitle.classList.add("hidden");
  } else {
    noTaskAvailableContent.classList.add("hidden");
    todoWrapper.classList.remove("hidden");
    taskContainerTitle.classList.remove("hidden");
  }
}

function changeTodoStatus(event: Event, todoId: number): void {
  const input = event.target as HTMLInputElement;
  console.log(event);

  todosArray = todosArray.map((todo) =>
    todo.id === todoId ? { ...todo, status: input.checked } : todo
  );

  appendTodo();
}

todoNameinput.addEventListener("click", showingForm);
openTodoBtn.addEventListener("click", closingForm);
closeTodoBtn.addEventListener("click", (event) => closingForm(event));
addTaskBtn.addEventListener("click", (event) => addTodo(event));
window.addEventListener("load", checkHasTodo);

// ===== Toast System ===== Powered by Ai (my friend)

const toast = $.querySelector("#toast") as HTMLDivElement;
const toastMsg = $.querySelector("#toastMsg") as HTMLSpanElement;
const toastIcon = $.querySelector("#toastIcon") as HTMLSpanElement;

let toastTimer: number | null = null;

function showToast(
  message: string,
  type: "success" | "error" | "info" = "success",
  duration = 2000
): void {
  // متن
  toastMsg.textContent = message;

  // آیکن و رنگ
  if (type === "success") {
    toastIcon.textContent = "✅";
    toast.classList.remove("border-red-400");
    toast.classList.add("border-green-400");
  } else if (type === "error") {
    toastIcon.textContent = "❌";
    toast.classList.remove("border-green-400");
    toast.classList.add("border-red-400");
  } else {
    toastIcon.textContent = "ℹ️";
    toast.classList.remove("border-green-400", "border-red-400");
  }

  // اگه قبلاً تایمر باز بوده، پاکش کن
  if (toastTimer) {
    window.clearTimeout(toastTimer);
    toastTimer = null;
  }

  // نمایش با انیمیشن
  toast.classList.remove("hidden");
  requestAnimationFrame(() => {
    toast.classList.remove("opacity-0");
    toast.classList.remove("translate-y-[-8px]");
  });

  // بستن خودکار
  toastTimer = window.setTimeout(hideToast, duration);
}

function hideToast(): void {
  toast.classList.add("opacity-0");
  toast.classList.add("translate-y-[-8px]");
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 300);
}
// ===== End Toast System =====
