import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function RiskChart({ data }) {

  const chartData = [
    {
      name: "Low",
      value: data?.LOW || 0,
    },
    {
      name: "Medium",
      value: data?.MEDIUM || 0,
    },
    {
      name: "High",
      value: data?.HIGH || 0,
    },
  ];

  return (
    <div className="chart-card">

      <h3>Risk Distribution</h3>

      <ResponsiveContainer width="100%" height={300}>

        <PieChart>

          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >

            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
              />
            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default RiskChart;