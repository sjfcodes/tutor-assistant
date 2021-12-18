import React from 'react';
import { Columns } from 'react-bulma-components';
import InputTextarea from './InputTextarea';

export const InputValues = ({ selected, setSelected }) => Object.entries(selected?.values)
  .map(([key, value]) => (
    <Columns.Column className='is-narrow my-0 py-0' key={`template-val-${key}`}>
      <p>{key}</p>
      <InputTextarea
        type='text'
        name={key}
        value={value}
        selected={selected}
        setSelected={setSelected}
      />
    </Columns.Column>
  ));

export default InputValues;
