import { ICityForecast } from "@/types";
import "./TableStyle.css";

interface ITableProps {
  data: Array<ICityForecast>,
  onCityClick: (e: React.SyntheticEvent<HTMLElement>) => void;
}

export const Table = ({ data, onCityClick }: ITableProps) => {
  return (
    <table onClick={onCityClick}>
      <thead>
        <tr>
          <th>City</th>
          <th>Temperature max</th>
          <th>Temperature min</th>
          <th>Wind direction</th>
        </tr>
      </thead>
      <tbody>
        {data.map((cityData: ICityForecast) => {
            return(
                <tr key={cityData.generationtime_ms}>
                    <th data-name={cityData.cityName}>{cityData.cityName}</th>
                    <th data-name={cityData.cityName}>{cityData.daily.temperature_2m_max[cityData.daily.temperature_2m_max.length - 1]}</th>
                    <th data-name={cityData.cityName}>{cityData.daily.temperature_2m_min[cityData.daily.temperature_2m_min.length - 1]}</th>
                    <th data-name={cityData.cityName}>{cityData.current_weather.winddirection}</th>
                </tr>
            )
        })}
      </tbody>
    </table>
  );
};
