import Helper from "../test-helper";

const IssueActions = Helper.load("actions/issue-actions.js");
const IllegalActions = Helper.load("actions/illegal-actions.js");

// see https://github.com/jdlehman/alt-example-tests on how to write
// tests for alt

describe("IssueActions#fetch_issues", () => {
  beforeEach(Helper.startWatch); /* ..and.. */ afterEach(Helper.stopWatch);

  beforeEach(() => {
    let action = IssueActions.ISSUE_FETCH;
    Helper.loadActionSpies(IllegalActions, "illegalIssue");
  });

  afterEach(Helper.restoreActionSpies);

  it("dispatches correctly", () => {
    IssueActions.issueFetch();

    Helper.dispatcherSpyAction.should.be.equal(action);
    // Helper.dispatcherSpyData.should.be.deepEqual();
  });

  it("dispatches with the page parameter", () => {
    let page = 2;

    IssueActions.issueFetch({ page });

    Helper.dispatcherSpyAction.should.be.equal(action);
    // Helper.dispatcherSpyData.should.be.deepEqual();
  });
});
