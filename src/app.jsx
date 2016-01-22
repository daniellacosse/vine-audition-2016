import Alt from "alt";
import { Grid, Row } from "react-bootstrap";
import { render } from "react-dom";
import { Router, Route, browserHistory } from "react-router";

class Index extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <h1>HELLO-WELCOME TO ALT-SLUG</h1>
        </Row>
        {this.props.children}
      </Grid>
    );
  }
}

render(
  (
    <Router history={browserHistory}>
      <Route path="/" component={Index} />
    </Router>
  ),
  document.findElementById("react-container")
);

export default new Alt();
