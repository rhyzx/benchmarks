// set#has x 11,337,557 ops/sec ±1.70% (93 runs sampled)
// object#literal x 5,915,563 ops/sec ±1.99% (90 runs sampled)
// object#in x 4,175,044 ops/sec ±2.41% (87 runs sampled)
// object#hasOwnProperty x 6,040,121 ops/sec ±1.10% (93 runs sampled)
// map#has x 10,522,147 ops/sec ±1.01% (91 runs sampled)
// str#indexOf x 49,849 ops/sec ±0.94% (98 runs sampled)
// if#literal x 32,981 ops/sec ±0.99% (97 runs sampled)

var Bench = require('benchmark')
var assert = require('assert')

var uuid = require('node-uuid')

var suite = new Bench.Suite

var src = []
for (var i=1000;i--;) {
  src.push(uuid.v4())
}
var target = src[500]
var none = uuid.v4()



var set = new Set(src)
suite.add('set#has', function () {
  assert.strictEqual(set.has(target), true)
  assert.strictEqual(set.has(none), false)
})


var obj = src.reduce(function (memo, v) {
  memo[v] = true
  return memo
}, {})
suite.add('object#literal', function () {
  assert.strictEqual(obj[target], true)
  assert.notStrictEqual(obj[none], true)
})
// suite.add('object#in', function () {
//   assert.strictEqual(target in obj, true)
//   assert.strictEqual(none in obj, false)
// })
// suite.add('object#hasOwnProperty', function () {
//   assert.strictEqual(obj.hasOwnProperty(target), true)
//   assert.strictEqual(obj.hasOwnProperty(none), false)
// })


// var map = new Map(src.map(function (key) {
//   return [key, true]
// }))
// suite.add('map#has', function () {
//   assert.strictEqual(map.has(target), true)
//   assert.strictEqual(map.has(none), false)
// })


// var str =  src.join('\n')
// suite.add('str#indexOf', function () {
//   assert.strictEqual(str.indexOf(target) !== -1, true)
//   assert.strictEqual(str.indexOf(none) !== -1, false)
// })


// var iffn = new Function("target", "return '" + src.join("' === target || '") + "' === target")
// suite.add('if#literal', function () {
//   assert.strictEqual(iffn(target), true)
//   assert.strictEqual(iffn(none), false)
// })


suite.on('cycle', function(event) {
  console.log( event.target.toString() )
})
suite.run()
