'use strict';
const MainAlgorithms = require('./MainAlgorithms');


MainAlgorithms.ParallelComputeSingleSliceValidSolutions().then(()=>{}).catch((e) => { console.error("REJECTED",e);});

