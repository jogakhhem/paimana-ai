import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ShapChart({ data }) {

  const chartData = [...(data || [])]
    .sort(
      (a, b) =>
        b.mean_absolute_shap -
        a.mean_absolute_shap
    )
    .map((item) => ({
      feature: item.feature,
      importance: Number(
        item.mean_absolute_shap.toFixed(2)
      ),
    }));

  return (
    <div className="chart-card">

      <h3>Top Cost Overrun Drivers</h3>

      <ResponsiveContainer width="100%" height={350}>

        <BarChart
          data={chartData}
          layout="vertical"
          margin={{
            left: 40,
            right: 30,
          }}
        >

          <XAxis type="number" />

          <YAxis
            type="category"
            dataKey="feature"
            width={180}
          />

          <Tooltip />

          <Bar
            dataKey="importance"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default ShapChart;