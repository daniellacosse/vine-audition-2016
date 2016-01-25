import alt from "../alt";

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
          // TODO refactor into error page/as illegal action
          if (err.status === 403) {
            alert("Out of requests. Come back in an hour!");
          } else {
            console.error(err);
          }

          done();
        });
    };
  }
}

export default alt.createActions(IssueActions);
