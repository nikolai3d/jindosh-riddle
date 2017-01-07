# JINDOSH RIDDLE SOLVER in NODE.JS

A fun coding exercise to brute-force the infamous Jindosh Riddle from Dishonored 2.

# Building

Transpile the source files using Babel:
```
$ npm run-script build
```

# Running

```
$ node build/main.js
```

Using parallel computation, computes the `validSolutionsParallel.json`,
which includes all the solutions for Single-Slice conditions, not the adjacency conditions.

**WARNING THIS TAKES A LONG TIME. THE MORE CORES YOU HAVE THE BETTER**

Once you have the `validSolutionsParallel.json` file, run:
```
$ node build/main2.js
```
which checks all the valid single-slice solutions for adjacency conditions.
