let alt = require("../source/alt").default;
let chai = require("chai");
let path = require("path");
let sinon = require("sinon");
let TestUtils = require("react-addons-test-utils");
let reactDOM = require("react-dom");

module.exports = {
  load: function(filename) {
    chai.should();

    return require(
      path.join(__dirname, "..", "source/" + filename)
    ).default;
  },
  react: TestUtils,
  render: TestUtils.renderIntoDocument,
  findNodeByClass: function (dom, className) {
    return this.react
      .findRenderedDOMComponentWithClass(dom, className)
      .getDOMNode();
  },
  findNodeByTag: function (dom, tagName) {
    return this.react
      .findRenderedDOMComponentWithTag(dom, tagName)
      .getDOMNode();
  },
  shouldFindNodeByClass: function (dom, className) {
    let node = this.findNodeByClass(dom, className);

    return node.should.exist;
  },
  shouldntFindNodeByClass: function (dom, className) {
    return this.findNodeByClass(dom, className).should.not.exist;
  },
  shouldFindNodeByTag: function (dom, tagName) {
    let node = this.findNodeByTag(dom, tagName);

    return node.should.exist;
  },
  simulate: TestUtils.Simulate,
  expects: chai.expect,
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
