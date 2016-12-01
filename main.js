'use strict';
const numCPUs = require('os').cpus().length;
const cluster = require('cluster');
const MainAlgorithms = require('./MainAlgorithms');
const fs = require('fs');

const singleSliceValidSolutions = [];
 
function messageHandler(msg) {
    if (msg.cmd && msg.cmd == 'foundSolution') {
       const solutionDataDeepCopy = JSON.parse(msg.solution);
            
      singleSliceValidSolutions.push(solutionDataDeepCopy);
      console.log("GOT SOLUTION");
      fs.writeFileSync("./validSolutionsParallel.json", JSON.stringify(singleSliceValidSolutions), "utf-8");
    }
  }
  

if (cluster.isMaster) {
  // Fork workers.
  console.log("CPU", numCPUs);
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork({"workerID": i});
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
  
   Object.keys(cluster.workers).forEach((id) => {
    cluster.workers[id].on('message', messageHandler);
  });
  console.log("Master setup complete");
  
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  // http.createServer((req, res) => {
  //   res.writeHead(200);
  //   res.end('hello world\n');
  // }).listen(8000);

  
  console.log("CHILD", cluster.worker.id);
  
  MainAlgorithms.ComputeSingleSliceValidSolutions(cluster.worker.id-1, numCPUs);
  
  process.exit(0);
}
