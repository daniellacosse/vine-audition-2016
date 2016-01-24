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
  Grid
} from "react-bootstrap";
import connectToStores from "alt-utils/lib/connectToStores";

import IssueActions from "../actions/issue-actions";
import IssueStore from "../stores/issue-store";

import axios from "axios";

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
        <Image src={user.avatar_url} width={60} thumbnail/>
        <Col style={{
          marginLeft: 73
        }}>
          <h3>
            <a href={user.html_url}>@{user.login}</a>:
            <Parser>{issueObject.title}</Parser>
            {this.renderLabels()}
          </h3>
          <p>
            <Parser>{issueObject.body}</Parser>
          </p>
        </Col>

        <Modal
          className="montserrat"
          show={this.state.modalOpen}
          onHide={this.closeModal}
        >
          <Modal.Header>
            <h2>
              <Glyphicon style={{
                marginRight: 10
              }} glyph={(issueObject.state === "open")
                ? "unchecked"
                : "checked"}/>
              <Parser>{issueObject.title}</Parser>
              {this.renderLabels()}
            </h2>
          </Modal.Header>
          <Modal.Body>
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
          <Grid>
            {comments.map((comment) => {
              let {user} = comment;

              return (
                <Row style={{
                  fontSize: 16,
                  textAlign: "left"
                }}>
                  <Image style={{
                    marginRight: 5
                  }} src={user.avatar_url} width={24}/>
                  <a href={user.html_url}>@{user.login}</a>:
                  <Parser>{comment.body}</Parser>
                </Row>
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
