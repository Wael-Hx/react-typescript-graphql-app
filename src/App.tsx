import "./App.css";
import Register from "./components/auth/Register";
import Navbar from "./components/nav/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" component={Navbar} />
      <Switch>
        <Route path="/auth" component={Register} />
      </Switch>
    </Router>
  );
};

export default App;
