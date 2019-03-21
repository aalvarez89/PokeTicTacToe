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

  grid-gap: 7px;

  justify-items: center;
  align-items: center;

  margin: 0 auto;

  background-color: #5d5d5d;

  .frame {
    height: calc(100vh / 4);
    width: 100%;
  }
  .tile {
    background-color: white;
    height: 100%;
    width: 100%;
  }

  .locked {
    pointer-events: none;
  }

  .cross {
    background-image: url(${cross});
    background-repeat: no-repeat;
    background-size: 75%;
    background-position: center;
    /* pointer-events: none; */
  }
  .circle {
    background-image: url(${circle});
    background-repeat: no-repeat;
    background-size: 75%;
    background-position: center;
    /* pointer-events: none; */
  }

  @media (min-width: 600px) {
    .cross,
    .circle {
      background-size: 40%;
    }
  }
`;

const resetButton = css`
  background-color: #5d5d5d;
  color: white;
  border-radius: 5px;
  width: 100px;
  height: 30px;
  user-select: none;
  outline: none;
  border: none;

  &:hover {
    background-color: #444;
  }
`;

const rewindButton = css`
  background-color: #ffd700;
  color: black;
  border-radius: 5px;
  width: 100px;
  height: 30px;
  user-select: none;
  outline: none;
  border: none;

  margin-left: 20px;

  &:hover {
    background-color: #e6be8a;
  }
`;

class Board extends Component {
  state = {
    currentTurn: 1,
    currentPlayer: Math.random() >= 0.5 ? "p1" : "p2",
    rewind: [],
    winConditionMet: false,
    slots: [
      { tag: "UL", status: false, player: null },
      { tag: "UM", status: false, player: null },
      { tag: "UR", status: false, player: null },
      { tag: "ML", status: false, player: null },
      { tag: "MC", status: false, player: null },
      { tag: "MR", status: false, player: null },
      { tag: "LL", status: false, player: null },
      { tag: "LM", status: false, player: null },
      { tag: "LR", status: false, player: null }
    ]
  };

  //Tic-Tac-Toe Game Logic
  static getDerivedStateFromProps(prevProps, prevState) {
    console.log(
      prevState.slots
        .filter(e => e.status === false)
        .map(e => {
          return {
            tag: e.tag,
            status: !e.status,
            player: e.player
          };
        })
    );
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
      winConfirm = "win";
      console.log("win!");
    } else if (
      (win[0].player === "p1" &&
        win[3].player === "p1" &&
        win[6].player === "p1") ||
      (win[0].player === "p2" &&
        win[3].player === "p2" &&
        win[6].player === "p2")
    ) {
      winConfirm = "win";
      console.log("win!");
    } else if (
      (win[0].player === "p1" &&
        win[4].player === "p1" &&
        win[8].player === "p1") ||
      (win[0].player === "p2" &&
        win[4].player === "p2" &&
        win[8].player === "p2")
    ) {
      winConfirm = "win";
      console.log("win!");
    } else if (
      (win[3].player === "p1" &&
        win[4].player === "p1" &&
        win[5].player === "p1") ||
      (win[3].player === "p2" &&
        win[4].player === "p2" &&
        win[5].player === "p2")
    ) {
      winConfirm = "win";
      console.log("win!");
    } else if (
      (win[1].player === "p1" &&
        win[4].player === "p1" &&
        win[7].player === "p1") ||
      (win[1].player === "p2" &&
        win[4].player === "p2" &&
        win[7].player === "p2")
    ) {
      winConfirm = "win";
      console.log("win!");
    } else if (
      (win[2].player === "p1" &&
        win[4].player === "p1" &&
        win[6].player === "p1") ||
      (win[2].player === "p2" &&
        win[4].player === "p2" &&
        win[6].player === "p2")
    ) {
      winConfirm = "win";
      console.log("win!");
    } else if (
      (win[6].player === "p1" &&
        win[7].player === "p1" &&
        win[8].player === "p1") ||
      (win[6].player === "p2" &&
        win[7].player === "p2" &&
        win[8].player === "p2")
    ) {
      winConfirm = "win";
      console.log("win!");
    } else if (
      (win[2].player === "p1" &&
        win[5].player === "p1" &&
        win[8].player === "p1") ||
      (win[2].player === "p2" &&
        win[5].player === "p2" &&
        win[8].player === "p2")
    ) {
      winConfirm = "win";
      console.log("win!");
    } else {
      if (
        win[0].status === true &&
        win[1].status === true &&
        win[2].status === true &&
        win[3].status === true &&
        win[4].status === true &&
        win[5].status === true &&
        win[6].status === true &&
        win[7].status === true &&
        win[8].status === true
      ) {
        console.log("game tied!");
        return { winConditionMet: "tie" };
      }
    }
    if (!winConfirm) {
      return {
        winConditionMet: winConfirm
      };
    } else {
      return {
        winConditionMet: winConfirm,
        slots: prevState.slots
          // .filter(e => e.status === false)
          .map(e => {
            if (!e.status) {
              return { tag: e.tag, status: true, player: e.player };
            } else {
              return {
                tag: e.tag,
                status: e.status,
                player: e.player
              };
            }
          })
      };
    }
  }

  handleReset = () => {
    this.setState({
      currentPlayer: Math.random() >= 0.5 ? "p1" : "p2",
      slots: this.state.slots.map(r => {
        return { tag: r.tag, status: false, player: null };
      })
    });
  };

  handleRewind = () => {
    const lastState = this.state.rewind.pop();
    this.setState(lastState);
  };

  render() {
    return (
      <React.Fragment>
        <div css={boardStyle}>
          {this.state.slots.map((e, i) => (
            <div className="frame" key={i}>
              <Tile
                id={e.tag}
                key={i}
                player={e.player}
                status={e.status}
                //Turn Change Event
                handleClick={e => {
                  let coordinate = e.target.id;

                  this.setState({
                    slots: this.state.slots.map(slot =>
                      slot.tag === coordinate
                        ? {
                            tag: slot.tag,
                            status: true,
                            player:
                              this.state.currentPlayer === "p1" ? "p1" : "p2"
                          }
                        : slot
                    ),
                    rewind: [...this.state.rewind, this.state]
                  });

                  if (this.state.currentPlayer === "p1") {
                    this.setState({ currentPlayer: "p2" });
                  } else {
                    this.setState({ currentPlayer: "p1" });
                  }

                  this.setState({ currentTurn: this.state.currentTurn + 1 });
                }}
              />
            </div>
          ))}
        </div>

        <h2>
          {!this.state.winConditionMet
            ? this.state.currentPlayer + " Turn"
            : this.state.winConditionMet === "win"
            ? `${
                this.state.currentPlayer === "p1" ? "Player 2" : "Player 1"
              } Victory!`
            : "Game tied!"}
        </h2>

        <button css={resetButton} onClick={this.handleReset}>
          {!this.state.winConditionMet ? "Reset" : "New Game"}
        </button>

        <button css={rewindButton} onClick={this.handleRewind}>
          Rewind
        </button>
      </React.Fragment>
    );
  }
}

export default Board;
