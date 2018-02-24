const co = require('co').wrap
const createQueue = require('./')
const q = createQueue()

const play = co(function* () {
  q.push(() => promiseTimeout(100))
  q.push(() => promiseTimeout(50))
  q.push(() => promiseTimeout(10))
  // wait for currently queued and/or running tasks finish
  q.finish().then(() => {
    console.log(`3 down, ${q.length} togo`)
  })

  q.push(() => promiseTimeout(1))
    .then(() => console.log('here comes number 4!'))
})

play()
// "waited 100ms"
// "waited 50ms"
// "waited 10ms"
// "3 down, 1 togo"
// "waited 1ms"
// "here comes number 4!"

function promiseTimeout (millis) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`waited ${millis}ms`)
      resolve()
    }, millis)
  })
}
