"use client";

import {
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const lineData = [
  { day: "Mon", clicks: 1200 },
  { day: "Tue", clicks: 980 },
  { day: "Wed", clicks: 1650 },
  { day: "Thu", clicks: 1430 },
  { day: "Fri", clicks: 2100 },
  { day: "Sat", clicks: 1900 },
  { day: "Sun", clicks: 2300 },
];

const barData = [
  { ref: "Google", clicks: 4200 },
  { ref: "Twitter", clicks: 2800 },
  { ref: "Newsletter", clicks: 1500 },
  { ref: "Reddit", clicks: 900 },
];

const pieData = [
  { name: "US", value: 58 },
  { name: "DE", value: 12 },
  { name: "UK", value: 9 },
  { name: "IN", value: 8 },
  { name: "Other", value: 13 },
];

const COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

export function ClicksOverTimeChart() {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={lineData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="clicks"
            stroke="var(--color-primary)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TopReferrersBar() {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="ref" />
          <YAxis />
          <Tooltip />
          {/* <Bar
            dataKey="clicks"
            fill="var(--color-chart-2)"
            radius={[6, 6, 0, 0]}
          /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DistributionPie({ title }: { title: string }) {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip />
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
            innerRadius={50}
          >
            {pieData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
