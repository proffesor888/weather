import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { weekDays } from "@/data";
import { IDaily, ICityForecast } from "@/types";
import "./ChartStyle.css";

const generateChartData = (daily: IDaily) => {
  const { time, temperature_2m_max, temperature_2m_min } = daily;
  return time.map((date, index: number) => {
    const dayNumber = new Date(date).getDay();
    return {
      name: weekDays[dayNumber],
      Temperature: (temperature_2m_max[index] + temperature_2m_min[index]) / 2,
    };
  });
};

interface IChartProps {
  data: ICityForecast;
}

export const Chart = ({ data }: IChartProps) => {
  const chartData = generateChartData(data.daily);
  return (
    <div className="chart-container">
      <text className="chart-name">Analytics - {data.cityName}</text>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="grad1" x1="0" y1="0" x2="0" y2={`${100}%`}>
              <stop
                offset="0%"
                style={{ stopColor: "rgb(179,252,79)", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "rgb(23,49,2)", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="10" vertical={false} />
          <XAxis dataKey="name" ticks={[]} />
          <YAxis
            dataKey={"Temperature"}
            name="Temperature"
            unit="k"
            domain={[0, "auto"]}
            type="number"
          />
          <Tooltip />
          <Legend verticalAlign="top" align="right" />
          <Bar
            barSize={30}
            style={{ margin: 120 }}
            dataKey="Temperature"
            fill="url(#grad1)"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
