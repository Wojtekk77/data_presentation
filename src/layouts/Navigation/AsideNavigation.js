import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "../../styles/AsideNavigation.css";

const list = [
  { name: "Strona Startowa", path: "/", exact: true },
  { name: "Strona A", path: "/charts/A" },
  { name: "Strona B", path: "/charts/B" },
];

const AsideNavigation = (props) => {
  const nav = list.map((item) => (
    <Nav.Item key={item.name} className="py-2">
      <NavLink
        to={item.path}
        exact={item.exact ? item.exact : false}
        id={item.id}
        className="link"
      >
        {item.name}
      </NavLink>
    </Nav.Item>
  ));

  return (
    <>
      <Nav className="col-md-12 d-none p-0 m-0 d-md-block bg-light sidebar">
        {nav}
      </Nav>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AsideNavigation);
