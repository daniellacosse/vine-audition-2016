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
        <iframe
          frameborder="0"
          scrolling="no"
          seamless="seamless"
          height="300"
          src="https://vine.co/v/Otx229HnZdL/card?mute=0"
        />
      </ErrorPage>
    );
  }
}
