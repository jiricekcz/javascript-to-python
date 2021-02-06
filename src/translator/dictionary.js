const fs = require('fs');

module.exports.functionRenames = new Map();
module.exports.functionRenames.set("console.log", "print");
module.exports.functionRenames.set("Math.ceil", ["ceil", ["import math"]]);
module.exports.functionRenames.set("Math.floor", ["floor", ["import math"]]);
module.exports.functionRenames.set("Math.round", ["round", ["import math"]]);
module.exports.functionRenames.set("Math.E", ["math.exp(1)", ["import math"]]);
module.exports.functionRenames.set("Math.exp", ["math.exp", ["import math"]]);
module.exports.functionRenames.set("Math.pow", ["power", ["def power(a, b): return a**b"]]);
module.exports.functionRenames.set("Math.log", ["math.log", ["import math"]]);
module.exports.functionRenames.set("undefined", "None");
module.exports.functionRenames.set("null", "None");
module.exports.functionRenames.set("Error", "Exception");
module.exports.functionRenames.set("Math.LN10", ["LN10", ["import math", "LN10 = math.log(10)"]]);
module.exports.functionRenames.set("Math.LN2", ["LN2", ["import math", "LN2 = math.log(2)"]]);
module.exports.functionRenames.set("Math.LOG2E", ["LOG2E", ["import math", "LOG2E = math.log(math.exp(1), 2)"]]);
module.exports.functionRenames.set("Math.LOG10E", ["LOG10E", ["import math", "LOG10E = math.log(math.exp(1), 10)"]]);
module.exports.functionRenames.set("Math.PI", ["math.pi", ["import math"]]);
module.exports.functionRenames.set("Math.SQRT1_2", ["SQRT1_2", "SQRT1_2 = 0.5**(1/2)"]);
module.exports.functionRenames.set("Math.SQRT2", ["SQRT2", "SQRT2 = 2**(1/2)"]);
module.exports.functionRenames.set("Math.abs", "abs");
module.exports.functionRenames.set("Math.acos", ["math.acos", ["import math"]]);
module.exports.functionRenames.set("Math.asin", ["math.asin", ["import math"]]);
module.exports.functionRenames.set("Math.atan", ["math.atan", ["import math"]]);
module.exports.functionRenames.set("Math.atan2", ["math.atan2", ["import math"]]);
module.exports.functionRenames.set("Math.cos", ["math.cos", ["import math"]]);
module.exports.functionRenames.set("Math.max", ["maxJS", [fs.readFileSync("./python/maxJS.py")]]);
module.exports.functionRenames.set("Math.min", ["minJS", [fs.readFileSync("./python/minJS.py")]]);
module.exports.functionRenames.set("Math.random", ["random.random", ["import random"]]);
module.exports.functionRenames.set("Math.sin", ["math.sin", ["import math"]]);
module.exports.functionRenames.set("Math.sqrt", ["sqrt", ["sqrt = lambda x: x**(1/2)"]]);
module.exports.functionRenames.set("Math.tan", ["math.tan", ["import math"]]);
module.exports.functionRenames.set("Number", "float");
module.exports.functionRenames.set("String", "str");
module.exports.functionRenames.set("true", "True");
module.exports.functionRenames.set("false", "False");
module.exports.functionRenames.set("Error", "Exception");

module.exports.identifierRenames = new Map();
module.exports.identifierRenames.set("this", "self");

module.exports.operatorRenames = new Map();
module.exports.operatorRenames.set("!", "not ");
module.exports.operatorRenames.set("||", "or");
module.exports.operatorRenames.set("&&", "and");

module.exports.supportedRequireModules = ["fs"];
