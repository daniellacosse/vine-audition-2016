import Helper from "../test-helper";

const IssueStore = Helper.load("stores/issue-store.js");
const IssueActions = Helper.load("actions/issue-actions.js");

// see https://github.com/jdlehman/alt-example-tests on how to write
// tests for alt

describe("IssueStore#issuePush", () => {
  beforeEach(Helper.startWatch); /* ..and.. */ afterEach(Helper.stopWatch);

  it("listens for new issues", () => {
    let action = IssueActions.ISSUE_PUSH;
    let previousIssues = IssueStore.getIssues();
    let currentIssues = [{ name: "issue1" }, { name: "issue2" }];

    Helper.dispatch({ action, issues: currentIssues });

    IssueStore.getIssues().should.have.length(
      previousIssues.length + currentIssues.length
    );
  });
});
