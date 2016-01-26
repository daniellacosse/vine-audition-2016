import React from "react";
import View from "./_view.jsx";

import ErrorPage from "./error-page.jsx";

export default class Forbidden extends View {
  render () {
    return (
      <ErrorPage
        status={404}
        header="Page wasn't found."
        detail="Here's this, though:"
      >

      </ErrorPage>
    );
  }
}
