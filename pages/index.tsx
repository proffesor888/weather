import { useState, useEffect } from "react";
import { countries, getRequestPerCity, getResponceArray, getTemperatureFilteredArray } from "@/data";
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
  const [minTemperature, setMinTemperature] = useState<number | undefined>(undefined);
  const [maxTemperature, setMaxTemperature] = useState<number | undefined>(undefined);
  const [citiesToDisplay, setCitiesToDisplay] = useState<ICityForecast[]>(res);
  const [country, setCountry] = useState<string>("All");

  useEffect(() => {
    let updatedCitiesArray = null;
    if(minTemperature !== undefined && maxTemperature !== undefined) {
      updatedCitiesArray = getTemperatureFilteredArray(res, minTemperature, maxTemperature);
    } else if(maxTemperature === undefined && minTemperature) {
      updatedCitiesArray = res.filter((cityData: ICityForecast) => (
        Math.floor(cityData.daily.temperature_2m_min[cityData.daily.temperature_2m_min.length - 1]) >= minTemperature
      ));
    } else {
      updatedCitiesArray = maxTemperature ? res.filter((cityData: ICityForecast) => (
        Math.floor(cityData.daily.temperature_2m_max[cityData.daily.temperature_2m_max.length - 1]) <= maxTemperature
      )) : res
    }
    setCitiesToDisplay(updatedCitiesArray);
  }, [minTemperature]);

  useEffect(() => {
    let updatedCitiesArray = null;
    if(minTemperature !== undefined && maxTemperature !== undefined) {
      updatedCitiesArray = getTemperatureFilteredArray(res, minTemperature, maxTemperature);
    } else if(minTemperature === undefined && maxTemperature) {
      updatedCitiesArray = res.filter((cityData: ICityForecast) => (
        Math.floor(cityData.daily.temperature_2m_max[cityData.daily.temperature_2m_max.length - 1]) <= maxTemperature
      ));
    } else {
      updatedCitiesArray = minTemperature ? res.filter((cityData: ICityForecast) => (
        Math.floor(cityData.daily.temperature_2m_min[cityData.daily.temperature_2m_min.length - 1]) <= minTemperature
      )) : res
    }
    setCitiesToDisplay(updatedCitiesArray);
  }, [maxTemperature]);

  const onTemperatureSelect = (type: string, value: string) => {
    const formtattedValue = value !== "undefined" ? +value : undefined;
    if (type === "max") {
      setMaxTemperature(formtattedValue);
    } else {
      setMinTemperature(formtattedValue);
    }
  };
  
  const onCountrySelect = (value: string) => {
    let displayCities = null;
    const cities = countries.get(value);
    const updatedCitiesArray = res.filter((cityData: ICityForecast) => (
      cities?.includes(cityData.cityName)
    ));
    if(maxTemperature !== undefined && minTemperature !== undefined) {
      displayCities = getTemperatureFilteredArray(updatedCitiesArray, minTemperature, maxTemperature);
    } else if(maxTemperature && minTemperature === undefined) {
      displayCities = updatedCitiesArray.filter((cityData: ICityForecast) => (
        Math.floor(cityData.daily.temperature_2m_max[cityData.daily.temperature_2m_max.length - 1]) <= maxTemperature
      ));
    } else {
      displayCities = minTemperature ? updatedCitiesArray.filter((cityData: ICityForecast) => (
        Math.floor(cityData.daily.temperature_2m_max[cityData.daily.temperature_2m_max.length - 1]) <= minTemperature
      )) : [];
    }
    setCitiesToDisplay(displayCities);
    setCountry(value);
  }

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
          country={country}
          onCountrySelect={onCountrySelect}
        />
        <Table onCityClick={onCityClick} data={citiesToDisplay} />
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
