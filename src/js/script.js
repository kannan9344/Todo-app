document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#todoForm");
  const updateform = document.querySelector("#updateForm");
  let index = 0;
  let todoList = [];
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let tododata = formData.get("todoinput");
    if (todoList.includes(tododata)) {
      toggelModal("Todo is already exists", "fa-solid fa-triangle-exclamation");
      return;
    } else if (tododata == "") {
      toggelModal(
        "Enter the todo under the input field",
        "fa-solid fa-face-rolling-eyes"
      );
    } else {
      todoList.push(tododata);
      localStorage.setItem("tododata", JSON.stringify(todoList));
      insertData();
      formData.set("todoinput", "");
    }
  });
  updateform.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let updatedata = formData.get("updatetodo");
    let todoData = JSON.parse(localStorage.getItem("tododata")) || [];
    if (updatedata != "") {
      todoData[index] = updatedata;
      localStorage.setItem("tododata", JSON.stringify(todoData));
      insertData();
      updateform.classList.remove("active");
      toggelModal("Todo data was updated", " fa-solid fa-check");
    } else {
      return;
    }
  });
  function insertData() {
    let todoData = JSON.parse(localStorage.getItem("tododata")) || [];
    const container = document.querySelector(".todocontainer");
    container.innerHTML = `<i class="fa-solid fa-face-frown"></i>`;
    if (todoData.length > 0) {
      container.innerHTML = "";
      container.style.height = "auto";
      todoData.map((todo, index) => {
        container.innerHTML += ` <li>
                <div class="check-icon">
                  <i class="fa-solid fa-check"></i>
                </div>
                <label>${todo} </label>
                <div class="icons">
                  <i class="fa-solid fa-pencil" data-id="${index}" ></i>
                  <i class="fa-solid fa-trash-can" data-id="${index}" ></i>
                </div>
              </li>`;
      });
      const deleteicons = document.querySelectorAll(".fa-trash-can");
      deleteicons.forEach((icon) => {
        icon.addEventListener("click", () => {
          let id = icon.dataset.id;
          index = id;
          deletetodo(id);
        });
      });
      const editicons = document.querySelectorAll(".fa-pencil");
      editicons.forEach((icon) => {
        icon.addEventListener("click", () => {
          updateform.classList.add("active");
          let id = icon.dataset.id;
          index = id;
        });
      });
      const check_icons = document.querySelectorAll(".check-icon");
      check_icons.forEach((check_icon) => {
        check_icon.addEventListener("click", () => {
          let nextElement = check_icon.nextElementSibling;
          check_icon.classList.toggle("active");
          nextElement.classList.toggle("active");
        });
      });
    } else {
      container.style.height = "200px";
    }
  }
  insertData();
  function toggelModal(message, classname) {
    const modal = document.querySelector(".modal-content");
    modal.innerHTML = "";
    modal.innerHTML = `<i class="${classname}"></i> <div>${message}</div>`;
    modal.classList.add("active");
    setTimeout(() => {
      modal.classList.remove("active");
    }, 3000);
  }
  function deletetodo(id) {
    let todoData = JSON.parse(localStorage.getItem("tododata")) || [];
    todoData.splice(id, 1);
    localStorage.setItem("tododata", JSON.stringify(todoData));
    insertData();
    toggelModal("Todo data deleted successfully...", " fa-solid fa-check");
  }
});
