import React from "react";

function RatingInput(props) {
  console.log({ props });
  return (
    <label className="rating-input-wrapper">
      <input
        className="pointer"
        type="range"
        min="0"
        max="10"
        step="0.5"
        value={props.ratingValue}
        onChange={e => {
          props.handleRating(e);
        }}
      />
      <span>Sort by rating</span>
      <span>{props.ratingValue}</span>
    </label>
  );
}

export default RatingInput;
