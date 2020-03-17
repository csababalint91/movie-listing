import React from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

function RangeInput(props) {
  return (
    <label className="range-input-wrapper">
      <InputRange
        className="pointer"
        type="range"
        minValue={0}
        maxValue={10}
        defaultValue={3}
        step={0.5}
        value={props.value}
        onChange={props.onDrag} 
      />
      <span>Sort by rating</span>
    </label>   
  );
}

export default RangeInput;



