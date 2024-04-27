import React from "react";

export default function Box(props) {
  const style = {
    color:
      props.value === "X"
        ? "rgba(221, 0, 255, 0.518)"
        : "rgba(0, 170, 255, 0.518)",
  };
  return (
    <button className="box" style={style} onClick={props.toggle}>
      {props.value}
    </button>
  );
}
