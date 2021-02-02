import React, { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { authAction } from "../acions/authActions";
import { Col, Row } from "react-bootstrap";
export const Homepage = (props) => {
  return (
    <Row className="text-center pt-5">
      <Col>
        <h1>Witajcie na Stronie startowej</h1>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
