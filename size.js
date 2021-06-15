var brotliSize = require("brotli-size");
var fs = require("fs");
var str = fs.readFileSync("dist/app.js").toString();

console.table({
    "File size: ": str.length,
    "File compressed: ": brotliSize.sync(str),
});
