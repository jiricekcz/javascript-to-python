var t = [];
function errr(arr) {
    for (var j of arr) {
        if (![0,1,2,3,4,5].includes(j)) return true;
    }
    return false;
}
while (true) {
    var d = Number(input());
    if (d == -1) break;
    t.push(d);
}
if (t.includes(0)) console.log("neklasifikovan"); else
if (errr(t)) console.log("error"); else {
    console.log(String(Math.round(t.reduce((a, b) => a + b) / t.length * 1e2) / 1e2) + "0");
}
