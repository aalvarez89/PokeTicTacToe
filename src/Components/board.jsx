import React, { Component } from "react";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Tile from "../Components/tile.jsx";
import circle from "../circle.svg";
import cross from "../cross.svg";

const boardStyle = css`
  /* .board {
  } */

  width: 80%;
  /* position: relative;
  padding-top: 100%; */

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

  .blank {
    background-color: yellow;
  }

  .active {
    pointer-events: none;
  }

  .post-game {
    pointer-events: none;
  }

  .cross {
    background-image: url(${cross});
    background-repeat: no-repeat;
    background-size: 70%;
    background-position: center;
    pointer-events: none;
  }
  .circle {
    /* background-color: black; */
    background-image: url(${circle});
    background-repeat: no-repeat;
    background-size: 70%;
    background-position: center;
    pointer-events: none;
  }
  .neutral {
    background-color: coral;
  }
`;

class Board extends Component {
  state = {
    currentTurn: 1,
    currentPlayer: Math.random() >= 0.5 ? "p1" : "p2",
    memorySlots: [],
    slots: [
      { tag: "UL", status: "neutral" },
      { tag: "UM", status: "neutral" },
      { tag: "UR", status: "neutral" },
      { tag: "ML", status: "neutral" },
      { tag: "MC", status: "neutral" },
      { tag: "MR", status: "neutral" },
      { tag: "LL", status: "neutral" },
      { tag: "LM", status: "neutral" },
      { tag: "LR", status: "neutral" }
    ]
  };

  //   componentDidMount() {}
  componentDidUpdate() {
    console.log(this.state.slots.map(e => e.status));

    // if (
    //   this.state.slots[0].status === this.state.slots[1].status &&
    //   this.state.slots[0].status === this.state.slots[2].status
    // ) {
    //   console.log("win!");
    // }
  }
  // handleSwitchTurn = e => {
  //   console.log("hello");
  //   this.state.currentPlayer === "p1"
  //     ? (e.target.className = "boardtiles bluebg")
  //     : (e.target.className = "boardtiles redbg");

  //   this.state.currentPlayer === "p1"
  //     ? this.setState({ currentPlayer: "p2" })
  //     : this.setState({ currentPlayer: "p1" });
  //   // console.log(e.target.className);
  // };

  // handleClick(tag, player) {
  //   this.setState(prevState => ({
  //     ...prevState,
  //     slots: prevState.slots.map(slot =>
  //       slot.tag === tag ? (slot.status = "cross") : slot
  //     )
  //   }));
  // }
  // handleWin = () => {
  //   console.log(this.state.slots[0].status);
  //   // === this.state.slots[1].status);
  // };

  handleReset = () => {
    this.setState({
      slots: this.state.slots.map(e => {
        return { tag: e.tag, status: "neutral" };
      })
    });
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
                status={e.status}
                //CLICK EVENT
                handleClick={e => {
                  let coordinate = e.target.id;
                  // e.target.className += " boop";
                  // console.log(e.target.className);
                  // console.log(e.target.classList.contains("blank"));
                  // .contains("neutral"));

                  this.setState({
                    slots: this.state.slots.map(
                      slot => {
                        if (
                          slot.tag === coordinate &&
                          slot.status === "neutral"
                        ) {
                          if (this.state.currentPlayer === "p1") {
                            return { tag: slot.tag, status: "p1" };
                          } else {
                            return { tag: slot.tag, status: "p2" };
                          }
                        } else {
                          return slot;
                        }
                      }
                      // slot.tag === coordinate
                      //   ? { tag: slot.tag, status: "active" }
                      //   : slot
                    )
                  });

                  if (this.state.currentPlayer === "p1") {
                    e.target.className += " cross";
                    this.setState({ currentPlayer: "p2" });
                  } else {
                    e.target.className += " circle";
                    this.setState({ currentPlayer: "p1" });
                  }

                  this.setState({ currentTurn: this.state.currentTurn + 1 });
                  // this.handleWin();
                  // console.log(this.state);
                  // if (
                  //   this.state.currentPlayer === "p1" &&
                  //   this.state.slots[i].status === "active"
                  // ) {
                  //   e.target.className += " cross";
                  //   console.log(e.target.className);
                  // } else {
                  //   e.target.className += " circle";
                  //   console.log(e.target.className);
                  // }

                  // this.setState
                }}

                //CLICK EVENT END
              />
            </div>
          ))}
        </div>

        <h1>{this.state.currentPlayer + " Turn"}</h1>
        <button onClick={null}> Reset </button>
        {/* <button onClick={this.handleRewind}> Rewind </button> */}
      </React.Fragment>
    );
  }
}

export default Board;
