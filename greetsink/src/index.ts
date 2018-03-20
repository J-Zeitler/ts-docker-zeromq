import * as zmq from 'zeromq'

var requester = zmq.socket('req')

var x = 0
requester.on("message", reply => {
  console.log('received:', reply.toString())
  x += 1
  if (x === 10) {
    requester.close()
    process.exit(0)
  }
})

let connectHost = process.env.CONNECT_HOST || 'localhost'
let connectPort = process.env.CONNECT_PORT || 8080
let connectAddr = `tcp://${connectHost}:${connectPort}`
requester.connect(connectAddr)

for (var i = 0; i < 10; i++) {
  requester.send("Hello")
}

process.on('SIGINT', () => {
  requester.close()
})
