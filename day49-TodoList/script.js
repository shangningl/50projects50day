const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

const todos = JSON.parse(localStorage.getItem("todos"));

// 若本地已存在则读取并添加
if (todos) {
  todos.forEach((todo) => addTodo(todo));
}

// 表单添加事件
form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo();
});

/**向列表中添加代办 */
function addTodo(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    // 存在代办文本，则生成li
    const todoEl = document.createElement("li");
    if (todo?.completed) {
      //判断是否代办完成
      todoEl.classList.add("completed");
    }

    todoEl.innerText = todoText;

    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed");
      updateLS();
    });

    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      // 删除该节点
      todoEl.remove();
      updateLS();
    });

    todosUL.appendChild(todoEl);

    input.value = "";

    updateLS();
  }
}

/**更新本地存储 */
function updateLS() {
  todosEl = document.querySelectorAll("li");

  const todos = [];

  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
