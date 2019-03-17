import React, { Component } from "react";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

// const tileStyle = css`
//   background-color: white;
//   height: 100%;
//   width: 100%;
// `;

const Tile = props => {
  return (
    <div
      // css={tileStyle}
      className="itle"
      // className={props.status ? "" : props.player === "p1" ? "cross" : "circle"}
      // className= {props.player === 'p1' ? 'cross' : 'circle'}
      id={props.id}
      onClick={props.handleClick}
    />
  );
};

export default Tile;
