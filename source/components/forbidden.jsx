import React from "react";
import View from "./_view.jsx";

import { Alert, Grid, Row } from "react-bootstrap";

export default class Forbidden extends View {
  render () {
    return (
      <section>
        <h1 style={{marginBottom: 23}}>403</h1>
        <Grid>
          <Row>
            <h2 style={{
              fontSize: 35,
              color: "white",
              textAlign: "center"
            }}>
              Out of requests.
            </h2>
          </Row>
          <Row style={{
            fontSize: 28,
            color: "white",
            textAlign: "center",
            fontWeight: 200,
            marginTop: 10
          }}>
            Come back in an hour!
          </Row>
        </Grid>
      </section>
    );
  }
}
