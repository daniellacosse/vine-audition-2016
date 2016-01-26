import React from "react";
import View from "./_view.jsx";

import ErrorPage from "./error-page.jsx";

export default class Forbidden extends View {
  render () {
    return (
      <ErrorPage
        status={403}
        header="Out of requests."
        detail="Come back in an hour!"
      />
    );
  }
}
