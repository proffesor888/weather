import { useState } from "react";
import { countries, getRequestPerCity, getResponceArray } from "@/data";
import { GetServerSideProps } from "next";
import { Table } from "../app/components/Table/Table";
import { Chart } from "../app/components/Chart/Chart";
import { Filters } from "../app/components/FIlters/Filters";
import { ICityForecast } from "@/types";
import "./index.css";

interface IWaetherAppProps {
  res: Array<ICityForecast>;
}

export default function WeatherApp({ res }: IWaetherAppProps) {
  const [selectedCityForecast, selectCity] = useState<ICityForecast>(res[0]);
  const [minTemperature, setMinTemperature] = useState<number>(0);
  const [maxTemperature, setMaxTemperature] = useState<number>(0);

  const onTemperatureSelect = (value: number, type: string) => {
    console.warn(value);
    if (type === "max") {
      setMaxTemperature(value);
    } else {
      setMinTemperature(value);
    }
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
      <div>
        <Filters
          onTemperatureSelect={onTemperatureSelect}
          maxTemperature={maxTemperature}
          minTemperature={minTemperature}
        />
        <Table onCityClick={onCityClick} data={res} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  let country: string | null = null;
  if (!Object.keys(query).length || query["country"] === "all") {
    country = "All";
  } else {
    country = query["country"] as string;
  }
  const cities = countries.get(country) || [];
  const requestsArray = cities?.map((city) => getRequestPerCity(city));
  return { props: { res: await getResponceArray(requestsArray, cities) } };
};
