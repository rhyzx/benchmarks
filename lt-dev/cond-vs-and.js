var Benchmark = require('benchmark')
var suite = new Benchmark.Suite

var data = {
  a: {
    b: {
      c: {
        d: {
          e: 'asdf'
        }
      }
    }
  }
}


suite
.add('andcond', function() {
     typeof data.a !== 'undefined'
  && typeof data.a.b !== 'undefined'
  && typeof data.a.b.c !== 'undefined'
  && typeof data.a.b.c.d !== 'undefined'
  && typeof data.a.b.c.e !== 'undefined'
  ? data.a.b.c.e
  : undefined
})
.add('orcond', function() {
     typeof data.a === 'undefined'
  || typeof data.a.b === 'undefined'
  || typeof data.a.b.c === 'undefined'
  || typeof data.a.b.c.d === 'undefined'
  || typeof data.a.b.c.e === 'undefined'
  ? undefined
  : data.a.b.c.e
})
.add('cond', function() {
    typeof data.a === 'undefined'
  ? undefined
  : typeof data.a.b === 'undefined'
  ? undefined
  : typeof data.a.b.c === 'undefined'
  ? undefined
  : typeof data.a.b.c.d === 'undefined'
  ? undefined
  : typeof data.a.b.c.e === 'undefined'
  ? undefined
  : data.a.b.c.e
})
.add('and', function() {
  data.a && data.a.b && data.a.b.c && data.a.b.c.d && data.a.b.c.d.e
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
// run async
.run({ 'async': true });

