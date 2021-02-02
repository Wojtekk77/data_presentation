import React, { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
  Line,
} from "recharts";
import { Col, Row } from "react-bootstrap";

const MyPieChart = ({ chartData, activeColumns }) => {
  // const myData = chartData.chartData.map((el) => {
  //   return {
  //     ...el,
  //     // name: el.X,
  //   };
  // });
  // console.log("myData", myData);
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
    let col = null;
    return (
      <ul>
        {payload.map((entry, index) => {
          // console.log("entry", entry, "index", index);
          // console.log(COLORS[index % COLORS.length]);
          return (
            <li
              style={{ color: COLORS[index % COLORS.length] }}
              key={`item-${index}`}
              color={col}
            >
              {entry.payload.X}
            </li>
          );
        })}
      </ul>
    );
  };
  // const colsNumber = Object.keys(chartData.chartData[0]).length;
  // const simpleArr = Array.apply(null, Array(colsNumber - 1)).map(
  //   (x, i) => i + 1
  // );

  const wykresy = activeColumns.map((el) => {
    return (
      <div className="card my-4">
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

  return (
    <>
      {wykresy}
      {/* {myData ? (
        <div className="card">
          <div className="card-block">
            <h6>TOP {data.length} VEHICLES WITH MOST ALARMS</h6>
            <ResponsiveContainer minHeight={300}>
              <PieChart>
                <Pie
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="Y1" // TUTAJ WYMIERAMY DANE
                  data={myData}
                  nameKey="vehicleNumber"
                  valueKey="Y1" // nic tu kurwa
                  fill="#8884d8"
                  label
                >
                  {data.map((entry, index) => (
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
      ) : (
        <p>ladowanie</p>
      )} */}
    </>
  );
};
export default MyPieChart;
