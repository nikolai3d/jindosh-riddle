'use strict';

const Permutation = require("./Permutation").Permutation;
const HorizontalSlice = require("./HorizontalSlice").HorizontalSlice;

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

    
    // CheckSolution(){

    //   for (var i=0;i<5;i++) {
    //     this._horizontalSlice.set(this.ladyPermutation.at(i),
    //                                 this.spotPermutation.at(i),
    //                                 this.colorPermutation.at(i),
    //                                 this.originPermutation.at(i),
    //                                 this.drinkPermutation.at(i),
    //                                 this.heirloomPermutation.at(i));
                                    
    //   var singleSliceOK = this._horizontalSlice.CheckSingleSliceConditions();
    //     if (!singleSliceOK) {
    //       return false;
    //     }
  
    //   }
      
    //   return true;
    // }
    
    
    // CheckAdjacencyConditions() {
    //   // this.Print();
    //   const sliceArray = [];
    //   for (var i=0;i<5;i++) {
    //     const newSlice = new HorizontalSlice();
    //     newSlice.set(this.ladyPermutation.at(i),
    //                 this.spotPermutation.at(i),
    //                 this.colorPermutation.at(i),
    //                 this.originPermutation.at(i),
    //                 this.drinkPermutation.at(i),
    //                 this.heirloomPermutation.at(i));
                                    
    //     sliceArray.push(newSlice);
        
    //   }
    //   return CheckAdjacencyConditions(sliceArray);    
    // }
    
    
    Print() {
     for (var i=0;i<5;i++) {
        this.PrintSlice(i);
       }   
    }
    
    // WriteSlices(name) {
    //   fs.appendFileSync(name, JSON.stringify(this)+"\n","utf-8", function(err) { console.log("WRITTEN",err);});
    // }
    // AsyncWrite(name) {
    //   fs.appendFileSync(name, JSON.stringify(this)+"\n","utf-8", function(err) { console.log("WRITTEN",err);});
    // }
}

module.exports = { SolutionCandidate };