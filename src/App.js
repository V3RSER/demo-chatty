import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { auth } from "./services/firebase";
import Header from "./components/Header";
import { Spinner } from "reactstrap";

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    });
  }

  render() {
    return this.state.loading? (
      <Spinner
        color="dark"
        style={{ position: "absolute", top: "50%", left: "50%" }}
      >
        Loading...
      </Spinner>
    ) : (
      <div className="cover-container d-flex h-100 mx-auto flex-column">
        <Router>
          <Header authenticated={this.state.authenticated} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/chat"
              element={
                this.state.authenticated ? <Chat /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/login"
              element={
                this.state.authenticated ? <Navigate to="/chat" /> : <Login />
              }
            />
            <Route
              path="/signup"
              element={
                this.state.authenticated ? <Navigate to="/chat" /> : <Signup />
              }
            />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
