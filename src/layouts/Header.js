import React from "react";
import { connect } from "react-redux";

import TopBarNavigation from "../layouts/Navigation/TopBarNavigation";

export const Header = (props) => {
  return <TopBarNavigation />;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
