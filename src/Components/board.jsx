import React, { Component } from "react";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const boardStyle = css`
  .board {
  }

  width: 80%;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: coral;

  .boardtiles {
    color: red;
    height: 80px;
    width: 80px;
  }
  .bluebg {
    background-color: blue;
  }
  .redbg {
    background-color: red;
  }
`;

class Board extends Component {
  state = {
    currentTurn: 1,
    currentPlayer: "p1",
    memorySlots: [],
    slots: ["{UL: }", "UM", "UR", "ML", "MC", "MR", "LL", "LM", "LR"]
  };

  //   componentDidMount() {}

  handleSwitchTurn = e => {
    this.state.currentPlayer === "p1"
      ? (e.target.className = "boardtiles bluebg")
      : (e.target.className = "boardtiles redbg");

    this.state.currentPlayer === "p1"
      ? this.setState({ currentPlayer: "p2" })
      : this.setState({ currentPlayer: "p1" });
    // console.log(e.target.className);
  };

  handleReset = () => {
    console.log(this);
  };

  render() {
    return (
      <React.Fragment>
        <div css={boardStyle}>
          {this.state.slots.map((tag, i) => (
            <div
              className="boardtiles"
              id={tag}
              key={i}
              onClick={this.handleSwitchTurn}
            />
          ))}
        </div>

        <h1>{this.state.currentPlayer}</h1>
        <button onClick={this.handleReset}> Reset </button>
        {/* <button onClick={this.handleRewind}> Reset </button> */}
      </React.Fragment>
    );
  }
}

export default Board;
