
document.addEventListener('DOMContentLoaded', () => {
    // array to store the data 

    const renderTask = () => {
        // get all task from local storage will i have to work on this ??

        const taskChecker = document.querySelector('.taskchecker')
        // reste the content of the container and add all the data present in the passed array 
        taskChecker.innerHTML = ""

        // creating each task and putting them in thier main container 

        allTask.forEach(task => {

            const container = document.createElement('div')
            container.classList.add("uniquetask")
            container.setAttribute('id', task.id)

            const taskdetails = document.createElement('div')
            taskdetails.classList.add('task')

            const tasktitle = document.createElement('p')
            tasktitle.classList.add('tasktitle')
            tasktitle.textContent = task.title

            const taskaction = document.createElement('div')
            taskaction.classList.add('taskactions')

            const button1 = document.createElement('button')
            button1.classList.add('nextstatus')
            button1.textContent = task.status ? 'Mark as uncompleted' : 'Mark as completed'

            button1.addEventListener('click', () => editStatus(task.id))

            const button2 = document.createElement('button')

            button2.textContent = task.status ? 'completed' : 'uncompleted'
            button2.classList = task.status ? 'taskstatus-complete' : 'taskstatus'

            const description = document.createElement('p')
            description.textContent = task.description

            const editIcon = document.createElement('i')
            editIcon.classList.add('las', 'la-edit', 'edit')
            editIcon.addEventListener('click', () => editTask(task.id))

            const trashIcon = document.createElement('i')
            trashIcon.classList.add('las', 'la-trash', 'trash')
            trashIcon.addEventListener('click', () => deleteActions(task.id))

            // puting every tag in it parent tag

            taskaction.appendChild(button1)
            taskaction.appendChild(editIcon)
            taskaction.appendChild(trashIcon)
            taskdetails.appendChild(tasktitle)
            taskdetails.appendChild(taskaction)
            container.appendChild(taskdetails)
            container.appendChild(description)
            container.appendChild(button2)
            taskChecker.appendChild(container)

        })

    }

    let allTask = []

    // fetching the entire database from the server
    const setTaskFromBackend = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/todos`)
                .then((response) => response.json())
                .then((tasklist) => {
                    allTask = tasklist
                    renderTask()
                })


        } catch (error) {
            console.log(error)
            createToast('error')

        }
    }


    // function to add a task to the server
    const addTask = async () => {
        // get the values of the input fields
        const inputTitle = document.querySelector('#title').value
        const inputDescription = document.querySelector('#description').value

        if (inputTitle.trim() !== '') {

            const newTask = {

                title: inputTitle,
                description: inputDescription,
                status: false
            }

            try {
                const res = await fetch('http://localhost:5000/api/todos', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'text/plain',
                    },
                    body: JSON.stringify(newTask),
                })
                if (res.status === 201) {
                    createToast('success')
                } else {
                    createToast('error')
                }
            } catch (error) {
                console.log(error)
            }
        }

    }

    // updata a task on the server there is an update to handle in this function
    const updateTask = async (id) => {
        // get he values of the input fields

        const inputTitle = document.querySelector('#title').value
        const inputDescription = document.querySelector('#description').value

        if (inputTitle.trim() !== '') {
            const newTask = {
                title: inputTitle,
                description: inputDescription,
            }

            try {
                const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/plain'  // Have to find the right content type to send to the server
                    },
                    body: JSON.stringify(newTask),
                })
                if (res.status === 200) {
                    createToast('success')
                } else {
                    createToast('error')
                }
            } catch (error) {
                console.log(error)
                createToast('error')
            }
        }


    }

    const form = document.querySelector('form')
    let toUpdate
    let toDelete
    let editMode = false


    // get the values of the input fields
    const inputTitle = document.querySelector('#title')
    const inputDescription = document.querySelector('#description')

    // Add an event listener for the "input" event
    const inputListener = function (element, id1, id2) {

        element.addEventListener('input', event => {
            event.preventDefault()
            const value = event.target.value;
            if (value === "") {
                document.getElementById(`${id1}`).style.display = 'block';
                document.getElementById(`${id2}`).style.borderColor = 'red';
            } else {
                document.getElementById(`${id1}`).style.display = 'none';
                document.getElementById(`${id2}`).style.borderColor = '';

            }

        });
    }

    inputListener(inputTitle, 'required1', 'title')
    inputListener(inputDescription, 'required2', 'description')




    // when to add the task  or update a task
    setTaskFromBackend()
    form.onsubmit = (e) => {
        e.preventDefault()
        const inputTitle = document.querySelector('#title').value
        const inputDescription = document.querySelector('#description').value


        if (inputDescription === "" || inputTitle === "") {
            this.disabled = true
            createToast('warning')
        } else {
            this.disabled = false
            if (!editMode) {
                addTask()
                setTaskFromBackend()
                document.querySelector('#title').value = ""
                document.querySelector('#description').value = ""
                return false
            }
            else {
                updateTask(toUpdate)
                setTaskFromBackend()
                document.querySelector('#title').value = ""
                document.querySelector('#description').value = ""

                return false
            }
        }
    }

    function editStatus(id) {
        const cTask = allTask.find(task => task.id === id)
        if (cTask.status) {
            cTask.status = false
            createToast('success')
        } else {
            cTask.status = true;
            createToast('success')
        }
        renderTask()


    }

    // deleting Task from the list and server
    async function deleteTask(id) {

        try {
            const res = await fetch(`http://localhost:5000/api/todo/${id}`, {
                method: 'DELETE',
            })
            if (res.status === 200) {
                createToast('success')
            } else {
                createToast('error')
            }
        } catch (e) {
            console.log(e)
        }
        allTask = allTask.filter(task => task.id !== id)
        renderTask()
    }

    // Editing the content of a task 
    function editTask(id) {
        const eTask = allTask.find(task => task.id === id)
        document.querySelector('#title').value = eTask.title
        document.querySelector('#description').value = eTask.description
        toUpdate = id
        editMode = true
    }

    // toast
    const notifications = document.querySelector(".notifications")

    // Object containing details for different types of toasts
    const toastDetails = {
        timer: 5000,
        success: {
            icon: 'fa-circle-check',
            text: 'Successful',
        },
        error: {
            icon: 'fa-circle-xmark',
            text: 'An err occured',
        },
        warning: {
            icon: 'fa-triangle-exclamation',
            text: 'incompleted form.',
        }

    }

    const removeToast = (toast) => {
        toast.classList.add("hide");
        if (toast.timeoutId) clearTimeout(toast.timeoutId); // Clearing the timeout for the toast
        setTimeout(() => toast.remove(), 500); // Removing the toast after 500ms
    }

    const createToast = (id) => {
        // Getting the icon and text for the toast based on the id passed
        const { icon, text } = toastDetails[id];
        const toast = document.createElement("li"); // Creating a new 'li' element for the toast
        toast.className = `toast ${id}`; // Setting the classes for the toast
        // Setting the inner HTML for the toast
        toast.innerHTML = `<div class="column">
                         <i class="fa-solid ${icon}"></i>
                         <span>${text}</span>
                      </div>
                      <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
        notifications.appendChild(toast); // Append the toast to the notification ul
        // Setting a timeout to remove the toast after the specified duration
        toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
    }

    // bluring the content to delete a task 

    const popupContainer = document.querySelector('.popcontainer')
    let deleteModal = false
    popupContainer.style.display = 'none'
    


    function deleteActions(id) {
        deleteModal = true
        toDelete = id
        popupContainer.style.display = 'flex'
    }
   
    let cancelbtn = document.getElementById('cancelbtn')
    let deletebtn = document.getElementById('deletebtn')

    cancelbtn.addEventListener('click' , () =>{
        deleteModal = false
        popupContainer.style.display = 'none'

    })

    deletebtn.addEventListener('click' , () =>{
        deleteModal = false
        deleteTask(toDelete)
        popupContainer.style.display = 'none'

    })

})