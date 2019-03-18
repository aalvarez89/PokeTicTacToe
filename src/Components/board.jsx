import React, { Component } from "react";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Tile from "../Components/tile.jsx";
import circle from "../circle.svg";
import cross from "../cross.svg";

const boardStyle = css`
  width: 80%;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);

  grid-gap: 20px;

  justify-items: center;
  align-items: center;

  margin: 0 auto;

  background-color: #dfdfdf;

  .frame {
    height: calc(100vh / 4);
    width: 100%;
  }
  .itle {
    background-color: white;
    height: 100%;
    width: 100%;
  }

  .post-game {
    pointer-events: none;
  }

  .cross {
    background-color: white;
    height: 100%;
    width: 100%;

    background-image: url(${cross});
    background-repeat: no-repeat;
    background-size: 70%;
    background-position: center;
    pointer-events: none;
  }
  .circle {
    background-color: white;
    height: 100%;
    width: 100%;

    background-image: url(${circle});
    background-repeat: no-repeat;
    background-size: 70%;
    background-position: center;
    pointer-events: none;
  }
`;

class Board extends Component {
  state = {
    currentTurn: 1,
    currentPlayer: Math.random() >= 0.5 ? "p1" : "p2",
    rewind: [],
    winConditionMet: false,
    slots: [
      { tag: "UL", status: "neutral", player: null },
      { tag: "UM", status: "neutral", player: null },
      { tag: "UR", status: "neutral", player: null },
      { tag: "ML", status: "neutral", player: null },
      { tag: "MC", status: "neutral", player: null },
      { tag: "MR", status: "neutral", player: null },
      { tag: "LL", status: "neutral", player: null },
      { tag: "LM", status: "neutral", player: null },
      { tag: "LR", status: "neutral", player: null }
    ]
  };

  static getDerivedStateFromProps(prevProps, prevState) {
    let win = prevState.slots;
    let winConfirm = false;
    if (
      (win[0].player === "p1" &&
        win[1].player === "p1" &&
        win[2].player === "p1") ||
      (win[0].player === "p2" &&
        win[1].player === "p2" &&
        win[2].player === "p2")
    ) {
      winConfirm = !winConfirm;
      console.log("win!");
    } else if (
      (win[0].player === "p1" &&
        win[3].player === "p1" &&
        win[6].player === "p1") ||
      (win[0].player === "p2" &&
        win[3].player === "p2" &&
        win[6].player === "p2")
    ) {
      winConfirm = !winConfirm;
      console.log("win!");
    } else if (
      (win[0].player === "p1" &&
        win[4].player === "p1" &&
        win[8].player === "p1") ||
      (win[0].player === "p2" &&
        win[4].player === "p2" &&
        win[8].player === "p2")
    ) {
      winConfirm = !winConfirm;
      console.log("win!");
    } else if (
      (win[3].player === "p1" &&
        win[4].player === "p1" &&
        win[5].player === "p1") ||
      (win[3].player === "p2" &&
        win[4].player === "p2" &&
        win[5].player === "p2")
    ) {
      winConfirm = !winConfirm;
      console.log("win!");
    } else if (
      (win[1].player === "p1" &&
        win[4].player === "p1" &&
        win[7].player === "p1") ||
      (win[1].player === "p2" &&
        win[4].player === "p2" &&
        win[7].player === "p2")
    ) {
      winConfirm = !winConfirm;
      console.log("win!");
    } else if (
      (win[2].player === "p1" &&
        win[4].player === "p1" &&
        win[6].player === "p1") ||
      (win[2].player === "p2" &&
        win[4].player === "p2" &&
        win[6].player === "p2")
    ) {
      winConfirm = !winConfirm;
      console.log("win!");
    } else if (
      (win[6].player === "p1" &&
        win[7].player === "p1" &&
        win[8].player === "p1") ||
      (win[6].player === "p2" &&
        win[7].player === "p2" &&
        win[8].player === "p2")
    ) {
      winConfirm = !winConfirm;
      console.log("win!");
    } else if (
      (win[2].player === "p1" &&
        win[5].player === "p1" &&
        win[8].player === "p1") ||
      (win[2].player === "p2" &&
        win[5].player === "p2" &&
        win[8].player === "p2")
    ) {
      winConfirm = !winConfirm;
      console.log("win!");
    } else {
      if (
        win[0].status === "active" &&
        win[1].status === "active" &&
        win[2].status === "active" &&
        win[3].status === "active" &&
        win[4].status === "active" &&
        win[5].status === "active" &&
        win[6].status === "active" &&
        win[7].status === "active" &&
        win[8].status === "active"
      ) {
        console.log("game tied!");
      }
    }

    return { winConditionMet: winConfirm };
  }

  handleRewind() {
    const lastState = this.state.rewind.pop();
    this.setState(lastState);
  }

  render() {
    return (
      <React.Fragment>
        <div css={boardStyle}>
          {this.state.slots.map((e, i) => (
            <div className="frame" key={i}>
              <Tile
                id={e.tag}
                key={i}
                status={e.player}
                player={this.state.currentPlayer}
                //CLICK EVENT
                handleClick={e => {
                  let coordinate = e.target.id;

                  this.setState({
                    slots: this.state.slots.map(slot =>
                      slot.tag === coordinate
                        ? {
                            tag: slot.tag,
                            status: "active",
                            player:
                              this.state.currentPlayer === "p1" ? "p1" : "p2"
                          }
                        : slot
                    ),
                    rewind: [...this.state.rewind, this.state]
                  });

                  if (this.state.currentPlayer === "p1") {
                    // e.target.className += " cross";
                    this.setState({ currentPlayer: "p2" });
                  } else {
                    // e.target.className += " circle";
                    this.setState({ currentPlayer: "p1" });
                  }

                  // this.setState( { memorySlots : [...this.state.slots, this.state })
                  // console.log(this.state.memorySlots)
                  this.setState({ currentTurn: this.state.currentTurn + 1 });
                }}

                //CLICK EVENT END
              />
            </div>
          ))}
        </div>

        <h2>
          {this.state.winConditionMet
            ? "Victory!"
            : this.state.currentPlayer + " Turn"}
        </h2>

        <button
          onClick={() => {
            this.setState({
              slots: [
                { tag: "UL", status: "neutral", player: null },
                { tag: "UM", status: "neutral", player: null },
                { tag: "UR", status: "neutral", player: null },
                { tag: "ML", status: "neutral", player: null },
                { tag: "MC", status: "neutral", player: null },
                { tag: "MR", status: "neutral", player: null },
                { tag: "LL", status: "neutral", player: null },
                { tag: "LM", status: "neutral", player: null },
                { tag: "LR", status: "neutral", player: null }
              ]
            });
          }}
        >
          Reset
        </button>

        <button
          onClick={() => {
            const lastState = this.state.rewind.pop();
            this.setState(lastState);
          }}
        >
          {" "}
          Rewind{" "}
        </button>
      </React.Fragment>
    );
  }
}

export default Board;
