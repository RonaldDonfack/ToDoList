
const Tasks  = require('../model/taskmodel')

const { getPostData } = require('../utlis')

async function  getAllTasks(req , res) {
    try {
        const tasks = await Tasks.findTasks()

     
        res.writeHead(200, {'Content-Type' : 'application/json'})
        res.end(JSON.stringify(tasks))

    } catch (error) {
        console.log(error)
    }
}

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

//  desc   create a product 
// route   POST render it to the route api/products

async function createTask(req , res) {
    try {
   
       const body = await getPostData(req)

       const {title ,description, status} = JSON.parse(body)

       const task = {
           title,
           description,
           status
       }
       const newTask = await Tasks.create(task)
       res.writeHead(201 , {'Content-Type' : 'application/json' })
       return res.end(JSON.stringify(newTask))

    } catch (error) {
        console.log(error)
    }
}

//  desc   update a product 
// route   PUT render it to the route api/products/:id

async function updateTask(req , res , id) {
    try {
      const task = await Tasks.findById(id)

      if (!task) {
        res.writeHead(404, {'Content-Type' : 'application/json'})
        res.end(JSON.stringify({message : "particular product not found"}))

    } else {
        
        const body = await getPostData(req)
 
        const {title ,description, status} = JSON.parse(body)
 
        const taskData = {
            title : title || task.title,
            description: description || task.description,
            status : status || task.status
        }
        const updTask = await Tasks.update(id,taskData)

        res.writeHead(200 , {'Content-Type' : 'application/json' })
        return res.end(JSON.stringify(updTask))
    }

    } catch (error) {
        console.log(error)
    }
}

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