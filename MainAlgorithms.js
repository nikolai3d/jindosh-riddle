'use strict';

const Permutation = require("./Permutation").Permutation;
const HorizontalSlice = require("./HorizontalSlice").HorizontalSlice;
const SolutionCandidate = require("./SolutionCandidate").SolutionCandidate;
const allcombinations = require('allcombinations');
const CheckSingleSliceConditionsOfSolution = require("./SolutionCandidateAlgorithms").CheckSingleSliceConditionsOfSolution;

const noPermutationIndexArray = [0, 1, 2, 3, 4];

const ladyArray = [ "Doctor Marcolla",
                    "Lady Winslow",
                    "Madam Natsiou",
                    "Baroness Finch",
                    "Countess Contee"];

const spotArray = [ 1, 2, 3, 4, 5];

const colorArray = [ "White",
                     "Red",
                     "Green",
                     "Blue",
                     "Purple"];

const originArray = [ "Dabokva",
                      "Baleton",
                      "Karnaca",
                      "Dunwall",
                      "Fraeport"];

const drinkArray = [    "Absinthe",
                        "Rum",
                        "Wine",
                        "Whiskey",
                        "Beer"];


const heirloomArray = [ "Snuff Tin",
                        "Bird Pendant",
                        "Ring",
                        "War Medal",
                        "Diamond" ];




function ComputeSingleSliceValidSolutions(processID, totalProcesses) {
  const kPossibleFivePermutations = Array.from(allcombinations([0, 1, 2, 3, 4]));

  const total = Math.pow(kPossibleFivePermutations.length, 5) / totalProcesses;

  //console.log("Total space to check: ", total);
  let current = 0.0;
  let successCount = 0;

  var start = new Date().getTime();


  const sp = new Permutation();
  const lp = new Permutation();
  const cp = new Permutation();
  const op = new Permutation();
  const dp = new Permutation();
  const hp = new Permutation();
  const solution = new SolutionCandidate();
  const preAllocatedSlice = new HorizontalSlice();

  sp.set(spotArray, noPermutationIndexArray);

  const processSlice = kPossibleFivePermutations.length / totalProcesses;

  if (kPossibleFivePermutations.length % totalProcesses !== 0){
    throw new Error("Bad Processes Number, doesn't split evenly");
  }

  const startIndex = processID*processSlice;
  const endIndex = processID*processSlice + processSlice - 1;

  console.log("Indices ", startIndex, "to", endIndex);
  for (var ladyPermutationIndex = startIndex; ladyPermutationIndex <= endIndex; ladyPermutationIndex += 1){

    const ladyPermutation = kPossibleFivePermutations[ladyPermutationIndex];

    lp.set(ladyArray, ladyPermutation);

    //for (var spotPermutation of kPossibleFivePermutations)
    {

      for (var colorPermutation of kPossibleFivePermutations){
        cp.set(colorArray, colorPermutation);

        for (var originPermutation of kPossibleFivePermutations){
          op.set(originArray, originPermutation);

          for (var drinkPermutation of kPossibleFivePermutations){
            dp.set(drinkArray, drinkPermutation);

            for (var heirloomPermutation of kPossibleFivePermutations){
              hp.set(heirloomArray, heirloomPermutation);

              solution.set(lp, sp, cp, op, dp, hp);

              const valid = CheckSingleSliceConditionsOfSolution(preAllocatedSlice, solution);

              current = current + 1.0;
              if (current % 10000000 === 0){

                var sample = new Date().getTime();
                var elapsedMS = sample - start;

                var perCalcMS = elapsedMS/current;
                var remainingCalcMS = (total - current) * perCalcMS;

                console.log(processID+ " Percentage: ", (current/total)*100, "%", "Solutions Found: ", successCount);
                console.log(processID+ " Time (Elapsed/Remaining), min: ", Math.round(elapsedMS/(1000*60)), Math.round(remainingCalcMS/(1000*60)));
                // console.log("Remaining Time: ", , " min");
                // console.log("Remaining Time: ", Math.round(remainingCalcMS/(1000*60*60)), " hrs");

              }

              if (valid) {

                successCount = successCount + 1;

                solution.Print();

                console.log("==");

                const solutionDataString = JSON.stringify(solution);

                process.send({ cmd: 'foundSolution', solution : solutionDataString });

              }
            }
          }
        }
      }
    }
  }

  console.log("Worker "+ processID+" is done.");
  return;
}


const numCPUs = require('os').cpus().length;
const cluster = require('cluster');
const fs = require('fs');

function ParallelComputeSingleSliceValidSolutions(){
  return new Promise((resolve, reject) => {


    if (cluster.isMaster) {
      // Fork workers.

      const singleSliceValidSolutions = [];
      let workersDone = 0;
      const messageHandler = function (msg) {
      if (msg.cmd && msg.cmd == 'foundSolution') {
        const solutionDataDeepCopy = JSON.parse(msg.solution);

        singleSliceValidSolutions.push(solutionDataDeepCopy);
        console.log("GOT SOLUTION");
        fs.writeFileSync("./validSolutionsParallel.json", JSON.stringify(singleSliceValidSolutions), "utf-8");
        }
      };

      const workerDoneHandler = function (worker, code, signal) {
        console.log(`Worker ${worker.process.pid} died`);
        workersDone += 1;

        if (workersDone === numCPUs) {
          console.log("Last worker finished, resolving");
          resolve(singleSliceValidSolutions);
        }
      };


      console.log("CPU", numCPUs);
      for (var i = 0; i < numCPUs; i++) {
        cluster.fork({"workerID": i});
      }

      cluster.on('exit', workerDoneHandler);

      Object.keys(cluster.workers).forEach((id) => {
        cluster.workers[id].on('message', messageHandler);
      });

      console.log("Master setup complete");

    } else {

      console.log("CHILD", cluster.worker.id);
      try {
        ComputeSingleSliceValidSolutions(cluster.worker.id-1, numCPUs);
        process.exit(0);
      } catch (e) {
        console.error("Child Process exception ", e, e.stack);
        process.exit(-1);
      }
     }


  });
}

module.exports = { ParallelComputeSingleSliceValidSolutions };
