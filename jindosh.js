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
    
    set_from_parsed_json(iData){

      this.itemsArray = iData.itemsArray;
      this.indicesArray = iData.indicesArray;

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

function FindSliceBy(iSliceArray, keyValPair){
  
  const keyValPairArray =  Object.keys(keyValPair);
  
  if (keyValPairArray.length!==1) {
    throw new Error("Can only search slices by one key");
  }
  
  const key = keyValPairArray[0];
  const valueToSearch = keyValPair[key];
  
 
   for (var slice of iSliceArray) {
    if (!slice.hasOwnProperty(key)) {
      throw new Error("Bad Key " + key + ", Slice Doesn't have it");
    }
    if (slice[key] === valueToSearch) {
      return slice;
    }
   }
  
  throw new Error("Cannot find slice by keyval "+JSON.stringify(keyValPair), " bad value or bad slice array");
}

function CheckAdjacencyConditions(iSliceArray){
  if (iSliceArray.length !== 5) {
    throw new Error("Bad Solution Slice Array");
  }
  
  //The lady in red sat to the left of someone in blue
  const ladyInRed = FindSliceBy(iSliceArray, {"color": "Red"});
  const ladyInBlue = FindSliceBy(iSliceArray, {"color": "Blue"});
  
  if (ladyInRed.spot - ladyInBlue.spot !== -1) {
    return false; 
  }
  
 
  //When one of the dinner guests bragged about her War Medal, 
  //the woman next to her said they were finer in Karnaca where she lived 
  const ladyWithWarMedal =  FindSliceBy(iSliceArray, {"heirloom": "War Medal"});
  const ladyFromKarnaca =  FindSliceBy(iSliceArray, {"origin": "Karnaca"});

  if (Math.abs(ladyWithWarMedal.spot-ladyFromKarnaca.spot)!==1){
    return false;
  }

  // Someone carried a Bird Pendant, and when she saw it, a visitor from Dabokva next to her almost spiller her neighbour's Rum
  const ladyFromDabokva =  FindSliceBy(iSliceArray, {"origin": "Dabokva"});
  const ladyWithRum = FindSliceBy(iSliceArray, {"drink": "Rum"});
  const ladyWithBirdPendant = FindSliceBy(iSliceArray, {"heirloom":"Bird Pendant"});
  
  if (Math.abs(ladyFromDabokva.spot-ladyWithRum.spot)!==1){
    return false;
  }
  
  if (Math.abs(ladyFromDabokva.spot-ladyWithBirdPendant.spot)!==1){
    return false;
  }
  
  
  return true;
  
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
    
    set_from_parsed_json(iData){
      const ladyPermutation = new Permutation(); 
      ladyPermutation.set_from_parsed_json(iData.ladyPermutation);
      
      const spotPermutation = new Permutation(); 
      spotPermutation.set_from_parsed_json(iData.spotPermutation);
      
      const colorPermutation = new Permutation(); 
      colorPermutation.set_from_parsed_json(iData.colorPermutation);
      
      const originPermutation = new Permutation(); 
      originPermutation.set_from_parsed_json(iData.originPermutation);
      
      const drinkPermutation = new Permutation(); 
      drinkPermutation.set_from_parsed_json(iData.drinkPermutation);
      
      const heirloomPermutation = new Permutation();  
      heirloomPermutation.set_from_parsed_json(iData.heirloomPermutation);
      
      this.set(ladyPermutation, spotPermutation, colorPermutation, originPermutation, drinkPermutation, heirloomPermutation);
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
    
    
    CheckAdjacencyConditions() {
      // this.Print();
      const sliceArray = [];
      for (var i=0;i<5;i++) {
        const newSlice = new HorizontalSlice();
        newSlice.set(this.ladyPermutation.at(i),
                     this.spotPermutation.at(i),
                     this.colorPermutation.at(i),
                     this.originPermutation.at(i),
                     this.drinkPermutation.at(i),
                     this.heirloomPermutation.at(i));
                                    
        sliceArray.push(newSlice);
        
      }
      return CheckAdjacencyConditions(sliceArray);    
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


function ComputeSingleSliceValidSolutions() {
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
  const singleSliceValidSolutions = [];
  
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
                //solution.AsyncWrite("./solution"+successCount.toString()+".json");
                
                const solutionDataDeepCopy = JSON.parse(JSON.stringify(solution));
                
                singleSliceValidSolutions.push(solutionDataDeepCopy);
                
                fs.writeFileSync("./validSolutions.json", JSON.stringify(singleSliceValidSolutions), "utf-8");
              }    
            }
          }
        }
      }
    }
  }

  return singleSliceValidSolutions;
}

function ReadValidSolutions() {
  const fileContentString = fs.readFileSync("./validSolutions.json", { encoding: "utf-8", flag: 'r'});
  const arrayData = JSON.parse(fileContentString);
 
  const singleSliceValidSolutions = [];
  for (var solution of arrayData) {
    const solutionObject = new SolutionCandidate();
    
 
    solutionObject.set_from_parsed_json(solution);
    singleSliceValidSolutions.push(solutionObject);
  }
  
  return singleSliceValidSolutions;
}

function RecheckSingleSliceValidSolutions(iSingleSliceValidSolutions){
  for (var solution of iSingleSliceValidSolutions) {
    const valid = solution.CheckSolution();
    
    if (!valid) {
       console.error("Solution Single-Slice invalid error! Bad Input");
    }
  }
}

function CheckSolutionsAdjacencyConditions(iSingleSliceValidSolutions){
  for (var solution of iSingleSliceValidSolutions) {
    const valid = solution.CheckAdjacencyConditions();
    
    if (valid) {
      console.log("Adjacency Solution Valid, SOLUTION FOUND:");
      solution.Print();
    }
  }
}

//ComputeSingleSliceValidSolutions();

const precomputedSolutions = ReadValidSolutions();

RecheckSingleSliceValidSolutions(precomputedSolutions);

CheckSolutionsAdjacencyConditions(precomputedSolutions);

process.exit(0);
