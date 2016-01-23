import Helper from "../test-helper";
import sinon from "sinon";

const IssueActions = Helper.load("actions/issue-actions.js");
const IllegalActions = Helper.load("actions/illegal-actions.js");

// see https://github.com/jdlehman/alt-example-tests on how to write
// tests for alt

describe("IssueActions#fetch_issues", () => {
  beforeEach(Helper.startWatch); /* ..and.. */ afterEach(Helper.stopWatch);

  let action = IssueActions.ISSUE_FETCH;
  let dispatcherSpy;

  beforeEach(() => {
    dispatcherSpy = sinon.spy(Helper, 'dispatch');
    // this.illegalSpy = sinon.spy(IllegalActions, 'illegalPet');
  });

  afterEach(function() {
    // clean up our sinon spy so we do not affect other tests
    Helper.dispatch.restore();
    // legalActions.illegalPet.restore();
  });

  // afterEach(Helper.restoreActionSpies);

  it("dispatches correctly", () => {
    IssueActions.fetchIssuePage();

    console.log(dispatcherSpy.args);

    Helper.dispatcherSpyAction().should.be.equal(action);
    // Helper.dispatcherSpyData().should.be.deepEqual();
  });

  it("dispatches with the page parameter", () => {
    IssueActions.fetchIssuePage({ page: 2 });

    console.log(dispatcherSpy.args);

    Helper.dispatcherSpyAction().should.be.equal(action);
    // Helper.dispatcherSpyData().should.be.deepEqual();
  });
});
