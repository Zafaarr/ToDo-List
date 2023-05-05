const form = document.querySelector(".form");
const list = document.querySelector(".todosList");
const clear = document.querySelector(".clear");
const input = document.querySelector(".input");
const select = document.querySelector(".filter_status");
const empty = document.querySelector(".empty");
const todo_input = document.querySelector(".todo_input");

// STATE
let todos = JSON.parse(localStorage.getItem("todos")) || []; // localStorage dan
// olinviti, parse qlb o`qivolinvoti

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
  localStorage.setItem("todos", JSON.stringify(todos)); // localStorage ga set qlnvoti
  list.innerHTML = ""; // yengi el qo`shilvotkanida ichida bori yana qo`wilmasligi uchun
  filteredByStatus(todos, status).forEach((element) => {
    const checkBox = element.isDone;
    list.innerHTML += `
        <li draggable=true class="todo" id="${element.id}"> 
          <input class="checkbox" ${checkBox == true ? "checked" : ""} type="checkbox">
            <input disabled value="${element.value}" class="todo_input ${ checkBox ? "lineThrough" : ""}" type="text" />
            <div class="edit">
             <i class="bx bx-sm bxs-pencil"></i>
            </div>
            <div class="save">
             <i class="bx bx-sm bx-save"></i>
            </div>
            <div class="cancel">
             <i class="bx bx-md bx-x"></i>
            </div>
            <div class="delete">
             <i class="bx bx-sm bx-trash"></i>
            </div>
          </li>`;
  });

  // Drag and Drop
  let startIndex;
  let dropIndex;

  const listElements = document.getElementsByClassName("todo");

  for (let element of listElements) {
    element.addEventListener("dragstart", (dragStart) => {
      let start = element.id;
      startIndex = todos.findIndex((el) => el.id == start);
      dragStart.target.closest(".todo").style.cssText = `opacity:1;border:1px solid black;`;
    });
    element.addEventListener("dragend", (dragEnd) => {
      dragEnd.preventDefault();
      dragEnd.target.closest(".todo").style.cssText = `border-bottom: 1px solid black`;

      let drop_first = todos.splice(startIndex, 1);
      todos.splice(dropIndex, 0, drop_first[0]); // ?
      render();
    });
    element.addEventListener("dragover", (dragOver) => {
      dragOver.preventDefault();
      dragOver.target.closest(".todo").style.cssText = `border-bottom:1px solid black;`;
    });
    element.addEventListener("dragleave", (dragLeave) => {
      dragLeave.preventDefault();
      dragLeave.target.closest( ".todo").style.cssText = `border-bottom:1px solid white;`;
    });
    element.addEventListener("drop", (dragDrop) => {
      dragDrop.preventDefault();

      let drop = element.id;
      dropIndex = todos.findIndex((el) => el.id == drop);

      // let temp = todos[startIndex];
      // todos[startIndex] = todos[dropIndex];
      // todos[dropIndex] = temp;  // O`rni almashadi.
      render();
    });
  }
};
render(); // shu funksiya caqirib qoyilsa icida bor narsala ko`rinib turadi

const mainContent = document.querySelector(".block");

mainContent.addEventListener("click", (button) => {
  const id = button.target.closest(".todo")?.id;

  const getButton = (id, className) =>
    document.querySelector(`#${id} .${className}`);

  const editButton = getButton(id, "edit");
  const saveButton = getButton(id, "save");
  const cancelButton = getButton(id, "cancel");

  const todo_input = document.querySelector(`#${id} .todo_input`);

  if (button.target.closest(".clear")) {
    todos = [];
    emptyList();
    render();
  }
  if (button.target.closest(".delete")) {
    todos = todos.filter((el) => el.id !== id); //click bogan elni id isiga teng bomagan el larni qaytarib bervoti
    render();
    if (list.innerHTML === "") {
      empty.style.display = "block";
    }
  }
  if (button.target.closest(".save")) {
    let newInputValue = document.querySelector(`#${id} .todo_input`);
    todos = todos.map((el) =>
      el.id == id ? { ...el, value: newInputValue.value } : el
    );
    render();
  }
  if (button.target.closest(".edit")) {
    editButton.style.display = "none";
    saveButton.style.display = "flex";
    cancelButton.style.display = "flex";

    todo_input.disabled = false;

    const autoFocus = todo_input.value.length;
    todo_input.setSelectionRange(autoFocus, autoFocus);
    todo_input.focus();
  }
  if (button.target.closest(".cancel")) {
    editButton.style.display = "flex";
    saveButton.style.display = "none";
    cancelButton.style.display = "none";

    todo_input.disabled = true;
    render();
  }
  if (button.target.closest(".checkbox")) {
    todos = todos.map((el) =>
      el.id == id ? { ...el, isDone: !el.isDone } : el
    );
    render();
  }
});

// const clean = clear.addEventListener("click", () => {
//   todos = [];
//   render();
//   emptyList();
// });

// const deleteTodo = (id) => {
//   todos = todos.filter((el) => el.id != id);
//   render();
//   if (list.innerHTML == "") {
//     empty.style.display = "block";
//   }
// };

// const onEdit = (id) => {
//   const getButton = (id, className) =>
//     document.querySelector(`#${id} .${className}`);

//   const editButton = getButton(id, "edit");
//   const saveButton = getButton(id, "save");
//   const cancelButton = getButton(id, "cancel");

//   editButton.style.display = "none";
//   saveButton.style.display = "flex";
//   cancelButton.style.display = "flex";

//   const todo_input = document.querySelector(`#${id} .todo_input`);
//   todo_input.disabled = false;

//   const autoFocus = todo_input.value.length;
//   todo_input.setSelectionRange(autoFocus, autoFocus);
//   todo_input.focus();
// };

// const saveList = (value, id) => {
//   let newInputValue = document.querySelector(`#${id} .todo_input`);
//   todos = todos.map((el) =>
//     el.id == id ? { ...el, value: newInputValue.value } : el
//   );
//   render();
// };

// const closeList = (id) => {
//   const getButton = (id, className) =>
//     document.querySelector(`#${id} .${className}`);

//   const editButton = getButton(id, "edit");
//   const saveButton = getButton(id, "save");
//   const cancelButton = getButton(id, "cancel");

//   editButton.style.display = "flex";
//   saveButton.style.display = "none";
//   cancelButton.style.display = "none";

//   const todo_input = document.querySelector(".todo_input");
//   todo_input.disabled = true;

//   render();
// };

// const onCheck = (id) => {
//   todos = todos.map((el) => (el.id == id ? { ...el, isDone: !el.isDone } : el));
//   render();
// };

form.addEventListener("submit", (event) => {
  event.preventDefault(); // browzerri refresh bop ketishini oldini oladi
  const inputValue = event.target[0].value; // input valuesini olib bervoti
  if (!inputValue) {
    input.classList.add("shakeable");
    input.placeholder = "Please enter a new task";
    input.style.border = "2px solid red";
    input.style.boxShadow = "3px 3px 3px red";
    input.style.transition = "all 0.1s";
    setTimeout(() => {
      input.classList.remove("shakeable");
    }, 1000);
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
  notEmpty();
  render();
});

function emptyList() {
  if (todos.length == 0) {
    empty.style.display = "block";
  }
}

function notEmpty() {
  empty.style.display = "none";
}

todos.length == 0 ? emptyList() : notEmpty();

select.addEventListener("change", (event) => {
  status = event.target.value; // ?
  render();
});
