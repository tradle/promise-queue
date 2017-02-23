
# promise-queue

## Usage

```js
const co = require('bluebird').coroutine
const createQueue = require('ya-promise-queue')
const q = createQueue()

const play = co(function* () {
  q.push(() => promiseTimeout(100))
  q.push(() => promiseTimeout(50))
  q.push(() => promiseTimeout(10))
  // wait for currently queued and/or running tasks finish
  yield q.wait()
  console.log('3 down', q.length, 'togo')
})

function promiseTimeout (millis) {
  return new Promise(resolve => {
    setTimeout(resolve, millis)
  })
}
```
