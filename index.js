// Import the appropriate service
const { smarthome } = require('actions-on-google')

// Create an app instance
const app = smarthome()
// Register handlers for Smart Home intents
app.onSync((body, headers) => {
    return {
      requestId: body.requestId,
      payload: {
        agentUserId: 123,
        devices: []
      },
    }
  })
  app.onQuery((body, headers) => {
    return {
      requestId: 'ff36...',
      payload: {
        // ...
      },
    }
  })
app.onExecute((body, headers) => {
  return {
    requestId: 'ff36...',
    payload: {
      // ...
    },
  }
})
app.onDisconnect((body, headers) => {
  return {}
})

const express = require('express');
const expressApp = express().use(express.json())
expressApp.listen(6182)
expressApp.post('/fulfillment', app)
