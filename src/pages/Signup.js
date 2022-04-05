import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Input } from "reactstrap";
import { signup, signInWithGoogle, signInWithGitHub } from "../helpers/auth";

export default class Signup extends Component {
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
      await signup(this.state.email, this.state.password);
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
        <form onSubmit={this.handleSubmit}>
          <h1>Sign Up to Chatty</h1>
          <p>Fill in the form below to create an account.</p>
          <div>
            <Input
              placeholder="Email"
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
            ></Input>
          </div>
          <div>
            <Input
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
            ></Input>
          </div>
          <div>
            {this.state.error ? (
              <Alert color="danger" dismissible>
                {this.state.error}
              </Alert>
            ) : null}
            <Button block className="my-2" type="submit">
              Sign up with Email
            </Button>
            <Button
              block
              className="my-2"
              color="white"
              style={{ border: "1px solid" }}
              onClick={this.googleSignIn}
              type="button"
            >
              Sign up with Google
            </Button>
            <Button
              block
              className="my-2"
              color="dark"
              type="button"
              onClick={this.githubSignIn}
            >
              Sign up with GitHub
            </Button>
          </div>
          <hr></hr>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    );
  }
}
