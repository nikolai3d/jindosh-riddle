# JINDOSH RIDDLE SOLVER in NODE.JS

A fun coding exercise to brute-force the infamous Jindosh Riddle from Dishonored 2.

# Building

Transpile the source files using Babel:
```
$ npm run-script build
```

# Sustained Building during development

If you are altering the code, watch/build script should be ran in the separate terminal window to automatically transpile the result as the source-es6/ files are being changed:
```
$ npm run-script watch
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
