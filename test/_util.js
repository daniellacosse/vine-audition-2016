let chai = require("chai");
let jsdom = require("jsdom").jsdom;
let path = require("path");
let TestUtils = require("react-addons-test-utils");

module.exports = {
  load: function(filename) {
    chai.should();

    global.document = jsdom(
      "<!doctype html><html><body></body></html>"
    );
    
    global.window = document.parentWindow;

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
