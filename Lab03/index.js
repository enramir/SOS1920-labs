console.log("Hello world!");

var myInteger = 1;
var myString = "1";
var myDouble = 1.0;

var resultSum = myInteger + myDouble;
var result = myInteger + myString;

console.log(resultSum);
console.log(result);

if(myInteger == myString){
	console.log("True");
}else{
	console.log("False");
}

if(myInteger === myString){
	console.log("True");
}else{
	console.log("False");
}

var numbers = [1,2,3,4,5,6];

function log(msg){
	console.log(msg);
}

result2 = new Array();

numbers
	.forEach((n) => {
		var r = n * 2;
       	result2.push(r);
    })

console.log(result2);

var s = numbers
				.filter((n) => {
  					return n > 2;
  				}).map((n) => {
  					return n + 1;
  				}).reduce((a,n) =>{
  					return a + n;
  				})
  
log(s);


var strings = ["pepe", "pepa", "luis"];

strings
	.filter( (s) => {
  	//return true;//Me lo imprime todo.
    return s.match(/pe/g)
}).forEach(log);