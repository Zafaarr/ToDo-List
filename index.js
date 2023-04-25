const form = document.querySelector(".form");
const list = document.querySelector(".todosList");
const clear = document.querySelector(".clear");
const input = document.querySelector(".input");
const select = document.querySelector(".filter_status");
const empty = document.querySelector(".empty");

// STATE
let todos = [
  { value: "Reading book", isDone: false, id: "a1655" },
  { value: "Play football", isDone: true, id: "a26546" },
]; // baza

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
          <li class="todo" id="${element.id}"> 
          <input ${checkBox == true ? "checked" : ""} onclick = "onCheck('${
      element.id
    }')" type="checkbox">
            <input value="${element.value}" class="todo_input" type="text" />
            <div class="edit">
              <i onclick="onEdit('${
                element.id
              }')" class="bx bx-sm bxs-pencil"></i>
            </div>
            <div class="save">
            <i onclick="saveList('${element.id}')" class="bx bx-sm bx-save"></i>
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

const deleteTodo = (id) => {
  todos = todos.filter((el) => el.id != id);
  render();
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
};

const saveList = (id) => {
  const getButton = (id, className) =>
    document.querySelector(`#${id} .${className}`);

  const editButton = getButton(id, "edit");
  const saveButton = getButton(id, "save");
  const cancelButton = getButton(id, "cancel");

  editButton.style.display = "flex";
  saveButton.style.display = "none";
  cancelButton.style.display = "none";
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
};

const onCheck = (id) => {
  todos = todos.map((el) => (el.id == id ? { ...el, isDone: !el.isDone } : el));
  render();
  // console.log("check", todos);
};

form.addEventListener("submit", (event) => {
  event.preventDefault(); // browzerri refresh bop ketishini oldini oladi
  const inputValue = event.target[0].value; // input valuesini olib bervoti
  if (!inputValue) {
    input.placeholder = "Empty";
    input.style.border = "3px solid red";
    input.style.boxShadow = "5px 5px 5px red";
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
