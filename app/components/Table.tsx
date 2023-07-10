import "./TableStyle.css";

export const Table = ({ data }: any) => {
  return (
    <table>
      <thead>
        <tr>
          <th>City</th>
          <th>Temperature max</th>
          <th>Temperature min</th>
          <th>Wind direction</th>
        </tr>
      </thead>
      <tbody>
        {data.map((cityData: any) => {
            return(
                <tr key={cityData.generationtime_ms}>
                    <th>{cityData.cityName}</th>
                    <th>{cityData.daily.temperature_2m_max[cityData.daily.temperature_2m_max.length - 1]}</th>
                    <th>{cityData.daily.temperature_2m_min[cityData.daily.temperature_2m_min.length - 1]}</th>
                    <th>{cityData.current_weather.winddirection}</th>
                </tr>
            )
        })}
      </tbody>
    </table>
  );
};
