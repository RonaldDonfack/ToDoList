const http = require("http");
const controller = require("./controller/controller");

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    " OPTIONS, GET, POST, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/api/todos" && req.method === "GET") {
    controller.getAllTasks(req, res);
    console.log(res.statusCode)
  } else if (req.url.match(/\/api\/todos\/(\w+)/) && req.method === "GET") {
    const idd = req.url.split("/")[3];
    controller.getTaskById(req, res, idd);
  } else if (
    req.url.match(/\/api\/todo\/(\w+)/) && (req.method === "DELETE" || req.method === "OPTIONS")
  ) {
    
    let idd = req.url.split("/")[3];
    controller.deleteTask(req, res, idd);
  } else if (req.url === "/api/todos" && (req.method === "POST"  || req.method === "OPTIONS")) {
    controller.createTask(req, res);
    console.log('finished creating')
  } else if (req.url.match(/\/api\/todos\/(\w+)/) && (req.method === "POST"  || req.method === "OPTIONS")) {
    console.log("in updator");

    const id = req.url.split("/")[3];
    controller.updateTask(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Task not found" }));
  }
});

const port = process.env.port || 5000;

server.listen(port, () => console.log(`server started on port ${port}`));
