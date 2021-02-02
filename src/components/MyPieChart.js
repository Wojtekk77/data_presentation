import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const MyPieChart = ({ chartData, activeColumns }) => {
  const COLORS = [
    "#55D8FE",
    "#FD8373",
    "#5EE2A0",
    "#428df5",
    "#cef542",
    "#f542c2",
    "#42f2f5",
    "#e9f542",
    "#f56942",
    "#42e9f5",
    "#e342f5",
    "#f54248",
  ];

  const renderLegend = (props) => {
    const { payload } = props;

    return (
      <ul>
        {payload.map((entry, index) => {
          return (
            <li
              style={{ color: COLORS[index % COLORS.length] }}
              key={`item-${index}`}
            >
              {entry.payload.X}
            </li>
          );
        })}
      </ul>
    );
  };

  const wykresy = activeColumns.map((el) => {
    return (
      <div key={el.id} className="card my-4">
        <div className="card-block text-center">
          <h6>Wykres dla kolumny {el.id}</h6>
          <ResponsiveContainer minHeight={300}>
            <PieChart>
              <Pie
                innerRadius={50}
                outerRadius={80}
                dataKey={el.id}
                data={chartData.chartData}
                nameKey="vehicleNumber"
                valueKey="X"
                fill="#8884d8"
                // label
              >
                {chartData.chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend
                content={renderLegend}
                layout="vertical"
                verticalAlign="middle"
                align="right"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  });

  return <>{wykresy}</>;
};
export default MyPieChart;
