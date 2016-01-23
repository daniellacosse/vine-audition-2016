let alt = require("../source/alt").default;
let chai = require("chai");
let jsdom = require("jsdom").jsdom;
let path = require("path");
let sinon = require("sinon");
let TestUtils = require("react-addons-test-utils");

module.exports = {
  dispatcherSpy: null,
  illegalSpy: null,
  illegalAction: null,
  illegalActionMethod: null,
  loadActionSpies: function (illegalAction, illegalActionMethod) {
    this.illegalAction = illegalAction;
    this.illegalActionMethod = illegalActionMethod;

    this.dispatcherSpy = sinon.spy(alt.dispatcher, "dispatch");
    this.illegalSpy = sinon.spy(illegalAction, illegalActionMethod);
  },
  restoreActionSpies: function() {
    alt.dispatcher.dispatch.restore();
    this.illegalAction[this.illegalActionMethod].restore();
  },
  dispatcherSpyAction: function() {
    return this.dispatcherSpy.args[0][0].action;
  },
  dispatcherSpyData: function() {
    return this.dispatcherSpy.args[0][0].data;
  },
  load: function(filename) {
    chai.should();

    global.document = jsdom(
      "<!doctype html><html><body></body></html>"
    );

    global.window = document.parentWindow;

    return require(
      require("path").join(__dirname, "..", "source/" + filename)
    ).default;
  },
  react: TestUtils,
  simulate: TestUtils.Simulate,
  dispatch: function (options) {
    if (!options.data) options.data = {};

    return alt.dispatcher.dispatch(options);
  },
  startWatch: function () {
    console.time("  ");
  },
  stopWatch: function () {
    console.timeEnd("  ");
  }
};
