import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Input } from "reactstrap";
import { signin, signInWithGoogle, signInWithGitHub } from "../helpers/auth";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
    this.githubSignIn = this.githubSignIn.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: "" });
    try {
      await signin(this.state.email, this.state.password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  async googleSignIn() {
    try {
      await signInWithGoogle();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  async githubSignIn() {
    try {
      await signInWithGitHub();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <div className="pt-5 mx-auto">
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <h1>Login to Chatty</h1>
          <p>Fill in the form below to login to your account.</p>
          <div>
            <Input
              placeholder="Email"
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
              className="my-2"
            />
          </div>
          <div>
            <Input
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
              className="my-2"
            />
          </div>
          <div>
            {this.state.error ? (
              <Alert color="danger" dismissible>
                {this.state.error}
              </Alert>
            ) : null}
            <Button block className="my-2" type="submit">
              Log in with Email
            </Button>
            <Button block className="my-2" color="white" style={{ border: "1px solid" }} onClick={this.googleSignIn} type="button">
              Log in with Google
            </Button>
            <Button block className="my-2" color="dark" type="button" onClick={this.githubSignIn}>
              Log in with GitHub
            </Button>
          </div>
          <hr />
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    );
  }
}
