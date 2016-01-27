import React from "react";
import Helper from "../test-helper";

const Parse = Helper.load("components/parse.jsx");

xdescribe("Parse", () => {
  beforeEach(Helper.startWatch); /* ..and.. */ afterEach(Helper.stopWatch);

  let parseElement, DOM;

  beforeEach(() => {
    DOM = Helper.render(<Parse>**Hello**</Parse>);
  });

  it("should parse text", () => {
    Helper.shouldFindNodeByTag(DOM, "strong");
  });
});
