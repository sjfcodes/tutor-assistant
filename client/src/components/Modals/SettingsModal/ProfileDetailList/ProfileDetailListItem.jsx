import React, { useEffect, useState } from 'react';
import { Form, Icon } from 'react-bulma-components';
import {
  string, number, oneOfType, bool,
} from 'prop-types';
import { useDispatch } from 'react-redux';
import { emailIsValid, updateModel } from '../../../../utils';
import ListItem from '../../../Forms/ListItem';
import { UPDATE_TUTOR_DETAIL } from '../../../../store/tutor/actions';

const ProfileListItemDetail = ({ _id, property, value }) => {
  const [allowedToEdit, setAllowedToEdit] = useState(true);
  const [itemToEdit, setItemToEdit] = useState('');
  const [input, setInput] = useState(`${value}`);
  const [displayedEditIcon, setDisplayedEditIcon] = useState('');
  const [displayPropertyName, setDisplayProperyName] = useState(property);

  const [helpText, setHelpText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const model = 'tutor';
    const body = { _id, [property]: input };

    if (property === 'email' && !emailIsValid(input)) return setHelpText('invalid email');

    try {
      const response = await updateModel({ model, body });
      dispatch({
        type: UPDATE_TUTOR_DETAIL,
        payload: response,
      });
      setHelpText('');
      return setItemToEdit('');
    } catch ({ message }) {
      if (message.includes('E11000 duplicate key error')) return setHelpText('value is aready taken');
      return setHelpText(message);
    }
  };

  useEffect(() => {
    if (property === 'startTime') setDisplayProperyName(property.substring(0, 5));
    if (property === 'endTime') setDisplayProperyName(property.substring(0, 3));

    if (!property || !itemToEdit) return;
    const element = document.querySelector(`input[name=${property}]`)
      || document.querySelector(`textarea[name=${property}]`);
    if (!element) return;

    element.focus();
  }, [itemToEdit, property]);

  useEffect(() => {
    const doNotEditProperty = [''];
    if (doNotEditProperty.includes(property)) setAllowedToEdit(false);
  }, [property]);

  useEffect(() => {
    const toggleEdit = () => {
      if (itemToEdit !== property) {
        setItemToEdit(property);
        return;
      }
      setHelpText('');
      setItemToEdit('');
    };

    if (!allowedToEdit) return setDisplayedEditIcon(
      <Icon className='mx-1 mt-5'>
        <i className='fas fa-pen icon-small has-text-grey-lighter' />
      </Icon>,
    );
    return setDisplayedEditIcon(
      <Icon className='mx-1 mt-5' onClick={toggleEdit}>
        <i className={`icon-small has-text-primary
            ${itemToEdit === property
    ? 'far fa-times-circle'
    : 'fas fa-pen'}`}
        />
      </Icon>,
    );
  }, [allowedToEdit, itemToEdit, property]);

  return (
    <li className='pl-3 overflow-auto'>
      <form name='ProfileItemForm' onSubmit={handleSubmit}>
        <Form.Field kind='addons' className=''>
          <Form.Control fullwidth className='border-bottom-light'>
            <Form.Label
              className='mb-0 mt-3 has-text-primary'
              size='small'
            >
              {displayPropertyName}
            </Form.Label>

            <Form.Help textAlign='right' className='ml-5' color='danger'>{helpText}</Form.Help>
            <ListItem
              value={value}
              property={property}
              input={input}
              setInput={setInput}
              itemToEdit={itemToEdit}
              handleSubmit={handleSubmit}
              allowedToEdit={allowedToEdit}
            />
          </Form.Control>

          <Form.Control>
            {displayedEditIcon}
          </Form.Control>

        </Form.Field>
      </form>
    </li>
  );
};
export default ProfileListItemDetail;

ProfileListItemDetail.propTypes = {
  _id: string.isRequired,
  property: string.isRequired,
  value: oneOfType([number, string, bool]).isRequired,
};
