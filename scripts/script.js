(function() {

    let toDoList;
    const getInput = document.querySelector(".addItem");
    const getAddButton = document.querySelector(".addItemButton");
    const getTodoList = document.querySelector(".toDoList");

    const addItemToTodo = () => {
        if (getInput.value.length > 0) {
            let randomId = Math.floor(Math.random() * 10000);
            toDoList.push({
            id: randomId,
            name: getInput.value,
            date: createdDateOfTodo()
            });
            saveTodoInLocalStorage();
            getInput.value = "";
        }
    }

    const printTodoList = () => {
        getTodoList.innerHTML = "";

        for (let i = 0; i < toDoList.length; i++) {
            let newListItem = `
            <li class="item" id=${toDoList[i].id}>
                <div class="item__container">
                <p class="task">${toDoList[i].name}</p>
                <span class="date">${toDoList[i].date}</span>
                </div>
                <button class="removeButton">Remove</button>    
            </li>
            `;
            getTodoList.insertAdjacentHTML("afterbegin", newListItem);
        }
    }

    const createdDateOfTodo = () => {
        let createDate = new Date();
        let year = createDate.getFullYear();
        let months = createDate.getMonth();
        let day = createDate.getDay();
        let hours = createDate.getHours();
        let min = createDate.getMinutes();

        if (months < 10) {
            months = "0" + months;
        }
        if (day < 10) {
            day = "0" + day;
        }
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (min < 10) {
            min = "0" + min;
        }

        return `${year}-${months}-${day}  ${hours}:${min}`;
    }

    const removeItemFromList = (event) => {
        if (event.target.className === "removeButton") {
            let getItemId = event.target.closest(".item").id;
            getItemId = parseFloat(getItemId);
            var findIndexToRemove = toDoList
                .map(function(item) {
                    return item.id;
                })
                .indexOf(getItemId);
            toDoList.splice(findIndexToRemove, 1);

            printTodoList();
            saveTodoInLocalStorage();
        }
    }

    const saveTodoInLocalStorage = () => {
        const str = JSON.stringify(toDoList);
        localStorage.setItem("todo", str);
    }

    const getTodoFromLocalStorage = () => {
        var str = localStorage.getItem("todo");
        toDoList = JSON.parse(str);
        if (!toDoList) {
            toDoList = [];
        }
    }

    getAddButton.addEventListener("click", function() {
        addItemToTodo();
        printTodoList();
    });
    window.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            addItemToTodo();
            printTodoList();
        }
    });
    getTodoList.addEventListener("click", removeItemFromList);

    getTodoFromLocalStorage();
    printTodoList();

})();
