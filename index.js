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
expressApp.get('/auth',function(req,res){
  console.log(req.query.client_id);
  console.log(req.query.redirect_uri);
  console.log(req.query.state);
});
expressApp.post('/token',function(req,res){
  res.send({
    "token_type": "Bearer",
    "access_token": " ACCESS_TOKEN ",
    "expires_in": 99999999999
    });
});
expressApp.post('/fulfillment', app)

expressApp.listen(6182)
