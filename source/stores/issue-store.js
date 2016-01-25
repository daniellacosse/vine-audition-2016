import alt from "../alt";
import IssueActions from "../actions/issue-actions";

class IssueStore {
  constructor() {
    this.bindListeners({
      fetchIssuePage: IssueActions.fetchIssuePage
    });

    this.issuePages = [];
    this.remainder = [];
  }

  static getIssues() {
    return this.getState().issuePages;
  }

  /* ========== EVENT HANDLERS ============*/

  // I'm a little annoyed you're making me do this, Vine.
  // You cheeky buggers.
  fetchIssuePage(issuePage) {
    let { issuePages } = this;

    let remainderAndCurrent = this.remainder.concat(issuePage);
    let newIssuePage = remainderAndCurrent.slice(0, 25);
    let remainder = remainderAndCurrent.slice(25);

    issuePages.push(newIssuePage);

    this.setState({
      issuePages, remainder
    });
  }
}

export default alt.createStore(IssueStore);
