import { useState, useEffect } from "react";
import {
  FilterInitilizer,
  countries,
  getRequestPerCity,
  getResponceArray,
} from "@/data";
import { GetServerSideProps } from "next";
import { Table } from "../app/components/Table/Table";
import { Chart } from "../app/components/Chart/Chart";
import { Filters } from "../app/components/Filters/Filters";
import { ICityForecast } from "@/types";
import "./index.css";

interface IWaetherAppProps {
  res: Array<ICityForecast>;
}

export default function WeatherApp({ res }: IWaetherAppProps) {
  const [selectedCityForecast, selectCity] = useState<ICityForecast>(res[0]);
  const [minTemperature, setMinTemperature] = useState<number | string>("Min");
  const [maxTemperature, setMaxTemperature] = useState<number | string>("Max");
  const [citiesToDisplay, setCitiesToDisplay] = useState<ICityForecast[]>(res);
  const [country, setCountry] = useState<string[]>(["Country"]);
  useEffect(() => {
    applyFilter();
  }, [minTemperature]);

  useEffect(() => {
    applyFilter();
  }, [maxTemperature]);

  const applyFilter = (newCountry?: string[]) => {
    let filterController: FilterInitilizer | null = new FilterInitilizer(res);
    filterController
      .filterByCountry(newCountry ? newCountry : country)
      .filterCitiesByMaxTemp(maxTemperature)
      .filterCitiesByMinTemp(minTemperature)
      .getCities();
    setCitiesToDisplay(filterController.getCities());
    filterController = null;
  };

  const onTemperatureSelect = (type: string, value: number | string) => {
    if (type === "max") {
      setMaxTemperature(value);
    } else {
      setMinTemperature(value);
    }
  };

  const onCountrySelect = (value: string[]) => {
    applyFilter(value);
    setCountry(value);
  };

  const onCityClick = async (e: React.SyntheticEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const city = target.dataset["name"];
    if (city) {
      const requestsArray = [getRequestPerCity(city)];
      const selectedForecast = await getResponceArray(requestsArray, [city]);
      selectCity(selectedForecast[0]);
    }
  };
  return (
    <div className="app-container">
      <Chart data={selectedCityForecast} />
      <div className="table-container">
        <Filters
          onTemperatureSelect={onTemperatureSelect}
          maxTemperature={maxTemperature}
          minTemperature={minTemperature}
          country={country}
          onCountrySelect={onCountrySelect}
        />
        <Table onCityClick={onCityClick} data={citiesToDisplay} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const cities = countries.get("Country") || [];
  const requestsArray = cities?.map((city) => getRequestPerCity(city));
  return { props: { res: await getResponceArray(requestsArray, cities) } };
};
