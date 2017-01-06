'use strict';
const ReadPrecomputedSolutionArray = require('./SolutionCandidateIO').ReadPrecomputedSolutionArray;
const CheckAdjacencyConditionsOfSolutionArray = require('./SolutionCandidateAlgorithms').CheckAdjacencyConditionsOfSolutionArray;

try {
  const precomputedArray = ReadPrecomputedSolutionArray();
  CheckAdjacencyConditionsOfSolutionArray(precomputedArray);
} catch(e) {
  console.error("Algorithm 2/2 failed: ", e);
}
