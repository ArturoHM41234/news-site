import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function FilterButtons(props) {
  const pressedButton = {
    backgroundColor: props.isPressed ? "rgb(3 105 161)" : "rgb(14 165 233)",
  };
  return (
    <button
      style={pressedButton}
      type="button"
      className="bg-sky-500 duration-300 focus:outline-none focus:bg-sky-700 rounded-md text-sm text-white font-bold p-1.5 m-1 blue-button"
      onClick={() => {
        props.setFilter(props.id, props.value);
      }}
    >
      {props.value === "entretenimiento" && (
        <FontAwesomeIcon icon={solid("tv")} />
      )}
      {props.value === "negocios" && (
        <FontAwesomeIcon icon={solid("briefcase")} />
      )}
      {props.value === "economia" && (
        <FontAwesomeIcon icon={solid("arrow-trend-up")} />
      )}
      <p className="m-1.5 inline">{props.value}</p>
    </button>
  );
}
