// manual test script for getting weather condtions

import { getCurrentWeatherMessageForZip } from './weather/weather';

getCurrentWeatherMessageForZip('20001').then(conditionsMessage => {
    console.log('\n' + conditionsMessage);
});
