import React from 'react';
import Input from './Input';

export const InputValues = ({ selected, setSelected }) => Object.entries(selected?.values)
  .map(([key, value]) => (
    <div key={`template-val-${key}`}>
      <p>{key}</p>
      <Input
        type='text'
        name={key}
        value={value}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  ));

export default InputValues;
