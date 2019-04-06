import React, { Component } from "react";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Tile from "../Components/tile.jsx";
// import circle from "../circle.svg";
// import cross from "../cross.svg";

// import circle from "../gr_oh.svg";
// import cross from "../gr_ex.svg";

import grooky_o from "../gr_oh.svg";
import grooky_x from "../gr_ex.svg";

import sobble_o from "../so_oh.svg";
import sobble_x from "../so_ex.svg";

import sbunny_o from "../bu_oh.svg";
import sbunny_x from "../bu_ex.svg";

const poke = [
  { ex: grooky_x, oh: grooky_o, gap: "#68814F" },
  { ex: sobble_x, oh: sobble_o, gap: "#2B6599" },
  { ex: sbunny_x, oh: sbunny_o, gap: "#D57A51" }
];
const rand_num = Math.floor(Math.random() * Math.floor(3));

//CSS Styles (emotion.js)
const boardStyle = css`
  width: 80%;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);

  grid-gap: 3px;

  justify-items: center;
  align-items: center;

  margin: 0 auto;

  /* background-color: #5d5d5d; */
  background-color: ${poke[rand_num].gap};

  .frame {
    height: calc(100vh / 4);
    width: 100%;
  }
  .tile {
    background-color: white;
    /* ${poke[rand_num].bg}; */
    height: 100%;
    width: 100%;
  }

  .locked {
    pointer-events: none;
  }

  .cross {
    background-image: url(${poke[rand_num].ex});
    background-repeat: no-repeat;
    background-size: 75%;
    background-position: center;
    /* pointer-events: none; */
  }
  .circle {
    background-image: url(${poke[rand_num].oh});
    background-repeat: no-repeat;
    background-size: 75%;
    background-position: center;
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
  box-shadow: 0 1px 8px 0 #888;
  color: white;
  border-radius: 5px;
  width: 100px;
  height: 30px;
  user-select: none;
  outline: none;
  border: none;
  transition: transform 0.1s, background-color 0.1s, box-shadow 0.1s;

  &:hover {
    box-shadow: 0 2px 16px 1px #888;

    transform: translate(0, -3px);
  }
  &:active {
    background-color: #444;
  }
`;

const rewindButton = css`
  background-color: #ffd700;
  box-shadow: 0 1px 8px 0 #888;
  color: black;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  user-select: none;
  outline: none;
  border: none;

  margin-left: 20px;

  transition: transform 0.1s, background-color 0.1s, box-shadow 0.1s;

  &:hover {
    /* background-color: #e6be8a; */
    box-shadow: 0 2px 16px 1px #888;

    transform: translate(0, -3px);
  }
  &:active {
    background-color: #e6be8a;
  }

  svg {
    width: 10px;
    height: 10px;
    fill: white;
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
        slots: prevState.slots.map(e => {
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
          {/* Rewind */}
          <svg height="512pt" viewBox="0 -26 512 512" width="512pt">
            <path d="M444.633 67.367C401.19 23.926 343.433 0 282 0 194.91 0 115.258 49.477 76.387 126.852H21.152a21.076 21.076 0 0 0-19.53 13.05 21.085 21.085 0 0 0 4.581 23.043l70.567 70.567a18.978 18.978 0 0 0 13.507 5.593c5.102 0 9.895-1.984 13.5-5.59l70.57-70.57a21.085 21.085 0 0 0 4.583-23.043 21.072 21.072 0 0 0-19.532-13.05h-48.777C146.511 67.344 211.445 30 282 30c110.281 0 200 89.719 200 200s-89.719 200-200 200c-53.422 0-103.645-20.8-141.422-58.574-5.855-5.86-15.355-5.86-21.21 0-5.86 5.855-5.86 15.355 0 21.21C162.804 436.079 220.562 460 282 460s119.191-23.922 162.637-67.363C488.078 349.195 512 291.437 512 230c0-61.434-23.922-119.191-67.367-162.633zM90.277 204.59l-47.742-47.738h95.48zm0 0" />
          </svg>
        </button>
      </React.Fragment>
    );
  }
}

export default Board;
