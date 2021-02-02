import React from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import "../../styles/PageNavigation.css";
import { Multiselect } from "multiselect-react-dropdown";
import { activeColumnsAction } from "../../acions/filterActions";
export const PageNavigation = ({ filter, setActiveColumn }) => {
  const onSelect = (e) => {
    setActiveColumn(e);
  };

  const onRemove = (e) => {
    onSelect(e);
  };

  const reset = (e) => {
    onSelect(e);
  };

  return (
    <>
      {filter ? (
        <Row className="pageNavigation py-5 text-center">
          <Col xs={8}>
            <Multiselect
              options={filter.columns} // Options to display in the dropdown
              selectedValues={filter.activeColumns} // Preselected value to persist in dropdown
              onSelect={(e) => onSelect(e)} // Function will trigger on select event
              onRemove={(e) => onRemove(e)} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
              disablePreSelectedValues={false}
              closeOnSelect={false}
              avoidHighlightFirstOption={true}
            />
          </Col>

          <Col xs={4}>
            <Button
              className="mx-2"
              onClick={() =>
                reset(filter.activeColumns.filter((e) => e.name === "Y1"))
              }
            >
              Resetuj Filtry
            </Button>

            <Button onClick={() => reset(filter.columns)}>
              Pokaż wszystko
            </Button>
          </Col>
        </Row>
      ) : (
        <p>ładowanie...</p>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  filter: state.filter,
  chartData: state.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveColumn: (columns) => dispatch(activeColumnsAction(columns)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageNavigation);
