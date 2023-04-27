const form = document.querySelector(".form");
const list = document.querySelector(".todosList");
const clear = document.querySelector(".clear");
const input = document.querySelector(".input");
const select = document.querySelector(".filter_status");
const empty = document.querySelector(".empty");
const todo_input = document.querySelector(".todo_input");

// STATE
let todos = [
  { value: "Reading book", isDone: false, id: "a1655" },
  { value: "Play football", isDone: true, id: "a26546" },
]; // baza

//Filter
let status = "all";

let filteredByStatus = (todos, status) => {
  switch (status) {
    case "complited":
      return todos.filter((el) => el.isDone);
    case "process":
      return todos.filter((el) => !el.isDone);
    default:
      return todos;
  }
};

// RENDERING
const render = () => {
  list.innerHTML = "";
  filteredByStatus(todos, status).forEach((element) => {
    const checkBox = element.isDone;
    list.innerHTML += `
          <li class="todo" id="${
            element.id
          }" ondrop="drop(event)" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)"> 
          <input ${checkBox == true ? "checked" : ""} onclick = "onCheck('${
      element.id
    }')" type="checkbox">
            <input  disabled="true" value="${
              element.value
            }" class="todo_input ${
      checkBox ? "lineThrough" : ""
    }" type="text" />
            <div class="edit">
              <i onclick="onEdit('${
                element.id
              }')" class="bx bx-sm bxs-pencil"></i>
            </div>
            <div class="save">
            <i onclick="saveList('${element.value}', '${
      element.id
    }')" class="bx bx-sm bx-save"></i>
          </div>
          <div class="cancel">
            <i onclick="closeList('${element.id}')" class="bx bx-md bx-x"></i>
          </div>
            <div class="delete">
              <i onclick="deleteTodo('${
                element.id
              }')" class="bx bx-sm bx-trash"></i>
            </div>
          </li>`;
  });
};
render(); // shu funksiya caqirib qoyilsa icida bor narsala ko`rinib turadi

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

const deleteTodo = (id) => {
  todos = todos.filter((el) => el.id != id);
  render();
  if (list.innerHTML == "") {
    empty.style.display = "block";
  }
};

const onEdit = (id) => {
  const getButton = (id, className) =>
    document.querySelector(`#${id} .${className}`);

  const editButton = getButton(id, "edit");
  const saveButton = getButton(id, "save");
  const cancelButton = getButton(id, "cancel");

  editButton.style.display = "none";
  saveButton.style.display = "flex";
  cancelButton.style.display = "flex";

  const todo_input = document.querySelector(`#${id} .todo_input`);
  todo_input.disabled = false;

  const autoFocus = todo_input.value.length;
  todo_input.setSelectionRange(autoFocus, autoFocus);
  todo_input.focus();
};

const saveList = (value, id) => {
  let newInputValue = document.querySelector(`#${id} .todo_input`);
  todos = todos.map((el) =>
    el.id == id ? { ...el, value: newInputValue.value } : el
  );

  // const getButton = (id, className) =>
  //   document.querySelector(`#${id} .${className}`);

  // const editButton = getButton(id, "edit");
  // const saveButton = getButton(id, "save");
  // const cancelButton = getButton(id, "cancel");

  // editButton.style.display = "flex";
  // saveButton.style.display = "none";
  // cancelButton.style.display = "none";

  // const todo_input = document.querySelector(".todo_input");
  // todo_input.disabled = true;
  render();
};

const closeList = (id) => {
  const getButton = (id, className) =>
    document.querySelector(`#${id} .${className}`);

  const editButton = getButton(id, "edit");
  const saveButton = getButton(id, "save");
  const cancelButton = getButton(id, "cancel");

  editButton.style.display = "flex";
  saveButton.style.display = "none";
  cancelButton.style.display = "none";

  const todo_input = document.querySelector(".todo_input");
  todo_input.disabled = true;

  render();
};

const onCheck = (id) => {
  todos = todos.map((el) => (el.id == id ? { ...el, isDone: !el.isDone } : el));
  render();
};

form.addEventListener("submit", (event) => {
  event.preventDefault(); // browzerri refresh bop ketishini oldini oladi
  const inputValue = event.target[0].value; // input valuesini olib bervoti
  if (!inputValue) {
    input.placeholder = "Empty";
    input.style.border = "3px solid red";
    input.style.boxShadow = "5px 5px 5px red";
    // input.style.transform = "translateY(-5px)";

    input.style.transition = "all 0.1s";
    return;
  } else if (inputValue) {
    input.placeholder = "Text input";
    input.style.border = "none";
    input.style.boxShadow = "0 0 10px black";
    input.style.transition = "all 0.1s";
  }
  const newTodo = { value: inputValue, isDone: false, id: "a" + Date.now() };
  todos.unshift(newTodo);
  event.target[0].value = ""; // Yengi narsa kritilgandan keyn inputti bowatip beradi
  render();
  notEmpty();
});

function emptyList() {
  if ((todos = [])) {
    empty.style.display = "block";
  }
}

function notEmpty() {
  if (todos != null) {
    empty.style.display = "none";
  }
}

const clean = clear.addEventListener("click", () => {
  todos = [];
  render();
  emptyList();
});

select.addEventListener("change", (event) => {
  status = event.target.value;
  render();
});
