import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { weekDays } from "@/data";
import { IDaily, ICityForecast } from "@/types";

const generateChartData = (daily: IDaily) => {
    const { time, temperature_2m_max, temperature_2m_min} = daily;
    return time.map((_, index: number) => {
        return {
            name: weekDays[index],
            temperature: (temperature_2m_max[index] + temperature_2m_min[index]) / 2
        }
    })
}

interface IChartProps {
  data: ICityForecast
}

export const Chart = ({ data }: IChartProps) => {
  const chartData = generateChartData(data.daily);
  return (
    <div style={{height: "500px", width: "500px"}}>
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
          <linearGradient id="grad1" x1="0" y1="0" x2="0" y2={`${100}%`} >
            <stop offset="0%" style={{stopColor: "rgb(179,252,79)", stopOpacity: 1 }} />
            <stop offset="100%" style={{stopColor: "rgb(23,49,2)", stopOpacity: 1}} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" ticks={[]} />
        <YAxis 
          dataKey={'temperature'}  
          name='Temperature'  
          unit='k'  
          domain={[0, "auto"]}  
          type="number"
        />
        <Tooltip />
        <Legend />
        <Bar style={{margin: 120}} dataKey="temperature" fill="url(#grad1)" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
};
