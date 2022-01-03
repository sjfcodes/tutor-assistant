import React, {
  useEffect, useState, useContext,
} from 'react';
import { Icon, Level } from 'react-bulma-components';
import { string, number, oneOfType } from 'prop-types';
import { updateModel } from '../../../../utils';
import { LevelSide } from '../../../BulmaHelpers';
import { AppContext } from '../../../../context';
import ListItem from '../../../Forms/ListItem';

const ProfileListItem = ({
  _id, property, value, count,
}) => {
  const [itemToEdit, setItemToEdit] = useState('');
  const [input, setInput] = useState(value);
  const { tutorDetails, setTutorDetails } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateModel({ model: 'tutor', body: { _id, [property]: input } });
      setTutorDetails({ ...tutorDetails, [property]: input });
      setItemToEdit('');
    } catch (error) {
      console.warn(error);
      setInput(value);
    }
  };

  useEffect(() => {
    if (!property || !itemToEdit) return;
    const selectedElement = document.querySelector(`input[name=${property}]`);
    if (selectedElement) selectedElement.focus();
  }, [itemToEdit, property]);

  return (
    <form name='studentItemForm' onSubmit={handleSubmit}>
      <Level
        renderAs='li'
        className={`student-li is-mobile px-3 ${(count % 2 !== 0) && 'has-background-grey-lighter'
        }`}
      >
        <LevelSide>
          {`${property}:`}
          {
            property !== 'endTime' && (
              <Icon className='edit-icon mr-1' onClick={() => setItemToEdit(itemToEdit !== property ? property : '')}>
                <i className='fas fa-pen hover icon-small has-text-info' />
              </Icon>
            )
          }

        </LevelSide>
        <ListItem
          value={value}
          property={property}
          input={input}
          setInput={setInput}
          itemToEdit={itemToEdit}
          setItemToEdit={setItemToEdit}
          handleSubmit={handleSubmit}
        />
      </Level>
    </form>
  );
};
export default ProfileListItem;

ProfileListItem.propTypes = {
  _id: string.isRequired,
  property: string.isRequired,
  value: oneOfType([string, number]).isRequired,
  count: number.isRequired,
};
