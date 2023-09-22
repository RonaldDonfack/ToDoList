let allTask  = require('../todos/task.json')

const {writeDataToFile} = require('../utlis')
const {v4 : uuidv4} = require('uuid')

function findTasks () {
   return new Promise((resolve, reject) => {
        resolve(allTask)
    })
}

function findById (id) {
    return new Promise((resolve, reject) => {
        const taskFound = allTask.find(task => task.id.toString() === id.toString());
        resolve(taskFound)
    })
}

function create(task){
    return new Promise((resolve ,reject) => {
        const newTask = {id : uuidv4() , ...task}
        allTask.push(newTask)
        writeDataToFile('./todos/task.json' , allTask )
        resolve(newTask)
    })
}

function update(id , task){
    return new Promise((resolve ,reject) => {
        const index = allTask.findIndex(t => t.id.toString() === id.toString())
        allTask[index] = {id , ...task}
        writeDataToFile('./todos/task.json' , allTask )
        resolve(allTask[index])
    })
}
function remove(id) {
    return new Promise ((resolve ,reject )=>{
        allTask = allTask.filter(t => t.id.toString() !== id.toString())

        writeDataToFile('./todos/task.json' , allTask )
        resolve()

    })
}
module.exports = {
    findTasks,
    findById,
    create,
    update,
    remove
}