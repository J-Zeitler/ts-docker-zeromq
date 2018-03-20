import * as zmq from 'zeromq'

let responder = zmq.socket('rep')

let desiredState = {
    greeting: 'Hello'
}

responder.on('message', async request => {
    console.log("Received request: [", request.toString(), "]")
    await new Promise(resolve => setTimeout(resolve, 1000))
    responder.send(JSON.stringify(desiredState))
})

responder.bind('tcp://*:8080', err => {
    if (err) {
        console.log(err)
    } else {
        console.log("Listening on 8080…")
    }
})

process.on('SIGINT', () => {
    responder.close()
})
