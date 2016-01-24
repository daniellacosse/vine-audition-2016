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

   fetchIssuePage(issues) {
      this.issuePages.push(issues);
   }
}

export default alt.createStore(IssueStore);
