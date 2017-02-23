const Promise = require('bluebird')
const co = Promise.coroutine
const test = require('tape')
const createPromiseQueue = require('./')

test('promise queue', co(function* (t) {
  const q = createPromiseQueue()
  let a, b
  q.push(() => Promise.resolve())
  q.push(() => resolveIn(50).then(() => {
    t.equal(q.length, 2)
    t.equal(b, undefined)
    a = 'a'
  }))

  q.push(() => resolveIn(50).then(() => {
    t.equal(q.length, 1)
    t.equal(a, 'a')
    b = 'b'
  }))

  t.equal(q.length, 3)
  yield q.finish()
  t.equal(q.length, 0)
  t.equal(a, 'a')
  t.equal(b, 'b')
  t.end()
}))

function resolveIn (millis, result) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(result)
    }, millis)
  })
}
