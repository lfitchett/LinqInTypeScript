import { LinqIterable } from "./linq";

let test = LinqIterable.FromIterable([1, 2, 3, 4, 5, 6]);
console.log(test.ToString());

test = test.map(x => x * 3);
console.log(test.ToString());

test = test.filter(x => x > 10);
console.log(test.ToString());

console.log(LinqIterable.Range(5).ToString());
console.log(LinqIterable.Range(5, 10).ToString());

console.log(LinqIterable.Range(6.778).ToString());
console.log(LinqIterable.Range(3.4335, 8.554).ToString());