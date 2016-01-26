import axios from "axios";
import moment from "moment";

import React from "react";
import {
  Row, Col, Modal, Image, Badge, Glyphicon, Grid, Alert,
  ListGroup, ListGroupItem
} from "react-bootstrap";

// TODO: use index
import View from "./_view.jsx";
import Parse from "./parse.jsx";
import GithubUser from "./github-user.jsx";

import IssueActions from "../actions/issue-actions";
import IssueStore from "../stores/issue-store";

import connectToStores from "alt-utils/lib/connectToStores";

export default class IssueDetails extends View {
  constructor(props) {
    super(props);

    this.state.modalOpen = false;

    this.bindFuncs(
      "closeModal",
      "openModal",
      "renderComments",
      "renderLabels",
      "renderModal"
    );
  }

  render() {
    let {issueData} = this.props;
    let {user} = issueData;

    return (
      <Row className="details-row" onClick={this.openModal}>
        <GithubUser size={78} userData={user} />

        <Col style={{ marginLeft: 111 }}>
          <h3>
            <GithubUser link userData={user} />: {issueData.title}
            {this.renderLabels(issueData)}
          </h3>
          <Parse inline dropafter={140}>{issueData.body}</Parse>
        </Col>

        {this.renderModal(issueData)}
      </Row>
    );
  }

  renderLabels(issueData) {
    if (issueData.labels && issueData.labels.length) {
      return issueData.labels.map(label => {
        return (
          <Badge key={label.name} style={{ background: `#${label.color}` }}>
            {label.name.replace(/-/g, " ")}
          </Badge>
        );
      });
    }
  }

  renderModal(issueData) {
    let headerGlyph = (issueData.state === "open") ? "alert" : "saved";
    let headerColor = (issueData.state === "open") ? "green" : "red";

    return (
      <Modal
        className="montserrat"
        show={this.state.modalOpen}
        onHide={this.closeModal}
        animation={false}
        keyboard
      >
        <Modal.Header>
          <h2 style={{ color: headerColor }}>
            <Glyphicon style={{ marginRight: 10 }} glyph={headerGlyph} />
            {issueData.title}
            {this.renderLabels(issueData)}
          </h2>
        </Modal.Header>
        <Alert>
          <GithubUser inline userData={issueData.user} /> posted {this.since(issueData.created_at)}
        </Alert>
        <Modal.Body>
          <Parse linkify>{issueData.body || "No details provided."}</Parse>
        </Modal.Body>
        {this.renderComments(this.state.comments, issueData.user)}
      </Modal>
    );
  }

  renderComments(comments, poster) {
    if (comments && comments.length) {
      return (
        <Modal.Footer>
          <ListGroup className="comment-section">
            {comments.map((comment, i) => {
              let isOriginalUser, responseLine = (
                <span>
                  <GithubUser inline userData={comment.user} /> responded {this.since(comment.created_at)}:
                </span>
              );

              if (comment.user.login === poster.login)
                isOriginalUser = "original-user";

              return (
                <ListGroupItem
                  key={i}
                  className={`comment ${isOriginalUser}`}
                  header={responseLine}
                >
                  <Parse inline linkify emphasize={`@${poster.login}`}>
                    {comment.body}
                  </Parse>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </Modal.Footer>
      );
    } else {
      return <Modal.Footer>No comments yet.</Modal.Footer>;
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
}
