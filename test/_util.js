let path = require("path");
let chai = require("chai");
let TestUtils = require("react-addons-test-utils");

module.exports = {
  load: function(filename) {
    chai.should();

    return require(
      require("path").join(__dirname, "..", "src/" + filename)
    ).default;
  },
  react: TestUtils,
  simulate: TestUtils.Simulate,
  startWatch: function () {
    console.time("  ");
  },
  stopWatch: function () {
    console.timeEnd("  ");
  }
};
