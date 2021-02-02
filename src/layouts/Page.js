import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Charts from "../pages/Charts";

export const Page = (props) => {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/charts/:id" component={Charts} />

        {/* <Route path="/login" component={LoginPage} /> */}
        {/* <Route component={ErrorPage} /> */}
      </Switch>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
