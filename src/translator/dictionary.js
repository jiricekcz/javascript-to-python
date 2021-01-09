module.exports.functionRenames = new Map();
module.exports.functionRenames.set("console.log", "print");
module.exports.functionRenames.set("Math.ceil", ["math.ceil", ["import math"]])
module.exports.functionRenames.set("Math.floor", ["math.floor", ["import math"]])
module.exports.functionRenames.set("Math.round", ["math.round", ["import math"]])


module.exports.identifierRenames = new Map();
module.exports.identifierRenames.set("this", "self");
