'use strict';

const allcombinations = require('allcombinations')
const fs = require('fs');
//console.log(Array.from(allcombinations([0, 1, 2, 3, 4])));

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
    

class Permutation {
    constructor() {
      this.itemsArray = [];
      this.indicesArray = [];
    }

    set(itemsArray, indicesArray) {
      this.itemsArray = itemsArray;
      this.indicesArray = indicesArray;
    }
    
    at(i) {
      const index = this.indicesArray[i];
      return this.itemsArray[index];
    }
    
    printable_at(i) {
     var toPrint = ""; 
     const stringv = this.at(i).toString();
        if (stringv.length >= 8) {
            toPrint += (stringv+"\t");
        } else {
            toPrint += (stringv+"\t\t");
        }
        return toPrint;
    }
}

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
  
class HorizontalSlice {
  
  constructor() {
    this.lady = null;
    this.spot = null;
    this.color = null;
    this.origin = null;
    this.drink = null;
    this.heirloom = null;
  }
  
  set(lady, spot, color, origin, drink, heirloom) {
    this.lady = lady;
    this.spot = spot;
    this.color = color;
    this.origin = origin;
    this.drink = drink;
    this.heirloom = heirloom;
  }
  
  
  
  Check(checkJSON) {
    var conditionCheck = [];
    for (let propIndex in checkJSON) {

      if (!this.hasOwnProperty(propIndex)) {
        console.error("BAD JSON PROPERTY", propIndex);
      }
      if (this[propIndex] === checkJSON[propIndex]) {
        conditionCheck.push(true);
      } else {
        conditionCheck.push(false);
      }
    }
    
    if (conditionCheck.length === 0){
      return true;
    }
    
    var and_check = conditionCheck[0];
    var or_check = conditionCheck[0];
    
    for (var k=1;k<conditionCheck.length;k++){
      and_check = and_check && conditionCheck[k];
      or_check = or_check || conditionCheck[k];
    }
    
    if (and_check === or_check) {
      return true;
    } else {
      return false;
    }
    
  }
  
  CheckSingleSliceConditions() {
    var check = false;
    for (var condition of gSingleSliceConditions) {
      check = this.Check(condition);
        if (!check) return false;
    }

    return true; 
  }
}

class SolutionCandidate {
   constructor() {
        this.ladyPermutation = null;
        this.spotPermutation = null;
        this.colorPermutation = null;
        this.originPermutation = null;
        this.drinkPermutation = null;
        this.heirloomPermutation = null;
        this._horizontalSlice = new HorizontalSlice();
    }

    set(ladyPermutation, spotPermutation, colorPermutation, originPermutation, drinkPermutation, heirloomPermutation) {
        this.ladyPermutation = ladyPermutation;
        this.spotPermutation = spotPermutation;
        this.colorPermutation = colorPermutation;
        this.originPermutation = originPermutation;
        this.drinkPermutation = drinkPermutation;
        this.heirloomPermutation = heirloomPermutation;
    }
    
    Printable(property, i){
        
    }
    
    PrintSlice(i) {
      var fullToPrint = "";
      fullToPrint += this.ladyPermutation.printable_at(i);
      fullToPrint += this.spotPermutation.printable_at(i);
      fullToPrint += this.colorPermutation.printable_at(i);
      fullToPrint += this.originPermutation.printable_at(i);
      fullToPrint += this.drinkPermutation.printable_at(i);
      fullToPrint += this.heirloomPermutation.printable_at(i);
      
      console.log(fullToPrint);
    }

    
    CheckSolution(){

      for (var i=0;i<5;i++) {
        this._horizontalSlice.set(this.ladyPermutation.at(i),
                                    this.spotPermutation.at(i),
                                    this.colorPermutation.at(i),
                                    this.originPermutation.at(i),
                                    this.drinkPermutation.at(i),
                                    this.heirloomPermutation.at(i));
                                    
      var singleSliceOK = this._horizontalSlice.CheckSingleSliceConditions();
        if (!singleSliceOK) {
          return false;
        }
  
      }
      
      return true;
    }
    
    Print() {
     for (var i=0;i<5;i++) {
        this.PrintSlice(i);
       }   
    }
    
    WriteSlices(name) {
      fs.appendFileSync(name, JSON.stringify(this)+"\n","utf-8", function(err) { console.log("WRITTEN",err);});
    }
    AsyncWrite(name) {
      fs.appendFileSync(name, JSON.stringify(this)+"\n","utf-8", function(err) { console.log("WRITTEN",err);});
    }
}

// {
// const lp = new Permutation(ladyArray, noPermutationIndexArray);
// const sp = new Permutation(spotArray, noPermutationIndexArray);
// const cp = new Permutation(colorArray, noPermutationIndexArray);
// const op = new Permutation(originArray, noPermutationIndexArray);
// const dp = new Permutation(drinkArray, noPermutationIndexArray);
// const hp = new Permutation(heirloomArray, noPermutationIndexArray);

// const solution = new SolutionCandidate(lp, sp, cp, op, dp, hp);

// solution.Print();

// const slice = solution.CreateSlice(0);

// //slice.CheckSliceConditions();

// var checkTrue = slice.Check({"lady": "Doctor Marcolla", "spot": 1});

// console.log("CHECK TRUE: ", checkTrue);
// var checkFalse = slice.Check({"lady": "Doctor Marcolla", "spot": 2});

// console.log("CHECK False: ", checkFalse);
// checkTrue = slice.Check({"lady": "Baroness Finch", "spot": 2});

// console.log("CHECK TRUE: ", checkTrue);

// checkFalse = solution.CheckSolution();
// console.log("SOLUTION CHECK False: ", checkFalse);

// solution.AsyncWrite("./test.json");
// }

const kPossibleFivePermutations = Array.from(allcombinations([0, 1, 2, 3, 4]));

const total = Math.pow(kPossibleFivePermutations.length, 5);
console.log("Total space to check: ", total);
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

sp.set(spotArray, noPermutationIndexArray);

for (var ladyPermutation of kPossibleFivePermutations){

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

            const valid = solution.CheckSolution();

            current = current + 1.0;
            if (current % 1000000 === 0){

              var sample = new Date().getTime();
              var elapsedMS = sample - start;
              
              var perCalcMS = elapsedMS/current;
              var remainingCalcMS = (total - current) * perCalcMS;
              
              console.log("Percentage: ", (current/total)*100, "%");
              console.log("Elapsed Time: ", Math.round(elapsedMS/(1000)), " sec");
              console.log("Remaining Time: ", Math.round(remainingCalcMS/(1000*60)), " min");
              console.log("Remaining Time: ", Math.round(remainingCalcMS/(1000*60*60)), " hrs");
              console.log("Remaining Time: ", Math.round(remainingCalcMS/(1000*60*60*24)), " days");
            }
            
            if (valid) {
              successCount = successCount + 1;
              solution.Print();
              solution.AsyncWrite("./solution"+successCount.toString()+".json");
            }    
          }
        }
 
      }
    }
  }
}