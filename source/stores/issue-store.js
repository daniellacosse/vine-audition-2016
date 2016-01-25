import alt from "../alt";
import IssueActions from "../actions/issue-actions";

class IssueStore {
   constructor() {
      this.bindListeners({
        fetchIssuePage: IssueActions.fetchIssuePage
      });

      this.issuePages = [];
   }

   static getIssues() {
     return this.getState().issuePages;
   }

   /* ========== EVENT HANDLERS ============*/

   fetchIssuePage(issuePage) {
     let issuePages = this.issuePages;

     issuePages.push(issuePage);

     this.setState({ issuePages });
   }
}

export default alt.createStore(IssueStore);
