
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
    let userEnteredValue = inputBox.value;
    if (userEnteredValue.trim() != 0) {
        addBtn.disabled = false;
    } else {
        addBtn.disabled = true;
    }
}

showTasks();

addBtn.onclick = () => {
    if (inputBox.value.trim() == 0) {
        alert('Task can\'t be empty');
        return inputBox.classList.add("is-invalid");
    }
    let userEnteredValue = inputBox.value;
    let getLocalStorageData = localStorage.getItem("New Todo");
    if (getLocalStorageData == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(getLocalStorageData);
    }
    listArray.push(userEnteredValue);
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks();
    addBtn.classList.remove("active");
}

function showTasks() {
    let getLocalStorageData = localStorage.getItem("New Todo");
    if (getLocalStorageData == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(getLocalStorageData);
    }
    const pendingTasksNumb = document.querySelector(".pendingTasks");
    pendingTasksNumb.textContent = listArray.length + ' pending';
    if (listArray.length > 0) {
        deleteAllBtn.disabled = false;

    } else {
        deleteAllBtn.disabled = true;

    }
    let newLiTag = "";
    listArray.forEach((element, index) => {
        newLiTag += `<li class="list-group-item mb-1" style="background-color: #F1F5F9"><span class="me-1">${index + 1} -</span> <span id="t-${index}">${element}</span><div class="float-end"> <span id="e-btn-${index}"><button class="btn icon" style="color: #059669" onclick="editTask(${index}, '${element}')"><i class="fas fa-pen"></i></button></span> <button class="btn icon text-danger" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></button></div></li>`;
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = "";
}


function deleteTask(index) {
    let getLocalStorageData = localStorage.getItem("New Todo");
    listArray = JSON.parse(getLocalStorageData);
    listArray.splice(index, 1);
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks();
}

function saveEditTask(index, value) {
    const i = document.querySelector("#i-" + index);
    if (i.value.trim() == 0) {
        alert('New value of task can\'t be empty');
        return i.classList.add("is-invalid");
    }
    let getLocalStorageData = localStorage.getItem("New Todo");
    listArray = JSON.parse(getLocalStorageData);
    listArray[index] = i.value;
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    i.value = "";
    showTasks();
}

function editTask(index, value) {
    const s1 = document.querySelector("#update");
    s1.innerHTML = `<input class="form-control" aria-describedby="basic-addon2" id="i-${index}" value="${value}"/> <button class="input-group-text btn-light ms-2 me-3" onclick="saveEditTask(${index})" style="color: #059669;">Update</button>`;
}


deleteAllBtn.onclick = () => {
    listArray = [];
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks();
}

function toUpdate() {
    alert('Please click on green pen to update its task');
}