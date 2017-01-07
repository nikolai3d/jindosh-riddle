'use strict';
const MainAlgorithms = require('./MainAlgorithms');


MainAlgorithms.ParallelComputeSingleSliceValidSolutions()
.then(()=>{

})
.catch((e) => {
  console.error("Algorithm 1/2 Failed: ",e);
});
