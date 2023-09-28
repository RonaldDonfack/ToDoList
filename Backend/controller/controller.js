
const Tasks  = require('../model/taskmodel')

const { getPostData } = require('../utlis')


//  desc   update a task 
// route   GET render it to the route api/todos
async function  getAllTasks(req , res) {
    try {
        const tasks = await Tasks.findTasks()

        // console.log(req)
        res.writeHead(200, {'Content-Type' : 'application/json'})
        res.end(JSON.stringify(tasks))

    } catch (error) {
        console.log(error)
    }
}
//  desc   update a task 
// route   GET render it to the route api/todos/:id

async function getTaskById (req , res , id){
    try {
        const task = await Tasks.findById(id) 


       
        if (!task) {
            res.writeHead(404, {'Content-Type' : 'application/json'})
            res.end(JSON.stringify({message : "this task was not found"}))

        } else {
            res.writeHead(200, {'Content-Type' : 'application/json'})
            res.end(JSON.stringify(task))
        }
    } catch (error) {
        console.log(error)
    }
}

//  desc   create a task 
// route   POST render it to the route api/todos

async function createTask(req , res) {
    try {
     
       const body = await getPostData(req)
   
       const {title ,description, status} = JSON.parse(body)

       const task = {
           title,
           description,
           status
       }
       console.log(task)
       const newTask = await Tasks.create(JSON.parse(body))
       res.writeHead(201 , {'Content-Type' : 'application/json' })
       return res.end(JSON.stringify(newTask))

    } catch (error) {
        console.log("lelle " , error)
    }
}

//  desc   update a task 
// route   PUT render it to the route api/todos/:id

async function updateTask(req , res , id) {
    try {
      const task = await Tasks.findById(id)

      if (!task) {
        res.writeHead(404, {'Content-Type' : 'application/json'})
        res.end(JSON.stringify({message : "particular task not found"}))

    } else {
        
        const body = await getPostData(req)
        console.log(`here is the body in the contoller ${body} ${typeof(body)} ${typeof(JSON.stringify(body))} `)
        const {title ,description, status} = JSON.parse(body)
 
        const taskData = {
            title : title || task.title,
            description: description || task.description,
            status : status || task.status
        }
        
        console.log("task data",taskData)
        const updTask = await Tasks.update(id,taskData)

        res.writeHead(200 , {'Content-Type' : 'application/json' })
        return res.end(JSON.stringify(updTask))
    }

    } catch (error) {
        console.log(error)
    }
}

//  desc   delete a task 
// route   DELETE render it to the route api/todo/:id

async function deleteTask(req ,res , id){
    try {
        const task = await Tasks.remove(id) 

        res.writeHead(200, {'Content-Type' : 'application/json'})
        res.end(JSON.stringify(task))

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
}

