# Evolutionary Algorithm in Deno
Need to write an algorithm to format al lot of data according to a bunch of condition? Worry not, write an Evolutionary Algorithm that does the job for you.

## usage
```ts
  evolutionaryAlgorithm<DATATYPE>(
    starting_population:DATATYPE[],//the values the algorithm starts out with
    validate:(DATATYPE)=>number,//a function that grades a value; where higher means better
    mutate:(DATATYPE,n:number)=>DATATYPE,//a function randomly mutes the Data n amount of times; Note that for object type Datatypes a deep clone is required.
    mutations:number,//amount of mutations per Datatype per Generation
    generations:number,//amount of generation to run for
    stratergy: Strategy,//the evolution stratergy used
    report: boolean//wether to log reports of evolution to the console; May slowdown evolution;
  );
```

## Simple Example
in this example we're going to estimate PI with the power of Evolutionary Algorithms

```ts
import {evolutionaryAlgorithm,Strategy} from "https://deno.land/x/evo_alg@1.0.0/mod.ts"

//let's firstly create our inital guesses (they don’t have to be accurate)
let starting_population:number[] = [];
for(let i=0;i<100;++i){
    starting_population.push(Math.random()*6);
}
//next, a validation function giving a score between -infinity and 1; where 1 is the score the algorithm tries to achieve
function validate(value:number){
    return -Math.abs(value - Math.PI) + 1;
}
//a function that gives our current value a random mutation
function mutate(value:number,amount:number){
    let n = value;
    for(let i=0;i<amount;++i){
        n+=Math.random();
    }
    return n
}
//now run the algorithm
const result = evolutionaryAlgorithm<number>(starting_population,validate,mutate,1,10,Strategy.FithyFithy,true);
//and see the results for yourself
console.log(result[0].data);
```
