import Axios from 'axios';
import { CurrentConditions } from "./current-condtions";
import { Forecast } from "./forecast";

export function getCurrentWeatherMessageForZip(zip: string): Promise<string> {
    const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const zipParam = zip + ',us';
    const apiKey = process.env.OWM_KEY;

    const weatherParams = { zip: zipParam, appid: apiKey, units: 'metric' };
    return Axios.get<CurrentConditions>(weatherUrl, { params: weatherParams })
        .then(res => res.data)
        .then(cc => composeSmsForCurrentConditions(zip, cc));
}

export function getTodaysForecastForZip(zip: string): Promise<string> {
    const forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast';
    const zipParam = zip + ',us';
    const apiKey = process.env.OWM_KEY;

    const weatherParams = { zip: zipParam, appid: apiKey, units: 'metric' };
    return Axios.get<Forecast>(forecastUrl, { params: weatherParams })
        .then(res => res.data)
        .then(f => composeSmsForTodaysForecast(zip, f));
}

function composeSmsForCurrentConditions(zip: string, cc: CurrentConditions): string {
    const description = cc.weather.map(w => w.description)[0];
    const temperature = cc.main.temp;
    const humidity = Math.round(cc.main.humidity);
    const windSpeed = Math.round(msToKmh(cc.wind.speed));
    const windDirection = degToCardinalDirection(cc.wind.deg);

    return [
        `-`,
        ``,
        `Weather for ZIP code ${zip}`,
        `${temperature}˚C, ${description}`,
        `${windDirection} ${windSpeed} km/h wind`,
        `${humidity}% humidity`,
    ].join('\n');
}

function composeSmsForTodaysForecast(zip: string, fc: Forecast): string {
    const midnightTonight: number = getMidnightTonightTimestamp();
    const todaysForecasts: Forecast["list"] = fc.list.filter(f => f.dt < midnightTonight);

    const todaysHigh: number = Math.round(
        todaysForecasts
            .map(f => f.main.temp)
            .reduce((a, b) => Math.max(a, b))
    );

    return [
        `-`,
        ``,
        `Today's high for ZIP code ${zip}: ${todaysHigh}˚C`
    ].join('\n');
}

function getMidnightTonightTimestamp(): number {
    const result = new Date();
    result.setDate(result.getDate() + 1);
    result.setHours(0, 0, 0, 0);
    return result.valueOf();
}

function degToCardinalDirection(deg: number): string {
    if (deg < 22.5) return 'N';
    if (deg >= 22.5 && deg < 67.5) return 'NE';
    if (deg >= 67.5 && deg < 112.5) return 'E';
    if (deg >= 112.5 && deg < 157.5) return 'SE';
    if (deg >= 157.5 && deg < 202.5) return 'S';
    if (deg >= 202.5 && deg < 247.5) return 'SW';
    if (deg >= 247.5 && deg < 292.5) return 'W';
    if (deg >= 292.5 && deg < 337.5) return 'NW';
    if (deg >= 337.5) return 'N';
}

function msToKmh(speed: number): number {
    return speed / 1000 * 3600;
}
