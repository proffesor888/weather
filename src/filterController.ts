import { countries, temperatureRange } from "./utils";
import { ICityForecast } from "./types";

export class FilterController {
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