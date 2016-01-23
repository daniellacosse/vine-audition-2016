import Helper from "../test-helper";

const Issue = Helper.load("components/issue.jsx");

// see https://github.com/jdlehman/alt-example-tests on how to write
// tests for alt

describe("Issue", () => {
  beforeEach(Helper.startWatch); /* ..and.. */ afterEach(Helper.stopWatch);

  it("shouldn't have any tests", () => {
    true.should.be(false);
  });
});
