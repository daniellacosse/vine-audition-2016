import React from "react";
import View from "./_view.jsx";

import { Alert, Grid, Row } from "react-bootstrap";

export default class ErrorPage extends View {
  render () {
    return (
      <section className="error-page">
        <h1>{this.props.status}</h1>
        <Grid>
          <Row>
            <h2>{this.props.header}</h2>
          </Row>
          <Row className="error-detail">
            {this.props.detail}
          </Row>
          <Row className="error-extra">
            {this.props.children}
          </Row>
        </Grid>
      </section>
    );
  }
}
