// Import the appropriate service
const { smarthome } = require('actions-on-google');
const exp = require('constants');

// Create an app instance
const app = smarthome()
// Register handlers for Smart Home intents
app.onSync((body, headers) => {
  console.log("onSync");

    return {
      "requestId": "ff36a3cc-ec34-11e6-b1a0-64510650abcf",
      "payload": {
        "agentUserId": "1836.15267389",
        "devices": [
          {
            "id": "123",
            "type": "action.devices.types.OUTLET",
            "traits": [
              "action.devices.traits.OnOff"
            ],
            "name": {
              "defaultNames": [
                "My Outlet 1234"
              ],
              "name": "Night light",
              "nicknames": [
                "wall plug"
              ]
            },
            "willReportState": false,
            "roomHint": "kitchen",
            "deviceInfo": {
              "manufacturer": "lights-out-inc",
              "model": "hs1234",
              "hwVersion": "3.2",
              "swVersion": "11.4"
            },
            "otherDeviceIds": [
              {
                "deviceId": "local-device-id"
              }
            ],
            "customData": {
              "fooValue": 74,
              "barValue": true,
              "bazValue": "foo"
            }
          },
          {
            "id": "456",
            "type": "action.devices.types.LIGHT",
            "traits": [
              "action.devices.traits.OnOff",
              "action.devices.traits.Brightness",
              "action.devices.traits.ColorSetting"
            ],
            "name": {
              "defaultNames": [
                "lights out inc. bulb A19 color hyperglow"
              ],
              "name": "lamp1",
              "nicknames": [
                "reading lamp"
              ]
            },
            "willReportState": false,
            "roomHint": "office",
            "attributes": {
              "colorModel": "rgb",
              "colorTemperatureRange": {
                "temperatureMinK": 2000,
                "temperatureMaxK": 9000
              },
              "commandOnlyColorSetting": false
            },
            "deviceInfo": {
              "manufacturer": "lights out inc.",
              "model": "hg11",
              "hwVersion": "1.2",
              "swVersion": "5.4"
            },
            "customData": {
              "fooValue": 12,
              "barValue": false,
              "bazValue": "bar"
            }
          }
        ]
      }
    }
  })
  app.onQuery((body, headers) => {
  console.log("onQuery");
  return {
      requestId: 'ff36...',
      payload: {
        // ...
      },
    }
  })
app.onExecute((body, headers) => {
  console.log("onExecute");
  return {
    requestId: 'ff36...',
    payload: {
      // ...
    },
  }
})
app.onDisconnect((body, headers) => {
  console.log("onDisconnect");
  return {}
})

const express = require('express');
const expressApp = express();
expressApp.use(express.json());
expressApp.use(express.urlencoded({extended:true}));
expressApp.use(function(req,res,next){
  console.log(req);
  next();
});
expressApp.get('/auth',function(req,res){
  console.log(req.query.client_id);
  console.log(req.query.redirect_uri);
  console.log(req.query.state);
  // console.log(req.query.redirect_uri+"?code=MINGKYME23&state="+req.query.state);
  // res.redirect(req.query.redirect_uri+"?code=MINGKYME23&state="+req.query.state);
  let url = req.query.redirect_uri+"?code=MINGKYME23&state="+req.query.state;
  res.redirect('/login?responseurl='+encodeURIComponent(url));
});
expressApp.get('/login',function(req,res){
  res.send(`
  <html>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <body>
        <form action="/login" method="post">
          <input type="hidden"
            name="responseurl" value="${req.query.responseurl}" />
          <button type="submit" style="font-size:14pt">
            Link this service to Google
          </button>
        </form>
      </body>
    </html>
    `);
});
expressApp.post('/login',function(req,res){
  // Here, you should validate the user account.
    // In this sample, we do not do that.
    console.log(req.body);
    res.redirect(decodeURIComponent(req.body.responseurl));
});
expressApp.get('/token',function(req,res){
  console.log(req);
  console.log("test");
});
expressApp.post('/token',function(req,res){
  console.log("TOKEN");
  console.log(req.body.client_id);
  console.log(req.body.redirect_uri);
  console.log(req.body.state);
  res.send({
    "token_type": "Bearer",
    "access_token": "123access",
    "refresh_token": "123refresh",
    "expires_in": 86400
    });
});
expressApp.get('/faketoken',function(req,res){
  console.log(req);
  console.log("test2");
});
expressApp.post('/faketoken',function(req,res){
  console.log("TOKEN2");
  console.log(req.body.client_id);
  console.log(req.body.redirect_uri);
  console.log(req.body.state);
  res.send({
    "token_type": "Bearer",
    "access_token": "123access",
    "refresh_token": "123refresh",
    "expires_in": 86400
    });
});
expressApp.post('/fulfillment', app)

expressApp.listen(6182)
