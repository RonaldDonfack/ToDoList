
document.addEventListener('DOMContentLoaded' , () => {
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
            container.setAttribute('id' , task.id)
        
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
            
            button1.addEventListener('click', () => editStatus(task.id) )

            const button2 = document.createElement('button')
           
            button2.textContent = task.status ? 'completed' : 'uncompleted'
            button2.classList = task.status ? 'taskstatus-complete' : 'taskstatus'
        
            const description = document.createElement('p')
            description.textContent = task.description
        
            const editIcon = document.createElement('i')
            editIcon.classList.add('las' , 'la-edit' , 'edit')
            editIcon.addEventListener('click' ,() => editTask(task.id))
        
            const trashIcon = document.createElement('i')
            trashIcon.classList.add('las' , 'la-trash' , 'trash')
            trashIcon.addEventListener('click' , () => deleteTask(task.id))
        
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
    

    let allTask = [
        {
            id : 09877899 , 
            title : 'hello ' ,
            description : 'world ' ,
            status : true
        },
        {
            id : 789098778 , 
            title : 'how are you doing today' ,
            description : 'fine n u ' ,
            status : false
        },
        {
            id : 78909877 , 
            title : 'Watch the BlackList' ,
            description : 'As of episode 16 in season 9' ,
            status : false
        }

    ]

    renderTask()
  
    // function to add a task 

    const addTask = () => {
        // get value from input fields
    
        const inputTitle = document.querySelector('#title').value
        const inputDescription = document.querySelector('#description').value

        if (inputTitle.trim() !== ''){
            const newTask = {
                id : Date.now() , 
                title : inputTitle ,
                description : inputDescription ,
                status : false
            }
            console.log(`here is the last task ` , newTask)

            allTask.push(newTask)
        }
        console.log( `here are all the task ` , allTask)
        renderTask()


   
    }

    // when to add the task 

    document.querySelector('form').onsubmit = () => {
        addTask()
        document.querySelector('#title').value = ""
        document.querySelector('#description').value = ""

        return false
    }
    

 
function editStatus(id) {
    const cTask = allTask.find(task => task.id === id)
    if(cTask.status){
        cTask.status = false
       
    }else{
        cTask.status=true;
       
    }
    renderTask()
 
    console.log(allTask)

}

    // deleting Task from the list 
    
    function deleteTask(id){
        allTask = allTask.filter(task => task.id !== id)
        renderTask()
    }
        
    // Editing the content of a task 

    function editTask(id) {
        const eTask = allTask.find(task => task.id === id)
        console.log(`this is what is gonna be edited ` , eTask)
        document.querySelector('#title').value = eTask.title
        document.querySelector('#description').value = eTask.description

        deleteTask(id)
     
    }


})