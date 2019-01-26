import { getCurrentWeatherMessageForZip, getTodaysForecastForZip } from './weather';

describe('getCurrentWeatherMessageForZip', () => {

    it(`returns a message w/ current weather conditions`, done => {
        getCurrentWeatherMessageForZip('20001').then(msg => {
            expect(msg).toContain('Weather for ZIP code 20001');
            done();
        });
    });

});

describe('getForecastForZip', () => {

    it(`...`, done => {
        getTodaysForecastForZip('20001').then(msg=> {
            expect(msg).toContain(`Today's high for ZIP code 20001`);
            done();
        });
    });

});
