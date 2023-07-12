import { ICityForecast } from "./types";

export const countries = new Map([
  [
    "Country",
    [
      "Kyiv",
      "Dnipro",
      "Odessa",
      "London",
      "Amsterdam",
      "Venice",
      "Helsinki",
      "Luxembourg",
    ],
  ],
  ["Ukraine", ["Kyiv", "Dnipro", "Odessa"]],
  ["GB", ["London"]],
  ["Netherlands", ["Amsterdam"]],
  ["Italy", ["Venice"]],
  ["Finland", ["Helsinki"]],
  ["Luxembourg", ["Luxembourg"]],
]);

export const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const coordinates = new Map([
  ["Kyiv", { lat: "50.4", long: "30.5" }],
  ["Dnipro", { lat: "48.4", long: "34.9" }],
  ["Odessa", { lat: "46.4", long: "30.7" }],
  ["London", { lat: "51.5", long: "-0.11" }],
  ["Helsinki", { lat: "60.1", long: "24.9" }],
  ["Venice", { lat: "45.4", long: "12.3" }],
  ["Luxembourg", { lat: "49.6", long: "6.1" }],
  ["Amsterdam", { lat: "52.3", long: "4.8" }],
]);

const extendDate = (month: string) => {
  return month.replace(/(^|\D)(\d)(?!\d)/g, '$10$2');
}

export const getApiUrl = (lat: string = "", long: string = ""): string => {
  const currentDate = new Date();
  const prevDate = new Date(currentDate.getTime() - 6 * 24 * 60 * 60 * 1000);
  const prevDateString = `${prevDate.getFullYear()}-${
    extendDate(`${prevDate.getMonth() + 1}`)
  }-${extendDate(`${prevDate.getDate()}`)}`;
  const currentDateString = `${currentDate.getFullYear()}-${
    extendDate(`${currentDate.getMonth() + 1}`)
  }-${extendDate(`${currentDate.getDate()}`)}`;
  return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,winddirection_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto&current_weather=true&start_date=${prevDateString}&end_date=${currentDateString}`;
};

export const getRequestPerCity = (city: string): string => {
  const cityCoordinates = coordinates.get(city);
  return getApiUrl(cityCoordinates?.lat, cityCoordinates?.long);
};

export const getResponceArray = async (
  requestsArray: string[],
  cities: string[]
) => {
  const res = await Promise.all(requestsArray.map((url) => fetch(url))).then(
    async (res) => {
      return Promise.all(res.map(async (data) => await data.json()));
    }
  );
  return res.map((responce, index) => {
    if (cities) {
      // country ?
      return { ...responce, cityName: cities[index] };
    }
  });
};

export const getArrayRange = (start: number, stop: number, step: number) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (_, index) => start + index * step
  );

export const temperatureRange = getArrayRange(-80, 80, 1);

export class FilterInitilizer {
  cities: ICityForecast[];
  constructor(cities: ICityForecast[]) {
    this.cities = cities;
  }
  filterCitiesByMaxTemp(temp: number | string) {
    if (temp === "Max") {
      this.cities = this.cities.filter(
        (cityData: ICityForecast) =>
          Math.floor(
            cityData.daily.temperature_2m_min[
              cityData.daily.temperature_2m_min.length - 1
            ]
          ) <
          temperatureRange[temperatureRange.length - 1] + 1
      );
    } else if (typeof temp === "number") {
      this.cities = this.cities.filter(
        (cityData: ICityForecast) =>
          Math.floor(
            cityData.daily.temperature_2m_max[
              cityData.daily.temperature_2m_max.length - 1
            ]
          ) <= temp
      );
    }
    return this;
  }
  filterCitiesByMinTemp(temp: number | string) {
    if (temp === "Min") {
      this.cities = this.cities.filter(
        (cityData: ICityForecast) =>
          Math.floor(
            cityData.daily.temperature_2m_min[
              cityData.daily.temperature_2m_min.length - 1
            ]
          ) >
          temperatureRange[0] - 1
      );
    } else if (typeof temp === "number") {
      this.cities = this.cities.filter(
        (cityData: ICityForecast) =>
          Math.floor(
            cityData.daily.temperature_2m_min[
              cityData.daily.temperature_2m_min.length - 1
            ]
          ) >= temp
      );
    }
    return this;
  }
  filterByCountry(countryArray: string[]) {
    const countryCities: string[][] = [];
    for (const country of countryArray) {
      let cities = countries.get(country) as string[];
      countryCities.push(cities);
    }
    this.cities = this.cities.filter((cityData: ICityForecast) =>
      countryCities.flat().includes(cityData.cityName)
    );
    return this;
  }
  getCities() {
    return this.cities;
  }
}
