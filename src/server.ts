import { getCurrentWeatherMessageForZip } from './weather/weather';
import express = require('express');
import http = require('http');
import bodyParser = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sms', (req: express.Request, res: express.Response) => {
  const messageBody: string = req.body.Body;
  const zipCode = messageBody.trim().split(/\s+/)[0];
  console.log('weather requested for zip ' + zipCode);

  getCurrentWeatherMessageForZip(zipCode).then(msg => {
    console.log(msg);
    const twiml = new MessagingResponse();
    twiml.message(msg);
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  });
});

http.createServer(app).listen(9328, () => {
  console.log('WeatherText application listening on port 9328');
});

