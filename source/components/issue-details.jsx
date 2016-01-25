import axios from "axios";
import moment from "moment";

import React from "react";
import View from "./_view.jsx";
import Parse from "./parse.jsx";
import {
  Row, Col, Modal, Image, Badge, Glyphicon, Grid, Alert,
  ListGroup, ListGroupItem
} from "react-bootstrap";

import IssueActions from "../actions/issue-actions";
import IssueStore from "../stores/issue-store";

import connectToStores from "alt-utils/lib/connectToStores";

export default class IssueDetail extends View {
  constructor(props) {
    super(props);

    this.state.modalOpen = false;

    this.bindFuncs(
      "closeModal",
      "openModal",
      "renderComments",
      "renderInlineAvatar",
      "renderLabels",
      "renderModal"
    );
  }

  render() {
    let {issueData} = this.props;
    let {user} = issueData;

    return (
      <Row className="details-row" onClick={this.openModal}>
        {this.renderAvatar(user, 60)}

        <Col style={{ marginLeft: 73 }}>
          <h3>
            {this.renderUserLink(user)}: {issueData.title}
            {this.renderLabels(issueData)}
          </h3>
          <Parse inline dropafter={140}>{issueData.body}</Parse>
        </Col>

        {this.renderModal(issueData)}
      </Row>
    );
  }

  // TODO: the hell do labels look like
  renderLabels(issueData) {
    if (issueData.labels && issueData.labels.length) {
      return issueData.labels.map(label => {
        return (
          <Badge style={{ background: `#${label.color}`, marginLeft: 10, borderRadius: 1 }}>
            {label.name.replace(/-/g, " ")}
          </Badge>
        );
      });
    }
  }

  renderModal(issueData) {
    let headerGlyph = (issueData.state === "open") ? "unchecked" : "checked";

    return (
      <Modal
        className="montserrat"
        show={this.state.modalOpen}
        onHide={this.closeModal}
        animation={false}
        keyboard
      >
        <Modal.Header>
          <h2>
            <Glyphicon style={{ marginRight: 10 }} glyph={headerGlyph} />
            {issueData.title}
            {this.renderLabels(issueData)}
          </h2>
        </Modal.Header>
        <Alert>
          {this.renderInlineAvatar(issueData.user)} posted {this.since(issueData.created_at)}
        </Alert>
        <Modal.Body>
          <Parse>{issueData.body}</Parse>
        </Modal.Body>
        {this.renderComments(this.state.comments)}
      </Modal>
    );
  }

  renderComments(comments) {
    if (comments && comments.length) {
      return (
        <Modal.Footer>
          <ListGroup className="comment-section">
            {comments.map((comment) => {
              let responseLine = (
                <span>
                  {this.renderInlineAvatar(comment.user)} responded {this.since(comment.created_at)}:
                </span>
              );

              return (
                <ListGroupItem className="comment" header={responseLine}>
                  <Parse inline emphasize={this.props.issueData.user.login}>
                    {comment.body}
                  </Parse>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </Modal.Footer>
      );
    }
  }

  openModal() {
    axios.get(this.props.issueData.comments_url).then((response) => {
      this.setState({modalOpen: true, comments: response.data});
    });
  }

  closeModal() {
    this.setState({modalOpen: false});
  }

  since(dateString) {
    return moment(dateString).fromNow();
  }

  // TODO: avatar is clearly its own component
  renderAvatar(user, size) {
    return <Image src={user.avatar_url} width={size}/>;
  }

  renderUserLink(user) {
    return <a href={user.html_url}>@{user.login}</a>;
  }

  renderInlineAvatar(user, size = 24) {
    return (
      <span className="inline-avatar">
        {this.renderAvatar(user, size)}
        {this.renderUserLink(user)}
      </span>
    );
  }
}
