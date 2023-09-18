
const taskTemplete =  (object) => {

    const container = document.createElement('div')
    container.classList.add("uniquetask")
    container.setAttribute('id' , object.id)

    const taskdetails = document.createElement('div')
    taskdetails.classList.add('task')
    
    const tasktitle = document.createElement('p')
    tasktitle.classList.add('tasktitle')
    tasktitle.textContent = object.title
        
    const taskaction = document.createElement('div')
    taskaction.classList.add('taskactions')

    const button1 = document.createElement('button')
    button1.classList.add('nextstatus')
    button1.innerHTML = 'Mark as completed'
    // button1.addEventListener('click', changeCompletionStatus(object.id) )

    const description = document.createElement('p')
    description.textContent = object.description

    const editIcon = document.createElement('i')
    editIcon.classList.add('las' , 'la-edit' , 'edit')
    // editIcon.addEventListener('click' , editTask(object.id))

    const trashIcon = document.createElement('i')
    trashIcon.classList.add('las' , 'la-trash' , 'trash')
    // trashIcon.addEventListener('click' , deleteTask(object.id))



    taskaction.appendChild(button1)
    taskaction.appendChild(editIcon)
    taskaction.appendChild(trashIcon)
    taskdetails.appendChild(tasktitle)
    taskdetails.appendChild(taskaction)
    container.appendChild(taskdetails)
    container.appendChild(description)
    container.insertAdjacentHTML('beforeend' ,`<button class="taskstatus">Uncompleted</button>`)


    // button1.innerHTML= '<i class="fas fa-check"></i>'
    
    return container
}
