
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
                
                console.log("Percentage: ", (current/total)*100, "%");
                console.log("Solutions Found: ", successCount);
                console.log("Elapsed Time: ", Math.round(elapsedMS/(1000)), " sec");
                console.log("Remaining Time: ", Math.round(remainingCalcMS/(1000*60)), " min");
                console.log("Remaining Time: ", Math.round(remainingCalcMS/(1000*60*60)), " hrs");
  
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


module.exports = { ComputeSingleSliceValidSolutions };