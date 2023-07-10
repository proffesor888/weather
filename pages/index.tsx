import { countries, coordinates, getApiUrl } from "@/data";
import { GetServerSideProps } from "next";
import { Table } from "../app/components/Table";
import { Chart } from "../app/components/Chart";

export default function WeatherApp(props: any) {
  return (
    <div>
      <Chart data={props.res[0]}/>
      <Table data={props.res} />
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
  const requestsArray = cities?.map((city) => {
    const cityCoordinates = coordinates.get(city);
    return getApiUrl(cityCoordinates?.lat, cityCoordinates?.long);
  });
  const res = await Promise.all(requestsArray.map((url) => fetch(url))).then(
    async (res) => {
      return Promise.all(res.map(async (data) => await data.json()));
    }
  );
  const result = res.map((responce, index) => {
    if (cities) {
      return { ...responce, cityName: cities[index], country };
    }
  });
  return { props: { res: result } };
};
