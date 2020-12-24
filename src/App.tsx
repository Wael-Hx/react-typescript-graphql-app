import "./App.css";
import Register from "./components/auth/Register";
import Navbar from "./components/nav/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";

const App = () => {
  return (
    <Router>
      <Route path="/" component={Navbar} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/auth" component={Register} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
};

export default App;
