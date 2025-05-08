// components/simulator/InvestmentChart.tsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface InvestmentChartProps {
  capital: number;
  ganancia: number;
  totalPagar: number;
}

const InvestmentChart: React.FC<InvestmentChartProps> = ({ capital, ganancia, totalPagar }) => {
  const data = [
    { name: "Capital", valor: capital },
    { name: "Ganancia", valor: ganancia },
    { name: "Total a pagar", valor: totalPagar },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="valor" fill="#60A5FA" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default InvestmentChart;
