
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
            trashIcon.addEventListener('click', () => deleteTask(task.id))

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
       await fetch(`http://localhost:5000/api/todos`)
            .then((response) => response.json())
            .then((tasklist) => {
                allTask = tasklist
                console.log('here are all tthe task in alltask from the backend ', allTask)
                renderTask()
            }
            ).catch(err => console.log(err))
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
                console.log('response', res)
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
                        'Content-Type':  'text/plain'  // Have to find the right content type to send to the server
                    },
                    body: JSON.stringify(newTask),
                })
                console.log('response', res)
            } catch (error) {
                console.log(error)
            }
        }


    }

    const form = document.querySelector('form')
    let toUpdate
    let editMode = false


    // get the values of the input fields
  
  
    // when to add the task  or update a task
    setTaskFromBackend()
    form.onsubmit = () => {
        const inputTitle = document.querySelector('#title').value
        const inputDescription = document.querySelector('#description').value
    
        if (inputTitle === "") {
            document.getElementById('required1').style.display = 'block';
            document.querySelector('#title').style.borderColor = 'red';
        } 
        if (inputDescription === "") {
            document.getElementById('required2').style.display = 'block';
            document.querySelector('#description').style.borderColor = 'red';
        } 
        if (inputDescription === "" || inputTitle === "") {
            this.disabled = true 
            console.log(this.disabled)
        } else {
            this.disabled = false
            if (!editMode) {
               
                console.log('eidtmode in else', editMode)
    
                addTask()
                // setTaskFromBackend()
    
                document.querySelector('#title').value = ""
                document.querySelector('#description').value = ""

                return false
            }
            else {
             
                console.log('eidtmode in if', editMode)
                console.log('id in if ', toUpdate)
                updateTask(toUpdate)
                console.log('page is about to rerender')
                setTaskFromBackend()
                
                // editMode = false
                
            }
        }
    }
   
    function editStatus(id) {
        const cTask = allTask.find(task => task.id === id)
        if (cTask.status) {
            cTask.status = false

        } else {
            cTask.status = true;

        }
        renderTask()

        console.log(allTask)

    }

    // deleting Task from the list and server
    async function deleteTask(id) {

        try {
            const res = await fetch(`http://localhost:5000/api/todo/${id}`, {
                method: 'DELETE',
            })
        } catch (e) {
            console.log(e)
        }
        allTask = allTask.filter(task => task.id !== id)
        renderTask()
    }

    // Editing the content of a task 
    function editTask(id) {
        const eTask = allTask.find(task => task.id === id)
        console.log(`this is what is gonna be edited `, eTask)
        document.querySelector('#title').value = eTask.title
        document.querySelector('#description').value = eTask.description
        toUpdate = id
        editMode = true
        
    }

})