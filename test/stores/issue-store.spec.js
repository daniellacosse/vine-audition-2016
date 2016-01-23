import Helper from "../test-helper";

const IssueStore = Helper.load("stores/issue-store.js");
const IssueActions = Helper.load("actions/issue-actions.js");

// see https://github.com/jdlehman/alt-example-tests on how to write
// tests for alt

describe("IssueStore#issuePush", () => {
  beforeEach(Helper.startWatch); /* ..and.. */ afterEach(Helper.stopWatch);

  it("listens for new issues", () => {
    let action = IssueActions.FETCH_ISSUES;
    let currentIssues = IssueStore.getIssues();
    let issues = [{ name: "issue1" }, { name: "issue2" }];

    Helper.dispatch({ issues });

    true.should.be(false);
  });
});
