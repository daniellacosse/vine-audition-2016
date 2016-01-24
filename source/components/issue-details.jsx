import React from "react";
import View from "./_view.jsx";
import Parser from "./parser.jsx";
import {
  Row,
  Col,
  Modal,
  Image,
  Badge,
  Glyphicon,
  Grid,
  Alert
} from "react-bootstrap";
import connectToStores from "alt-utils/lib/connectToStores";

import IssueActions from "../actions/issue-actions";
import IssueStore from "../stores/issue-store";

import axios from "axios";
import moment from "moment";

export default class IssueDetail extends View {
  constructor(props) {
    super(props);

    this.state.modalOpen = false;

    this.bindFuncs("openModal", "closeModal", "renderComments", "renderLabels");
  }

  render() {
    let {issueObject} = this.props;
    let {user} = issueObject;

    return (
      <Row className="details-row" onClick={this.openModal}>
        <Image src={user.avatar_url} width={60} thumbnail />
        <Col style={{
          marginLeft: 73
        }}>
          <h3>
            <a href={user.html_url}>@{user.login}</a>:&nbsp;
            {issueObject.title}
            {this.renderLabels()}
          </h3>
            <Parser inline dropafter={140}>{issueObject.body}</Parser>
        </Col>
        {/* TODO: remind who's asking the question w/ timestamp */}
        <Modal
          className="montserrat"
          show={this.state.modalOpen}
          onHide={this.closeModal}
        >
          <Modal.Header>
            <h2>
              <Glyphicon style={{ marginRight: 10 }}
                glyph={(issueObject.state === "open")
                  ? "unchecked"
                  : "checked"}
              />
              {issueObject.title}
              {this.renderLabels()}
            </h2>
          </Modal.Header>
          <Modal.Body>
            <Alert>
              <Image src={user.avatar_url} width={24} />
              posted {moment(issueObject.created_at).fromNow()}:
            </Alert>
            <Parser>{issueObject.body}</Parser>
          </Modal.Body>
          {this.renderComments()}
        </Modal>
      </Row>
    );
  }

  renderComments() {
    let {comments} = this.state;

    if (comments && comments.length) {
      return (
        <Modal.Footer>
          <Grid className="comment-section">
            {comments.map((comment) => {
              let {user} = comment;

              console.log(comment);

              return (
                <section className="comment">
                  <Row className="comment-header">
                    <Image src={user.avatar_url} width={24}/>
                    <a href={user.html_url}>@{user.login}</a> responded
                    <time>{moment(comment.created_at).fromNow()}</time>:
                  </Row>
                  <Row className="comment-body">
                    <Parser inline emphasize={this.props.issueObject.user.login}>
                      {comment.body}
                    </Parser>
                  </Row>
                </section>
              );
            })}
          </Grid>
        </Modal.Footer>
      );
    }
  }

  renderLabels() {
    let {issueObject} = this.props;

    if (issueObject.labels && issueObject.labels.length) {
      return issueObject.labels.map(label => <Badge>{label}</Badge>);
    }
  }

  openModal() {
    axios.get(this.props.issueObject.comments_url).then((response) => {
      this.setState({modalOpen: true, comments: response.data});
    });
  }

  closeModal() {
    this.setState({modalOpen: false});
  }
}
