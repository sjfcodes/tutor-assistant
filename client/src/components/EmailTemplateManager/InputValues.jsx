import React from 'react';
import { Columns } from 'react-bulma-components';
import InputTextarea from './InputTextarea';

export const InputValues = ({ selected, setSelected }) => Object.entries(selected?.values)
  .map(([key, value]) => (
    <Columns.Column className='is-mobile my-0 py-0' key={`template-val-${key}`}>
      <p className='is-size-7 has-text-weight-bold'>{key}</p>
      <InputTextarea
        type='text'
        name={key}
        className='template-input border'
        value={value}
        selected={selected}
        setSelected={setSelected}
      />
    </Columns.Column>
  ));

export default InputValues;
