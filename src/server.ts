import { getCurrentWeatherMessageForZip, getTodaysForecastForZip } from './weather/weather';
import express = require('express');
import http = require('http');
import bodyParser = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sms', (req: express.Request, res: express.Response) => {
  const sendSmsResponse = sendTwimlHttpResponse.bind(this, res);

  const messageBody: string = req.body.Body;
  const messageWords: string[] = messageBody.trim().split(/\s+/);
  const zipCode = find(messageWords, w => /\d{5}/.test(w));

  if (!zipCode) {
    return sendSmsResponse(`Please provide a ZIP code`);
  }

  if (find(messageWords, w => w === 'today')) {
    getTodaysForecastForZip(zipCode).then(sendSmsResponse)
  } else {
    getCurrentWeatherMessageForZip(zipCode).then(sendSmsResponse);
  }
});

http.createServer(app).listen(9328, () => {
  console.log('WeatherText application listening on port 9328');
});

function sendTwimlHttpResponse(res: express.Response, msg: string) {
  const twiml = new MessagingResponse();
  twiml.message(msg);
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
}

function find<T>(arr: T[], predicate: (val: T) => boolean): T {
  arr.forEach(e => {
    if (predicate(e)) { return e }
  });
  return undefined;
}
