
'use strict';

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

module.exports = { Permutation }