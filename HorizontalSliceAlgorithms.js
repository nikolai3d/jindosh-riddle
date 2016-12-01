'use strict';

const gSingleSliceConditions = [
  {"lady": "Doctor Marcolla", "spot": 1},
  {"spot": 2, "color": "White"},
  {"spot": 3, "drink": "Wine"},
  {"lady": "Countess Contee", "drink": "Beer"},
  {"color": "Green", "origin": "Karnaca"},
  {"origin": "Dunwall", "drink": "Whiskey"},
  {"origin": "Fraeport", "heirloom": "Diamond"},
  {"lady": "Lady Winslow", "origin": "Baleton"},
  {"lady": "Baroness Finch", "color": "Purple"},
  {"lady": "Madam Natsiou", "heirloom": "Ring"},
  {"color": "Red", "drink": "Absinthe"}
  ];
  
function CheckSingleSliceConditions(iHorizontalSlice) {
    var check = false;
    for (var condition of gSingleSliceConditions) {
      check = iHorizontalSlice.Check(condition);
        if (!check) return false;
    }

    return true; 
  }

/* iSliceObject - preallocated HorizontalSlice Object */

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

module.exports = {CheckSingleSliceConditions};