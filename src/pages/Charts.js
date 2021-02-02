import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Chart from "../components/Chart";
import Papa from "papaparse";
import { addDataAction } from "../acions/dataActions";
import Axios from "axios";
import { Row, Col } from "react-bootstrap";
import MyPieChart from "../components/MyPieChart";
import DataTable from "../components/DataTable";
import PageNavigation from "../layouts/Navigation/PageNavigation";
import { activeColumnsAction, setColumnsAction } from "../acions/filterActions";

export const Charts = ({
  storeData,
  addData,
  match,
  setActiveColumns,
  setColumns,
  activeColumns,
  columns,
}) => {
  let dataName = `dane${match.params.id}`;
  const roundBigNumber = (n, scale = 1000) => {
    return n > scale ? Math.round(n) : n;
  };

  const transpose = (array) => {
    return array.reduce(
      (prev, next) => next.map((item, i) => (prev[i] || []).concat(next[i])),
      []
    );
  };

  const clearDummyData = (array) => {
    const clearedArray = array.map((arr) => {
      let newArr = [];
      for (let i = 0; i < arr.length - 1; i++) {
        newArr =
          typeof arr[i - 1] === "number" &&
          typeof arr[i] !== "number" &&
          typeof arr[i + 1] === "number"
            ? newArr.concat(arr[i - 1] + arr[i - 1] / 2)
            : (newArr = newArr.concat(arr[i]));
      }
      newArr =
        typeof arr[arr.length - 1] !== "number" &&
        typeof arr[arr.length - 2] === "number"
          ? (newArr = newArr.concat(arr[arr.length - 2]))
          : (newArr = newArr.concat(arr[arr.length - 1]));
      return newArr;
    });
    return clearedArray;
  };

  useEffect(() => {
    Axios.get(`/data_presentation/data/${dataName}.csv`).then((result) => {
      const data2 = Papa.parse(result.data.replace(/,/g, "."), {
        dynamicTyping: true,
      });

      const cl = data2.data.filter((el) => el.length > 2);

      const t = transpose(cl);

      const c = clearDummyData(t);

      const t1 = transpose(c);

      let finalClear = t1.map((arr) => {
        const el = arr.map((e) => {
          return roundBigNumber(e);
        });
        return el;
      });

      finalClear = finalClear.join("\n");
      const myPapa = Papa.parse(finalClear, {
        header: true,
        dynamicTyping: true,
      });

      const clearedRow = myPapa.data.filter((el) => el.X !== null);

      addData(clearedRow, dataName, myPapa.meta.fields);
      setColumns(myPapa.meta.fields.slice(1));
      setActiveColumns(
        myPapa.meta.fields
          .map((e) => {
            return { name: e, id: e };
          })
          .slice(1)
      );
    });
  }, [dataName]);

  const [chartData] = storeData.data.filter((el) => el.dataName === dataName);

  return (
    <>
      {chartData ? (
        <>
          <PageNavigation dataName={dataName} />

          <Row id="charts" className="px-5 pt-5">
            <Col xs={8}>
              <Chart
                dataName={dataName}
                chartData={chartData}
                activeColumns={activeColumns}
              />
            </Col>
            <Col xs={4}>
              <MyPieChart
                dataName={dataName}
                chartData={chartData}
                activeColumns={activeColumns}
              />
            </Col>
          </Row>
          <Row id="table" className="justify-content-center">
            <Col xs={6}>
              <DataTable
                dataName={dataName}
                chartData={chartData}
                columns={columns}
              />
            </Col>
          </Row>
        </>
      ) : (
        <p>ładowanie</p>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  storeData: state.data,
  activeColumns: state.filter.activeColumns,
  columns: state.filter.columns,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addData: (data, dataName, columnNames) =>
      dispatch(addDataAction(data, dataName, columnNames)),
    setActiveColumns: (columnNames) =>
      dispatch(activeColumnsAction(columnNames)),
    setColumns: (columnNames) => dispatch(setColumnsAction(columnNames)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Charts);
