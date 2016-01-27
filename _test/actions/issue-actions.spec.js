import Helper from "../test-helper";
import sinon from "sinon";

const IssueActions = Helper.load("actions/issue-actions.js");

// see https://github.com/jdlehman/alt-example-tests on how to write
// tests for alt

xdescribe("IssueActions#fetchIssuePage", () => {
  beforeEach(Helper.startWatch); /* ..and.. */ afterEach(Helper.stopWatch);

  let action = IssueActions.FETCH_ISSUE_PAGE;
  let dispatcherSpy;

  beforeEach(() => {
    dispatcherSpy = sinon.spy(Helper, "dispatch");
  });

  afterEach(function() {
    // clean up our sinon spy so we do not affect other tests
    Helper.dispatch.restore();
  });

  // afterEach(Helper.restoreActionSpies);

  it("dispatches correctly", () => {
    let result = IssueActions.fetchIssuePage();

    console.log(result());
    console.log(dispatcherSpy.args);

    // Helper.dispatcherSpyAction().should.be.equal(action);
    // Helper.dispatcherSpyData().should.be.deepEqual();
  });

  it("dispatches with the page parameter", () => {
    let result = IssueActions.fetchIssuePage({ page: 2 });

    console.log(result());
    console.log(dispatcherSpy.args);

    // Helper.dispatcherSpyAction().should.be.equal(action);
    // Helper.dispatcherSpyData().should.be.deepEqual();
  });
});
