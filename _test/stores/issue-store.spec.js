import Helper from "../test-helper";

const IssueStore = Helper.load("stores/issue-store.js");
const IssueActions = Helper.load("actions/issue-actions.js");

// see https://github.com/jdlehman/alt-example-tests on how to write
// tests for alt

xdescribe("IssueStore#fetchIssuePage", () => {
  beforeEach(Helper.startWatch); /* ..and.. */ afterEach(Helper.stopWatch);

  it("adds fetched issue page to store", () => {
    let previousIssues = IssueStore.getIssues();
    let currentIssues = [{ name: "issue1" }, { name: "issue2" }];

    IssueStore.fetchIssuePage(currentIssues);

    IssueStore.getIssues().should.have.length(
      previousIssues.length + 1
    );
  });
});
