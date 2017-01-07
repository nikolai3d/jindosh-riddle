
import ReadPrecomputedSolutionArray from "./solution-candidate-io";
import { CheckAdjacencyConditionsOfSolutionArray } from "./solution-candidate-algorithms";

try {
  const precomputedArray = ReadPrecomputedSolutionArray();
  CheckAdjacencyConditionsOfSolutionArray(precomputedArray);
} catch(e) {
  console.error("Algorithm 2/2 failed: ", e);
}
