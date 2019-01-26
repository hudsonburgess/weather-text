export interface Forecast {
    cod: number;
    message: number;
    cnt: number;
    list: {
        dt: number;
        main: {
            temp: number;
            temp_min: number;
            temp_max: number;
            pressure: number;
            humidity: number;
        };
        weather: {
            id: number;
            main: string;
            description: string;
            icon: string;
        }[];
        clouds: {
            all: number;
        };
        wind: {
            speed: number;
            deg: number;
        };
        rain: {
            '3h': number;
        };
        snow: {
            '3h': number;
        };
        dt_txt: string;
    }[];
}
