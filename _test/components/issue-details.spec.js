import React from "react";
import Helper from "../test-helper";

const IssueDetails = Helper.load("components/issue-details.jsx");

describe("IssueDetails", () => {
  beforeEach(Helper.startWatch); /* ..and.. */ afterEach(Helper.stopWatch);

  let detailsElement, DOM;

  beforeEach("render and locate element", () => {
    let nullIssue = { user: {} };

    DOM = Helper.render(<IssueDetails issueData={nullIssue} />);

    detailsElement = Helper.findNodeByClass(DOM, "details-row");
  });

  describe("#render", () => {
    it("should render", () => {
      detailsElement.should.exist;
    });
  });

  // simulate doesn't seem to work as advertised

  // describe("#openModal|#closeModal", () => {
  //   it("should open & close modal on click", () => {
  //     Helper.simulate.click(detailsElement);
  //
  //     Helper.shouldFindNodeByClass(DOM, "modal-dialog");
  //
  //     Helper.simulate.click(
  //       Helper.findNodeByClass(DOM, "close")
  //     );
  //
  //     Helper.shouldntFindNodeByClass(DOM, "modal-dialog");
  //   });
  // });
});
