const CheckSingleSliceConditions = require("./HorizontalSliceAlgorithms").CheckSingleSliceConditions;
const CheckAdjacencyConditions = require("./SliceArrayAlgorithms").CheckAdjacencyConditions;
const HorizontalSlice = require("./HorizontalSlice").HorizontalSlice;

function CheckSingleSliceConditionsOfSolution(iSliceObject, iSolutionCandidate){
 
   for (var i=0;i<5;i++) {
     iSliceObject.set(iSolutionCandidate.ladyPermutation.at(i),
                      iSolutionCandidate.spotPermutation.at(i),
                      iSolutionCandidate.colorPermutation.at(i),
                      iSolutionCandidate.originPermutation.at(i),
                      iSolutionCandidate.drinkPermutation.at(i),
                      iSolutionCandidate.heirloomPermutation.at(i));
                      
   var singleSliceOK = CheckSingleSliceConditions(iSliceObject);
     if (!singleSliceOK) {
       return false;
     }
   }
   
   return true;
}

function CheckAdjacencyConditionsOfSolution(iSolutionCandidate){
  const sliceArray = [];
   for (var i=0;i<5;i++) {
     const newSlice = new HorizontalSlice();
     newSlice.set(iSolutionCandidate.ladyPermutation.at(i),
                  iSolutionCandidate.spotPermutation.at(i),
                  iSolutionCandidate.colorPermutation.at(i),
                  iSolutionCandidate.originPermutation.at(i),
                  iSolutionCandidate.drinkPermutation.at(i),
                  iSolutionCandidate.heirloomPermutation.at(i));
                                 
     sliceArray.push(newSlice);
   }
   
   return CheckAdjacencyConditions(sliceArray);
}

function CheckAdjacencyConditionsOfSolutionArray(iPrecomputedSolutionArray){
  for (var solution of iPrecomputedSolutionArray) {
    const valid = CheckAdjacencyConditionsOfSolution(solution);

    if (valid) {
      console.log("Adjacency Solution Valid, SOLUTION FOUND:");
      solution.Print();
    }
  }
}

module.exports = { CheckSingleSliceConditionsOfSolution,
                   CheckAdjacencyConditionsOfSolutionArray }; 