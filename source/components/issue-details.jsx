import React from "react";
import View from "./_view.jsx";
import { Row, Modal } from "react-bootstrap";
import connectToStores from "alt-utils/lib/connectToStores";

import IssueActions from "../actions/issue-actions";
import IssueStore from "../stores/issue-store";

export default class IssueDetail extends View {
  constructor(props) {
    super(props);

    this.state.modalOpen = false;

    this.bindFuncs("toggleModal");
  }

  render() {
    let { issueObject } = this.props;

    return (
      <Row className="details-row" onClick={this.toggleModal}>
        <h3>{ issueObject.title }</h3>
        <p>{ issueObject.body.slice(140) }</p>

        <Modal show={this.state.modalOpen} onHide={this.toggleModal}>
          <Modal.Header>
            <h2>{ issueObject.title }</h2>
          </Modal.Header>
          <Modal.Body>
            { issueObject.body }
          </Modal.Body>
        </Modal>
      </Row>
    );
  }

  toggleModal() {
    this.setState({ modalOpen: !this.state.modalOpen });
  }
}
