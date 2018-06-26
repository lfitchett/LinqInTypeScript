"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const linq_1 = require("./linq");
let test = linq_1.LinqIterable.FromIterable([1, 2, 3, 4, 5, 6]);
console.log(test.ToString());
test = test.map(x => x * 3);
console.log(test.ToString());
test = test.filter(x => x > 10);
console.log(test.ToString());
console.log(linq_1.LinqIterable.Range(5).ToString());
console.log(linq_1.LinqIterable.Range(5, 10).ToString());
console.log(linq_1.LinqIterable.Range(6.778).ToString());
console.log(linq_1.LinqIterable.Range(3.4335, 8.554).ToString());
//# sourceMappingURL=index.js.map