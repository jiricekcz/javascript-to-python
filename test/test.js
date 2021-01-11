var n = Number(input());
var k = Number(input());
output = "";
for (var i = 1; i <= n; i++) {
    output += String(i) + ": 1"
    var s = 1;
    for (var j = 1; j <= k; j++) {
        s *= i;
        output += " " + String(s);
    }
    if (i != n) output += "\n";
}
console.log(output);