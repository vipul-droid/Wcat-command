#!/usr/bin/env node


let fs = require("fs");

(function(){
    let cmd = process.argv.slice(2);

let options= [];
let files = [];
let str = ``; 
for(let i=0; i< cmd.length; i++){
    if(cmd[i].startsWith("-")){
        options.push(cmd[i]);
    }
    else {
        files.push(cmd[i])
    }
}

for(let j=0; j<files.length; j++){
    if(fs.existsSync(files[j])){
        str += fs.readFileSync(files[j]).toString();
    } 
    else{
        console.log("invalide input")
        return;
    }

}

str = str.split("\n")

if(options.includes("-s")){
   str = removeLargeSpace(str);

}

if(options.includes("-n") && options.includes("-b")){
    if(options.indexOf("-n")>options.indexOf("-b")){
        // -b will implement
        str = addNonEmptyNun(str);
    }else{
        // -n will implement
        str = addAllNumber(str);
    }
}else{
    if(options.indexOf("-n")){
        // -n will implement
        str = addAllNumber(str);   
    }
    else if(options.indexOf("-b")){
        // -b will implement
        str = addNonEmptyNun(str);
    }
}

str = str.join("\n");

console.log(str);


})();
// console.log(files);
// console.log(options);

function removeLargeSpace(x){
    let y = [];
    let flag = false;
    for(let i=0; i<x.length; i++){
    if(x[i]==='' || x[i]==="\r"){
       if(flag  == true){
           continue;
       }
       else{
           y.push(x[i]);
           flag= true;
       }
    }
    else{
        y.push(x[i]);
        flag = false;
    }
   }
   return y;
}

function addAllNumber(arr){
    for(let i=1; i<=arr.length; i++){
        arr[i-1] = i + " " + arr[i-1]
    }
    return arr;
}

function addNonEmptyNun(arr){
    let lineNumber = 1;
    for(let i=0; i<arr.length; i++){
        if(arr[i] !== "" && arr[i] !=="\r"){
            arr[i] = lineNumber +" "+arr[i];
            lineNumber++;
        }
    }
    return arr;
}
