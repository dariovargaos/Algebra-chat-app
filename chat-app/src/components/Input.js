import { Component } from "react";
import React from "react";

class Input extends Component {
  state = {
    text: "",
  };
  //kad se textfield value promijeni, updateamo naš state da se poklopi sa promijenom
  render() {
    return (
      <div className="Input">
        <form onSubmit={(e) => this.onSubmit(e)}>
          <input
            onChange={(e) => this.onChange(e)}
            value={this.state.text}
            type="text"
            placeholder="Type here your message and press ENTER"
            autofocus="true"
          />
          <button>Send</button>
        </form>
      </div>
    );
  }
  //svaki put kad se se textfield promijeni, triggera se render
  onChange(e) {
    this.setState({ text: e.target.value });
  }

  //ovdje šaljemo poruke
  //preventDefault koristimo da se app ne refresha svaki put
  // kad se pošalje nova poruka
  onSubmit(e) {
    e.preventDefault();
    this.setState({ text: "" });
    this.props.onSendMessage(this.state.text);
  }
}

export default Input;
