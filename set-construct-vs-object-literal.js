// set#construct x 3,303 ops/sec ±1.06% (97 runs sampled)
// object#literal x 72,391 ops/sec ±1.05% (96 runs sampled)

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


var prevSet = null
suite.add('set#construct', function () {
  var set = new Set(src)
  assert.strictEqual(set !== prevSet, true)
  prevSet = set
})


var obj = src.reduce(function (memo, v) {
  memo[v] = true
  return memo
}, {})
var getObj = new Function("return " + JSON.stringify(obj))
var prevObj = null
suite.add('object#literal', function () {
  var obj = getObj()
  assert.strictEqual(obj !== prevObj, true)
  prevObj = obj
})


suite.on('cycle', function(event) {
  console.log( event.target.toString() )
})
suite.run()