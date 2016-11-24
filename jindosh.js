'use strict';

const allcombinations = require('allcombinations')
 
console.log(Array.from(allcombinations([0, 1, 2, 3, 4])));

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

class SolutionCandidate {
    constructor(ladyPermutation, spotPermutation, colorPermutation, originPermutation, drinkPermutation, heirloomPermutation) {
        this.ladyPermutation = ladyPermutation;
        this.spotPermutation = spotPermutation;
        this.colorPermutation = colorPermutation;
        this.originPermutation = originPermutation;
        this.drinkPermutation = drinkPermutation;
        this.heirloomPermutation = heirloomPermutation;
    }
    
    Printable(property, i){
        
    }
    Print() {
     for (var i=0;i<5;i++) {
         
        var fullToPrint = "";
        fullToPrint += this.ladyPermutation.printable_at(i);
        fullToPrint += this.spotPermutation.printable_at(i);
        fullToPrint += this.colorPermutation.printable_at(i);
        fullToPrint += this.originPermutation.printable_at(i);
        fullToPrint += this.drinkPermutation.printable_at(i);
        fullToPrint += this.heirloomPermutation.printable_at(i);
        
        console.log(fullToPrint);
        // console.log(this.ladyPermutation.at(i) + "\t" + this.spotPermutation.at(i) + "\t" + this.colorPermutation.at(i) + "\t" +this.originPermutation.at(i) + "\t" + this.drinkPermutation.at(i) + "\t" + this.heirloomPermutation.at(i));
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

