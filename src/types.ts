interface ICurrentWeather {
    is_day: number;
    temperature: number;
    time: string;
    weathercode: number;
    winddirection: number;
    windspeed: number;
}

export interface IDaily {
    temperature_2m_max: Array<number>;
    temperature_2m_min: Array<number>;
    time: Array<string>;
}

interface IDailyUnits {
    time: string;
    temperature_2m_min: string;
    temperature_2m_max: string;
}

interface IHourly {
    temperature_2m: Array<number>;
    time: Array<string>;
    winddirection_10m: Array<number>;
}

interface IHourlyUnits {
    temperature_2m: string;
    time: string;
    winddirection_10m: string;
}

export interface ICityForecast {
    cityName: string;
    elevation?: number;
    generationtime_ms: number,
    latitude: number;
    longitude: number;
    timezone: string;
    timezone_abbreviation: string;
    utc_offset_seconds: number;
    current_weather: ICurrentWeather;
    daily: IDaily;
    daily_units: IDailyUnits;
    hourly: IHourly;
    hourly_units: IHourlyUnits;
}