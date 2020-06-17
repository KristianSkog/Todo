(function() {

    let toDoList, findIndexToRemove;
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
                <input class="task__input display-none" type="text">
                <p class="task">${toDoList[i].name}</p>
                <span class="date">${toDoList[i].date}</span>
                </div>
                <div class="removeButton__container">
                    <button class="removeButton">Remove</button>    
                </div>
            </li>
            `;
            getTodoList.insertAdjacentHTML("afterbegin", newListItem);
        }
    }

    const createdDateOfTodo = () => {
        let createDate = new Date(),
        year = createDate.getFullYear(),
        months = createDate.getMonth(),
        day = createDate.getDay(),
        hours = createDate.getHours(),
        min = createDate.getMinutes();

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
            findArrayItemId(event);
            toDoList.splice(findIndexToRemove, 1);
            saveTodo();
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

    const findArrayItemId = (event) => {
        let getItemId = event.target.closest(".item").id;
        getItemId = parseFloat(getItemId);
        findIndexToRemove = toDoList
            .map(function(item) {
                return item.id;
            })
            .indexOf(getItemId);
    }

    const changeInputValue = (event) => {
        if (event.target.className === "task") {
            const getTaskId = event.target.closest('.item').id;
            const getTaskText = event.target;
            const getTaskInput = event.target.closest('.item').querySelector('.task__input');
            const getTaskTextValue = event.toElement.textContent;

            getTaskText.classList.add('display-none');
            getTaskInput.classList.remove('display-none');
            getTaskInput.value = getTaskTextValue;

            findArrayItemId(event);

            getTaskInput.addEventListener('keydown', function(event) {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    getTaskText.classList.remove('display-none');
                    getTaskInput.classList.add('display-none');
                    toDoList[findIndexToRemove].name = this.value;

                    saveTodo();
                }
            });
        }
    }

    const saveTodo = () => {
        printTodoList();
        saveTodoInLocalStorage();
    }

    getAddButton.addEventListener("click", function() {
        addItemToTodo();
        printTodoList();
    });
    getInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            addItemToTodo();
            printTodoList();
        }
    });
    getTodoList.addEventListener("click", removeItemFromList);

    document.addEventListener('dblclick', changeInputValue);

    getTodoFromLocalStorage();
    printTodoList();

})();
