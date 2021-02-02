import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";

export const DataTable = ({ chartData, dataName, columns }) => {
  const downloadData = `data/${dataName}.csv`;

  let mycolumns = [{ field: "id", headerName: "X" }].concat(
    columns.map((el) => {
      return { field: el.id, headerName: el.name };
    })
  );

  const myrows = chartData.chartData.map((el) => {
    return { ...el, id: el.X };
  });

  // console.log("czymycolumns sie aktualizuje", activeColumns);

  return (
    <>
      {/* <p>{activeColumns.map((el) => el.id)}</p> */}
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={myrows}
          columns={mycolumns}
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
