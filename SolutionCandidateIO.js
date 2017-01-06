'use strict'

const SolutionCandidate = require("./SolutionCandidate").SolutionCandidate;
const fs = require('fs');

function ReadPrecomputedSolutionArray() {
  const fileContentString = fs.readFileSync("./validSolutionsParallel.json", { encoding: "utf-8", flag: 'r'});
  const arrayData = JSON.parse(fileContentString);

  const singleSliceValidSolutions = [];
  for (var solution of arrayData) {
    const solutionObject = new SolutionCandidate();


    solutionObject.set_from_parsed_json(solution);
    singleSliceValidSolutions.push(solutionObject);
  }

  return singleSliceValidSolutions;
}

module.exports = {ReadPrecomputedSolutionArray};
