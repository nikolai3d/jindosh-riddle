'use strict';

const allcombinations = require('allcombinations')
 
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
    constructor(itemsArray, indicesArray) {
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

class HorizontalSlice {
  constructor(lady, spot, color, origin, drink, heirloom) {
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
    
    var check1 = this.Check({"lady": "Doctor Marcolla", "spot": 1});
    var check2 = this.Check({"spot": 2, "color": "White"});
    var check3 = this.Check({"spot": 3, "drink": "Wine"});
    var check4 = this.Check({"lady": "Countess Contee", "drink": "Beer"});
    var check5 = this.Check({"color": "Green", "origin": "Karnaca"});
    var check6 = this.Check({"origin": "Dunwall", "drink": "Whiskey"});
    var check7 = this.Check({"origin": "Fraeport", "heirloom": "Diamond"});
    
    var check8 = this.Check({"lady": "Lady Winslow", "origin": "Baleton"});
    var check9 = this.Check({"lady": "Baroness Finch", "color": "Purple"});
    var check10 = this.Check({"lady": "Madam Natsiou", "heirloom": "Ring"});
  
    var check11 = this.Check({"color": "Red", "drink": "Absinthe"});
 
    return check1 && check2 && check3 && check4 && check5 && check6 && check7 && check8 && check9 && check10 && check11;
  }
}

class SolutionCandidate {
    constructor(ladyPermutation, spotPermutation, colorPermutation, originPermutation, drinkPermutation, heirloomPermutation) {
        this.ladyPermutation = ladyPermutation;
        this.spotPermutation = spotPermutation;
        this.colorPermutation = colorPermutation;
        this.originPermutation = originPermutation;
        this.drinkPermutation = drinkPermutation;
        this.heirloomPermutation = heirloomPermutation;
        this._horizontalSlices = [];
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
    CreateSlice(i){
      const newSlice = new HorizontalSlice(this.ladyPermutation.at(i),
                                          this.spotPermutation.at(i),
                                          this.colorPermutation.at(i),
                                          this.originPermutation.at(i),
                                          this.drinkPermutation.at(i),
                                          this.heirloomPermutation.at(i));
      return newSlice;
    }
    
    CheckSolution(){
      this._horizontalSlices = [];
      for (var i=0;i<5;i++) {
        this._horizontalSlices.push(this.CreateSlice(i));
      }
      
      
      for (var i=0;i<5;i++) {
        var singleSliceOK = this._horizontalSlices[i].CheckSingleSliceConditions();
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
    
}

const lp = new Permutation(ladyArray, noPermutationIndexArray);
const sp = new Permutation(spotArray, noPermutationIndexArray);
const cp = new Permutation(colorArray, noPermutationIndexArray);
const op = new Permutation(originArray, noPermutationIndexArray);
const dp = new Permutation(drinkArray, noPermutationIndexArray);
const hp = new Permutation(heirloomArray, noPermutationIndexArray);

const solution = new SolutionCandidate(lp, sp, cp, op, dp, hp);

solution.Print();

const slice = solution.CreateSlice(0);

//slice.CheckSliceConditions();

var checkTrue = slice.Check({"lady": "Doctor Marcolla", "spot": 1});

console.log("CHECK TRUE: ", checkTrue);
var checkFalse = slice.Check({"lady": "Doctor Marcolla", "spot": 2});

console.log("CHECK False: ", checkFalse);
checkTrue = slice.Check({"lady": "Baroness Finch", "spot": 2});

console.log("CHECK TRUE: ", checkTrue);

checkFalse = solution.CheckSolution();
console.log("SOLUTION CHECK False: ", checkFalse);


const kPossibleFivePermutations = Array.from(allcombinations([0, 1, 2, 3, 4]));

const total = Math.pow(kPossibleFivePermutations.length, 6);
console.log("Total space to check: ", total);
let current = 0.0;

for (var ladyPermutation of kPossibleFivePermutations){

  const lp = new Permutation(ladyArray, ladyPermutation);

  for (var spotPermutation of kPossibleFivePermutations){
    const sp = new Permutation(spotArray, spotPermutation);
  
    for (var colorPermutation of kPossibleFivePermutations){
      const cp = new Permutation(colorArray, colorPermutation);
      
      for (var originPermutation of kPossibleFivePermutations){
        const op = new Permutation(originArray, originPermutation);
 
        for (var drinkPermutation of kPossibleFivePermutations){
          const dp = new Permutation(drinkArray, drinkPermutation);

          for (var heirloomPermutation of kPossibleFivePermutations){
            const hp = new Permutation(heirloomArray, heirloomPermutation);

            const solution = new SolutionCandidate(lp, sp, cp, op, dp, hp);

            const valid = solution.CheckSolution();
            
            current = current + 1.0;
            if (current % 100000 === 0){
              console.log("Percentage: ", (current/total)*100, "%");
            }
            if (valid) {
              solution.Print();
              process.exit(0);
            }    
          }
        }
 
      }
    }
  }
}