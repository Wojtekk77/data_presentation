import React, { useEffect } from "react";
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
  setColumns,
  activeColumns,
  columns,
}) => {
  const dataName = `dane${match.params.id}`;

  //delete rows which not contains enough data
  const deleteUnwantedRows = (array) => {
    return array.filter((arr) => arr.length > 2);
  };

  const roundBigNumber = (n, scale = 1000) => {
    return n > scale ? Math.round(n) : n;
  };

  const transpose = (array) => {
    return array.reduce(
      (prev, next) => next.map((item, i) => (prev[i] || []).concat(next[i])),
      []
    );
  };

  // replace not numerical data from matrix to avg
  // last item return previous value if not number
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

  const roundBigData = (array) => {
    let roundedData = array.map((arr) => {
      const el = arr.map((e) => {
        return roundBigNumber(e);
      });
      return el;
    });
    return roundedData;
  };

  const proceedData = (arr) => {
    return roundBigData(
      transpose(clearDummyData(transpose(deleteUnwantedRows(arr))))
    ).join("\n");
  };

  useEffect(() => {
    if (!storeData.data.some((el) => el.dataName === dataName)) {
      Axios.get(`/data_presentation/data/${dataName}.csv`)
        .then((result) => {
          const data = Papa.parse(result.data.replace(/,/g, "."), {
            dynamicTyping: true,
          });
          const correctedData = Papa.parse(proceedData(data.data), {
            header: true,
            dynamicTyping: true,
          });
          //add corrected data to store
          addData(correctedData.data, dataName, correctedData.meta.fields);
          //add columns to store
          setColumns(correctedData.meta.fields.slice(1));
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
        <p>ładowanie...</p>
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
    setColumns: (columnNames) => dispatch(setColumnsAction(columnNames)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Charts);
