import Helper from "../test-helper";

const JAX = Helper.load("helpers/ajax-helper.js");

describe("JAX#constructor", () => {
  beforeEach(Helper.startWatch); /* ..and.. */ afterEach(Helper.stopWatch);

  it("should construct when given a simple root", () => {
    true.should.be(false);
  });

  it("should construct when given a vanity method", () => {
    true.should.be(false);
  });

  it("should fail when no arguments are provided", () => {
    true.should.be(false);
  });
});
