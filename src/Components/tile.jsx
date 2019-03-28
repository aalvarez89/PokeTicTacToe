import React, { Component } from "react";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const Tile = props => {
  return (
    <div
      className={`tile ${
        props.player != null ? (props.player === "p1" ? "cross" : "circle") : ""
      }${props.status === true ? " locked" : ""}`}
      id={props.id}
      onClick={props.handleClick}
    />
  );
};

export default Tile;
