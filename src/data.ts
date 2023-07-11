import { ICityForecast } from "./types";

export const countries = new Map([
  ["Ukraine", ["Kyiv", "Dnipro", "Odessa"]],
  ["GB", ["London"]],
  ["Netherlands", ["Amsterdam"]],
  ["Italy", ["Venice"]],
  ["Finland", ["Helsinki"]],
  ["Luxembourg", ["Luxembourg"]],
  [
    "All",
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
]);

export const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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

export const getApiUrl = (lat: string = "", long: string = ""): string => {
  return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,winddirection_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto&current_weather=true`;
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


export class FilterInitilizer {
  cities: ICityForecast[];
  constructor(cities: ICityForecast[]) {
    this.cities = cities;
  }
  filterCitiesByMaxTemp(temp?: number) {
    if(temp) {
      this.cities = this.cities.filter((cityData: ICityForecast) => (
        Math.floor(cityData.daily.temperature_2m_max[cityData.daily.temperature_2m_max.length - 1]) <= temp
      ));
    }
    return this;
  }
  filterCitiesByMinTemp(temp?: number) {
    if(temp) {
      this.cities = this.cities.filter((cityData: ICityForecast) => (
        Math.floor(cityData.daily.temperature_2m_min[cityData.daily.temperature_2m_min.length - 1]) >= temp
      ));
    }
    return this;
  }
  filterByCountry(country: string) {
    const countryCities = countries.get(country);
    this.cities = this.cities.filter((cityData: ICityForecast) => (
      countryCities?.includes(cityData.cityName)
    ));
    return this;
  }
  getCities() {
    return this.cities;
  }
}
