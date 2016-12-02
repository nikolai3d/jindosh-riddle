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


module.exports = {CheckSingleSliceConditions};