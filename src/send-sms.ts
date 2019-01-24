const accountSid = process.env.WEATHER_TEXT_ACCOUNT_SID;
const authToken = process.env.WEATHER_TEXT_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Hello from WeatherText!',
     from: process.env.WEATHER_TEXT_PHONE,
     to: '+15555555555'
   })
  .then(message => console.log(message.sid))
  .done();

