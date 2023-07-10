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

const weekDays = {
    "0": "Mon",
    "1": "Tue",
    "2": "Wed",
    "3": "Thu",
    "4": "Fri",
    "5": "Sat",
    "6": "Sun"
}

const generateChartData = (daily: any) => {
    const { time, temperature_2m_max, temperature_2m_min} = daily;
    return time.map((day: any, index: number) => {
        return {
            name: weekDays[`${index}`],
            temperature: (temperature_2m_max[index] + temperature_2m_min[index]) / 2
        }
    })
}

export const Chart = ({ data }: any) => {
    console.warn('res', data.daily);
    const chartData = generateChartData(data.daily);
  return (
    <>
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
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="temperature" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
    </>
  );
};
