import alt from "../alt";

export class IllegalActions {
  constructor() {
    this.generateActions("illegalIssue");
  }
}

export default alt.createActions(IllegalActions);
