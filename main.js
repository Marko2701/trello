const lists = document.querySelectorAll(".list");
const button = document.querySelector(".button");

let boardIdNo = 4;

function addTask(i) {
  const btn = document.querySelectorAll(".add__btn");
  const addBtn = document.querySelectorAll(".add__item-btn");
  const cancelBtn = document.querySelectorAll(".cancel__item-btn");
  const textarea = document.querySelectorAll(".textarea");
  const form = document.querySelectorAll(".form");

    form[i].style.display = "block";
    btn[i].style.display = "none";
    addBtn[i].style.display = "none";
    textarea[i].focus();
    textarea[i].addEventListener("input", (e) => {
      value = e.target.value;
      if (value) {
        addBtn[i].style.display = "block";
      } else {
        addBtn[i].style.display = "none";
      }
    });
  
  let value;

  const addItem = function (value) {
    const newItem = document.createElement("div");
    newItem.classList.add("list__item");
    newItem.setAttribute("contenteditable", true);
    newItem.draggable = true;
    newItem.textContent = value;
    lists[i].append(newItem);
    textarea[i].value = "";
    value = "";
    form[i].style.display = "none";
    btn[i].style.display = "flex";
    dragNdrop();
  };

  cancelBtn[i].addEventListener("click", () => {
    textarea[i].value = "";
    value = "";
    form[i].style.display = "none";
    btn[i].style.display = "flex";
  });

  addBtn[i].addEventListener("click", () => {
    addItem(value);
  });

  form[i].addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      addItem(value);
    }
  });
}

function addBoard() {
  const boards = document.querySelector(".boards");
  const board = document.createElement("div");
  board.classList.add("boards__item");
  boardIdNo += 1;
  board.setAttribute("id", `no${boardIdNo}`);
  board.innerHTML = `<span contenteditable="true" class="title">Backlog ${boardIdNo}</span>
  <div class="list">
</div>
  <div class="form">
  <textarea
    class="textarea"
    placeholder="Name your card..."
  ></textarea>
  <div class="buttons">
    <button class="add__item-btn">Add card</button>
    <button class="cancel__item-btn">Cancel</button>
  </div>
</div>
  <div class="add__btn">
  <span class="add__btn-plus"> + </span> Add card
</div>`;
  boards.append(board);
  dragNdrop();
}
button.addEventListener("click", addBoard);

let draggedItem = null;

const dragNdrop = function () {
  const listItems = document.querySelectorAll(".list__item");
  const lists = document.querySelectorAll(".list");
  // const boardItemEdit = document.querySelector('.board__row__item--edit'); /*TODO: remove opacity when dragging*

  listItems.forEach(function (item) {
    item.addEventListener("dragstart", function () {
      draggedItem = item;
      item.classList.add("dragging");
    });
    item.addEventListener("dragend", function () {
      item.classList.remove("dragging");
    });
    item.addEventListener("dblclick", () => {
      item.remove();
    });
  });

  lists.forEach(function (container) {
    container.addEventListener("dragover", function (e) {
      e.preventDefault();
      const item = document.querySelector(".dragging");
      const afterElement = getDragAfterElement(container, e.clientY);

      if (afterElement == null) {
        container.appendChild(item);
      } else {
        container.insertBefore(item, afterElement);
      }
    });

    container.addEventListener("dragenter", function (e) {
      e.preventDefault();
      this.style.backgroundColor = "rgba(0,0,0,.3)";
    });

    container.addEventListener("dragleave", function (e) {
      this.style.backgroundColor = "rgba(0,0,0, 0)";
    });

    container.addEventListener("drop", function (e) {
      this.style.backgroundColor = "rgba(0,0,0, 0)";
    });
  });
};

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".list__item:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

dragNdrop();
