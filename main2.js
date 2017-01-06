'use strict';
const ReadPrecomputedSolutionArray = require('./SolutionCandidateIO').ReadPrecomputedSolutionArray;
const CheckAdjacencyConditionsOfSolutionArray = require('./SolutionCandidateAlgorithms').CheckAdjacencyConditionsOfSolutionArray;

const precomputedArray = ReadPrecomputedSolutionArray();

CheckAdjacencyConditionsOfSolutionArray(precomputedArray);
