const http = require('http')

const controller = require('./controller/controller')

const server = http.createServer( (req, res) => {
    
    if (req.url === '/api/todos' && req.method === "GET"){
      controller.getAllTasks(req , res)
    }
    else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "GET"){
       
        const idd = req.url.split('/')[3]
      
        controller.getTaskById(req,res,idd)
      
    }
    else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "DELETE"){
       
        let idd = req.url.split('/')[3]
      
        controller.deleteTask(req, res, idd)
    }
    else if(req.url === '/api/todos' && req.method === 'POST'){
        controller.createTask(req , res)

    }
    else if(req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === 'PUT'){
        
        const id = req.url.split('/')[3]
        controller.updateTask(req, res , id)
    }
    else{
        res.writeHead(404 , {'Content-Type' : 'application/json'});
        res.end(JSON.stringify({message : "Task not found"}))
    }
})

const port = process.env.port || 5000

server.listen(port , () => console.log(`server started on port ${port}`) )



