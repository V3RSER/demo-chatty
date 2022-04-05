import React, { Component } from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  CardTitle,
  Input,
} from "reactstrap";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      chats: [],
      content: "",
      readError: null,
      writeError: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.setState({ readError: null });
    try {
      db.ref("chats").on("value", (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        this.setState({ chats });
      });
    } catch (error) {
      this.setState({ readError: error.message });
    }
  }

  handleChange(event) {
    this.setState({
      content: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ writeError: null });
    try {
      await db.ref("chats").push({
        content: this.state.content,
        timestamp: Date.now(),
        uid: this.state.user.uid,
      });
      this.setState({ content: "" });
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }

  render() {
    return (
      <div className="pt-5 mx-auto">
        <Card>
          <CardHeader tag="h3">Messages</CardHeader>
          <CardBody>
            {this.state.chats.map((chat) => {
              return <CardText key={chat.timestamp}>{chat.content}</CardText>;
            })}
          </CardBody>
          <CardFooter className="text-muted">
            <form onSubmit={this.handleSubmit}>
              <Input
                onChange={this.handleChange}
                value={this.state.content}
              ></Input>
              {this.state.error ? <p>{this.state.writeError}</p> : null}
              <Button className="my-2" color="dark" type="submit" block>
                Send
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    );
  }
}
