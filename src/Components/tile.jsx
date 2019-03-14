import React, { Component } from "react";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const tileStyle = css`
  .cross {
    background-color: red;
  }
  .circle {
    background-color: black;
  }
`;

const Tile = () => {
  return (
    <div
      css={tileStyle}
      className={this.props.player === "p1" ? "cross" : "circle"}
    />
  );
};

export default Tile;
