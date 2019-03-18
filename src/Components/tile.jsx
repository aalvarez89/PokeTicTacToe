import React, { Component } from "react";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const Tile = props => {
  return (
    <div
      className={
        "tile " +
        (props.status != null
          ? props.status === "p1"
            ? "cross"
            : "circle"
          : "")
      }
      id={props.id}
      onClick={props.handleClick}
    />
  );
};

export default Tile;
