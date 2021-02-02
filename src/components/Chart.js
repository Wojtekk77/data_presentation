import React from "react";
import { connect } from "react-redux";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const Chart = ({ chartData, activeColumns }) => {
  const wykresy = activeColumns.map((el) => {
    return (
      <div key={el.id} className="card my-4">
        <div className="card-block">
          <h6 className="pl-3">Wykres dla kolumny {el.id}</h6>
          <ResponsiveContainer minHeight={300}>
            <AreaChart
              width={900}
              height={300}
              data={chartData.chartData}
              margin={{
                top: 10,
                right: 25,
                left: 15,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#54D8FF" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#54D8FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="" />
              <XAxis dataKey="X" tick={{ fontSize: "11px" }} interval={0} />
              <YAxis
                allowDataOverflow={true}
                type="number"
                domain={["auto", "auto"]}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey={el.id}
                stroke="#54D8FF"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  });

  return <>{wykresy}</>;
};

const mapStateToProps = (state) => ({
  storeData: state.data,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
