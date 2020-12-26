import "./App.css";
import Register from "./components/auth/Register";
import Navbar from "./components/nav/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import AddProfile from "./components/profile/AddProfile";

const App = () => {
  return (
    <Router>
      <Route path="/" component={Navbar} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/auth" component={Register} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/profile/edit" component={AddProfile} />
      </Switch>
    </Router>
  );
};

export default App;
