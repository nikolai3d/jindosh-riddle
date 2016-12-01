'use strict';


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



module.exports = { CheckAdjacencyConditions };