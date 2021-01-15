var n = Number(input());
var k = Number(input());
function makeString (n) {
    var rv = String(n) + ":";
    var s = 1;
    for (var i = 0; i < k; i++) {
        rv+= " " + String(s)
        s*= n;
    }
    return rv;
}
for (var i = 1; i <= n; i++) {
    console.log(makeString(i));
}