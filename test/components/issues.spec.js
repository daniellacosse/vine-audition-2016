import Helper from "../test-helper";

const Issues = Helper.load("components/issue.jsx");

// see https://github.com/jdlehman/alt-example-tests on how to write
// tests for alt

describe("Issues", () => {
  beforeEach(Helper.startWatch); /* ..and.. */ afterEach(Helper.stopWatch);

  it("shouldn't have any tests", () => {
    Issues.should.not.exist();
  });
});
