export enum Strategy{
    //kill the worst 50% and mutate the rest
    FithyFithy
}
export function evolutionaryAlgorithm<DataType>(start_data:DataType[],validate:(value:DataType)=>number,mutate:(value:DataType,amount:number)=>DataType,mutations=1,generations=100,strategy=Strategy.FithyFithy,report=false){
    if((start_data.length & 1) === 1)throw "The starting population cannot be an uneven number";
    const fithy_percent = Math.floor(start_data.length * 0.5);
    let storage:{data:DataType,score:number}[] = start_data.map(e=>{return{"data":e,"score":validate(e)}});
    for(let i =0;i<generations;++i){
        let temp_storage = storage.sort((a,b)=>a.score < b.score?1:-1).slice(0,fithy_percent);
        storage = temp_storage.concat(temp_storage.map(e=>{
            let dat = mutate(e.data,mutations);
            return {"data":dat, "score":validate(dat)}
        }));
        if(report){
            const order = storage.sort((a,b)=>a.score < b.score?1:-1).map(e=>e.score);
            const average = order.reduce((total,value)=>total+value) / order.length;
            const highest = Math.max(...order);
            const lowest = Math.min(...order);
            console.log(`Generation ${i+1} | highest ${highest} | average ${average}  | lowest ${lowest}`);
        }
    }
    
    return storage.sort((a,b)=>a.score < b.score?1:-1)
}
