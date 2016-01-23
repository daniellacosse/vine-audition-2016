import Helper from "../test-helper";

const JAX = Helper.load("helpers/ajax-helper.js");

describe("JAX#constructor", () => {
  beforeEach(Helper.startWatch); /* ..and.. */ afterEach(Helper.stopWatch);

  let root = "http://example.org";
  let config = {
    get_users: "users"
  };

  it("should construct when given a simple root", () => {
    let _ajax = new JAX(root);

    _ajax.should.not.have.property("get_users");
    _ajax.should.be.an.instanceof(JAX);
  });

  it("should construct when given a vanity method", () => {
    let _ajax = new JAX(root, config);

    _ajax.should.have.property("get_users");
    _ajax.should.be.an.instanceof(JAX);
  });

  it("should fail when no arguments are provided", () => {
    let _f = () => {
      let _ajax = new JAX();
    };

    _f.should.throw(TypeError);
  });
});
