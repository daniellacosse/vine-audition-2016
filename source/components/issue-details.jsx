import React from "react";
import View from "./_view.jsx";
import { Row, Col, Modal, Image, Badge, Glyphicon, Grid } from "react-bootstrap";
import connectToStores from "alt-utils/lib/connectToStores";

import IssueActions from "../actions/issue-actions";
import IssueStore from "../stores/issue-store";

import axios from "axios";

import JAX from "../helpers/ajax-helper";

export default class IssueDetail extends View {
  constructor(props) {
    super(props);

    this.state.modalOpen = false;

    this.bindFuncs("openModal", "closeModal");
  }

  render() {
    let { issueObject } = this.props;
    let { comments } = this.state;
    let { user } = issueObject;
    let labels = issueObject.labels.map(label => <Badge>{label}</Badge>);
    let modalFooter;

    if (comments && comments.length) {
        modalFooter = (
          <Modal.Footer>
            <Grid>
              {comments.map((comment) => {
                let { user } = comment;

                return (
                  <Row style={{ fontSize: 16, textAlign: "left" }}>
                    <Image style={{ marginRight: 5 }} src={user.avatar_url} width={24} />
                    <a href={user.html_url}>@{user.login}</a>: {comment.body}
                  </Row>
                );
              })}
            </Grid>
          </Modal.Footer>
        );
    }

    return (
      <Row className="details-row" onClick={this.openModal}>
        <Image src={user.avatar_url} width={60} thumbnail />
        <Col>
          <h3>
            <a href={user.html_url}>@{user.login}</a>: { issueObject.title }
            {labels}
          </h3>
          <p>{ issueObject.body.slice(0, 140) }...</p>
        </Col>

        <Modal show={this.state.modalOpen} onHide={this.closeModal}>
          <Modal.Header>
            <h2>
              <Glyphicon
                style={{ marginRight: 10 }}
                glyph={(issueObject.state === "open") ? "unchecked" : "checked"}
              />
              { issueObject.title }
              { labels }
            </h2>
          </Modal.Header>
          <Modal.Body>
            <p style={{ padding: "20px", fontSize: "16px" }}>
              { issueObject.body }
            </p>
          </Modal.Body>
          {modalFooter}
        </Modal>
      </Row>
    );
  }

  openModal() {
    axios
      .get(this.props.issueObject.comments_url)
      .then((response) => {
        this.setState({
          modalOpen: true,
          comments: response.data
        });
      });
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }
}
