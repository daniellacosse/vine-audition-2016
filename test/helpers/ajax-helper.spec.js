import Helper from "../test-helper";

const JAX = Helper.load("helpers/ajax-helper.js");

describe("JAX#constructor", () => {
  beforeEach(Helper.startWatch); /* ..and.. */ afterEach(Helper.stopWatch);

  it("should construct when given a simple root", () => {
    let _ajax = new JAX("http://example.org");

    _ajax.should.not.respondTo("get_users");
    _ajax.should.be.an.instanceof(JAX);
  });

  it("should construct when given a vanity method", () => {
    let _ajax = new JAX("http://example.org", { get_users: "users" });

    _ajax.should.respondTo("get_users");
    _ajax.should.be.an.instanceof(JAX);
  });

  it("should fail when no arguments are provided", () => {
    let _f = () => {
      let _ajax = new JAX();
    };

    _f.should.throw(TypeError);
  });
});
