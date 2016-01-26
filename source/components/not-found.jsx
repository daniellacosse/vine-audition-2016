import React from "react";
import View from "./_view.jsx";

import { Alert, Grid, Row } from "react-bootstrap";

export default class NotFound extends View {
  render () {
    return (
      <section>
        <h1 style={{marginBottom: 23}}>404</h1>
        <Grid>
          <Row>
            <h2 style={{
              fontSize: 35,
              color: "white",
              textAlign: "center"
            }}>
                Page wasn't found.
            </h2>
          </Row>
          <Row style={{
            fontSize: 28,
            color: "white",
            textAlign: "center",
            fontWeight: 200,
            marginTop: 10
          }}>
            Here's this, though:
          </Row>
          <Row>

          </Row>
        </Grid>
      </section>
    );
  }
}
