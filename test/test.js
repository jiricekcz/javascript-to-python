const zpStandard = 0.045;
const zpH = 0.135;
const zpF = 0.09;
const sp = 0.065;
const nd = 0.15;
const vd = 0.23;
const slnp = 2320;
const slns = 335;
const mzdaMin = 15200;
const mzdaAvg = 35411;

var hruba = Number(input());
var primary = Number(input()) == 1;
var student = Number(input()) == 1;


// Tax
var d = 0;

if (hruba > 4 * mzdaAvg) {
    d = 4 * mzdaAvg * nd;
    d += (hruba - 4 * mzdaAvg) * vd;
} else {
    d = hruba * nd;
}
if (primary) {
    d -= slnp;
}
if (student) {
    d -= slns;
}
d = Math.max(d, 0);


// Healh 
var h = 0;
if (student) {
    h = hruba * zpStandard;
} else {
    if (hruba < mzdaMin) {
        h = (mzdaMin * zpH) - (hruba * zpF);
    } else {
        h = hruba * zpStandard;
    }
}

// Social Health
var s = hruba * sp;

console.log(hruba - h - d - s);
console.log(d);
console.log(h);
console.log(s);