import React from "react";
import View from "./_view.jsx";
import { Image } from "react-bootstrap";

const THUMB_SIZE = 24;

export default class GithubUser extends View {
  constructor(props) {
    super(props);

    this.bindFuncs("renderUserLink", "renderInlineAvatar");
  }

  render() {
    let {userData, inline, size, link} = this.props;

    if (inline) {
      return this.renderInlineAvatar(userData, size);
    } else if (link) {
      return this.renderUserLink(userData);
    } else {
      return this.renderAvatar(userData, size);
    }
  }

  renderAvatar(user, size) {
    return <Image src={user.avatar_url} width={size}/>;
  }

  renderUserLink(user) {
    return (
      <a
        href={user.html_url}
        onClick={this.stopPropagation}
      >
        @{user.login}
      </a>
    );
  }

  renderInlineAvatar(user, size = THUMB_SIZE) {
    return (
      <span className="inline-avatar">
        {this.renderAvatar(user, size)}
        {this.renderUserLink(user)}
      </span>
    );
  }

  stopPropagation(event) {
    event.stopPropagation();
  }
}
