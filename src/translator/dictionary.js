module.exports.functionRenames = new Map();
module.exports.functionRenames.set("console.log", "print");
module.exports.functionRenames.set("Math.ceil", ["math.ceil", ["import math"]]);
module.exports.functionRenames.set("Math.floor", ["math.floor", ["import math"]]);
module.exports.functionRenames.set("Math.round", ["math.round", ["import math"]]);
module.exports.functionRenames.set("Math.E", ["math.exp(1)", ["import math"]]);
module.exports.functionRenames.set("Math.exp", ["math.exp", ["import math"]]);
module.exports.functionRenames.set("Math.pow", ["power", ["def power(a, b): return a**b"]]);
module.exports.functionRenames.set("Math.log", ["math.log", ["import math"]]);
module.exports.functionRenames.set("undefined", "None");
module.exports.functionRenames.set("null", "None");


module.exports.identifierRenames = new Map();
module.exports.identifierRenames.set("this", "self");
