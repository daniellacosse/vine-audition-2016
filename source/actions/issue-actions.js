import alt from "../alt";
import { browserHistory } from "react-router";
import JAX from "../helpers/ajax-helper";

const ISSUE_API = "https://api.github.com/repos/npm/npm";

class IssueActions {
  constructor() {
    this._ajax = new JAX(ISSUE_API, {
      get_issues: "issues"
    });
  }

  fetchIssuePage(options, done) {
    let { page } = (!!options) ? options : {};

    return (dispatch) => {
      this._ajax
        .get_issues({ page })
        .then((data) => {
          if (done) done();
          return dispatch(data);
        })
        .catch((err) => {
          if (done) done(err);
          if (err.status === 403) {
            browserHistory.push("/forbidden");
          } else {
            console.error(err);
          }
        });
    };
  }
}

export default alt.createActions(IssueActions);
