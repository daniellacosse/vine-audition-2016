import React from "react";
import View from "./_view.jsx";

import Markdown from "react-remarkable";

export default class Parse extends View {
  render() {
    let {children, options} = this.props;
    let wrappedChildren = (Array.isArray(children)) ? children : [ children ];

    let parsedContent = wrappedChildren.map((child) => {
      let {inline, dropafter, emphasize} = this.props;
      let parsedChild;

      // TODO: regex constructor so we only have to go through each string once
        // ...when I finish wayne text this will be so much easier
      if (typeof child === "string") {
        parsedChild = child;

        // insert links at "@"
        parsedChild = parsedChild.replace(/(^|\b)(@[a-zA-Z]+)($|\s)/g, (match, capture) => {
          return `[${match}](https://github.com/${match.slice(1)})`;
        });

        // emphasize str
        if (this.props.emphasize) {
          parsedChild = parsedChild.replace(this.props.emphasize, (match) => {
            return `**${match}**`;
          });
        }

        // remove /r if options.inline
        if (this.props.inline) {
          parsedChild = parsedChild.replace("\r", "").replace("\n", "");
        }

        // dropafter int
        if (this.props.dropafter) {
          parsedChild = parsedChild.slice(0, this.props.dropafter);
          parsedChild = parsedChild.replace(/(\S+)$/, (match, capture) => {
            return `<span class="final-word">${capture}...</span>`;
          });
        }
      }

      return parsedChild || child;
    });

    return (
      <Markdown
        container="span"
        className="parser"
        options={{
          linkify: this.props.linkify,
          html: true
        }}>
        {parsedContent}
      </Markdown>
    );
  }
}
