import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";

export const DataTable = ({ chartData, dataName, columns }) => {
  const downloadData = `data/${dataName}.csv`;

  let cols = [{ field: "id", headerName: "X" }].concat(
    columns.map((el) => {
      return { field: el.id, headerName: el.name };
    })
  );

  const rows = chartData.chartData.map((el) => {
    return { ...el, id: el.X };
  });

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={cols}
          pageSize={7}
          rowHeight={38}
          columnsWidth={170}
        />
      </div>
      <p>
        <Link to={downloadData} target="_blank" download>
          pobierz csv
        </Link>
      </p>
    </>
  );
};

const mapStateToProps = (state) => ({
  activeColumns: state.filter.activeColumns,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
