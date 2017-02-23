const co = require('bluebird').coroutine
const createQueue = require('./')
const q = createQueue()

const play = co(function* () {
  q.push(() => promiseTimeout())
  q.push(() => promiseTimeout())
  q.push(() => promiseTimeout())
  // wait for currently queued and/or running tasks finish
  q.finish().then(() => {
    console.log('3 down', q.length, 'togo')
  })

  q.push(() => promiseTimeout())
  q.push(() => promiseTimeout())
  q.push(() => promiseTimeout())
})

play()

function promiseTimeout () {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * 100 | 0)
  })
}
