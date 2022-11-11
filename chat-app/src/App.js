import "./App.css";
import React, { Component } from "react";
import Messages from "./components/Messages";
import Input from "./components/Input";

function randomName() {
  const adjectives = [
    "dusty",
    "secretive",
    "possible",
    "technical",
    "numberless",
    "vivacious",
    "vast",
    "secret",
    "fumbling",
    "icy",
    "ruthless",
    "shaky",
    "ignorant",
    "cool",
  ];
  const nouns = [
    "hall",
    "bath",
    "penalty",
    "steak",
    "sector",
    "driver",
    "topic",
    "queen",
    "knowledge",
    "intention",
    "photo",
    "winner",
    "wealth",
    "diamond",
  ];

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

class App extends Component {
  state = {
    messages: [],
    member: {
      username: randomName(),
      color: randomColor(),
    },
  };

  //ovdje instanciramo novu instancu Scaledronea
  constructor() {
    super();
    this.drone = new window.Scaledrone("oM6baCAEFBGfG96I", {
      data: this.state.member,
    });
    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });
    //ovdje se spajamo u sobu (chat)
    //observable prefix mora bit da bi poruke mogle sadrzavati info
    // od sendera
    const room = this.drone.subscribe("observable-room");
    //da bi znali kad poruke dolaze subscribeali smo se na "data"
    // event u sobi. Dakle kad nova poruka dodje dodajemo tekst
    // poruke i data od usera u nas state
    room.on("data", (data, member) => {
      const messages = this.state.messages;
      messages.push({ member, text: data });
      this.setState({ messages });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Algebra Chat App</h1>
          <img
            src="https://rebrand.com/wp-content/uploads/2019/11/Algebra-Fabular-Thumbnail-800X600.jpg"
            alt="Algebra logo"
          />
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input onSendMessage={this.onSendMessage} />
      </div>
    );
  }

  //ovdje pushamo novu poruku za sve usere u sobi
  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message,
    });
  };
}

export default App;
