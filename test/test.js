class Animal {
    constructor(id) {
        /** 
         * @type {string} 
        */
        this.id = id;
    }
    toString() {
        return "Animal: " + this.id
    }
}
const animals = ["lovebird", "bison", "prairie dog", "chimpanzee", "pig", "bighorn", "capybara", "fawn", "armadillo", "wolf", "dromedary", "aoudad", "monkey", "guanaco", "guanaco", "ape", "doe", "bumble bee", "iguana", "highland cow", "snowy owl"].map(v => new Animal(v));
const animals2 = ["tiger", "elephant", "tiger", "lion", "locust", "lion", "eagle", "elephant", "echidna", "eagle", "robin", "chimpanzee", "sloth", "crow", "locust", "dolphin", "gorilla", "wolf", "lovebird", "owl", "ostrich", "badger", "anteater", "kookaburra"].map(v => new Animal(v));
console.log("2)\n     " + animals.map(v => v.id));
console.log("3)\n     " + animals.filter(v => v.id == "tiger").length);
console.log("4)\n     " + animals[2].id);
console.log("5)\n     " + animals[Number(animals.length - 2)].id);
console.log("6)\n     " + animals.slice(0, 10).map(v => v.id));
console.log("7)\n     " + animals.slice(Number(animals.length - 5), Number(animals.length)).map(v => v.id));
console.log("8)\n     " + animals.filter((v, i) => i % 2 == 0).map(v => v.id));
console.log("9)\n     " + animals.filter((v) => v.id.toLowerCase().startsWith("l")).map(v => v.id));
console.log("10)\n     " + animals.filter((v) => v.id.toLowerCase().startsWith("l")).map(v => v.id));
console.log("11)");
var max = 0;
var maxL = 0;
var maxLastIndex = 0;
for (var i = 0; i < animals.length; i++) {
    if (animals[Number(i)].id.toLowerCase().startsWith("l")) {
        maxL++;
    } else {
        if (maxL != 0) console.log("     Starting with L streak: " + maxL);
        maxL = 0;
    }
    if (max < maxL) {
        max = maxL;
        maxLastIndex = i + 1;
    }
}
console.log("     Max streak: " + max, maxLastIndex);
console.log("12)\n     " + animals.slice(Number(maxLastIndex - max), Number(maxLastIndex)).map(v => v.id));
var lastL = animals[0].id.charAt(0);
var maxLe = 1;
var maxLen = 1;
for (var i = 1; i < animals.length; i++) {
    if (animals[Number(i)].id.startsWith(lastL)) maxLe++; else {
        if (maxLen < maxLe) maxLen = maxLe;
        maxLe = 1;
        lastL = animals[i].id.charAt(0);
    }
}
console.log("13)\n     " + maxLen);
console.log("14)");
function printStartingWith(l) {
    console.log("     " + l + ":", animals.filter(v => v.id.toLowerCase().startsWith(l)).map(v => v.id));
}
for (var l of "dikobraz".split("")) {
    printStartingWith(l);
}
console.log("15)");
function printStartingWith(l) {
    console.log("     " + l + ":", animals.filter(v => v.id.toLowerCase().startsWith(l)).map(v => v.id));
}
for (var l of "abcdefghijklmnopqrstuvwxyz".split("")) {
    printStartingWith(l);
}
console.log("16)\n     " + [...animals, ...animals2].map(v => v.id));
console.log("17)\n     " + [...animals.slice(0, Number(animals.length / 3)), ...animals2.slice(Number(2 * animals.length / 3), animals.length)].map(v => v.id));






