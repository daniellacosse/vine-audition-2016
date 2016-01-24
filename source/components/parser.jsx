import React from "react";
import View from "./_view.jsx";

import Markdown from "react-remarkable";

export default class Parser extends View {
  render() {
    // first, we parse content.

    // then;

    return (
      <Markdown container="span" className="parser">
        {parsedContent}
      </Markdown>
    );
  }
}
