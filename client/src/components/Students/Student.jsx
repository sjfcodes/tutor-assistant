import { Box, Icon, Level } from 'react-bulma-components';
import { StudentItem } from './StudentItem';

export const Student = ({
  student,
  setSelectedStudentId,
  selectedStudentId,
}) => {
  const { _id, firstName, lastName } = student;

  const toggleViewStudent = () => {
    selectedStudentId === _id
      ? setSelectedStudentId()
      : setSelectedStudentId(_id);
  };

  return (
    <Box
      className={`border rounded pl-2 py-1 pr-1 ${
        selectedStudentId !== _id && `hover-large-item`
      }`}
    >
      <Level
        renderAs="div"
        breakpoint="mobile"
        className={`${selectedStudentId === _id && 'border-bottom pb-3 mb-1'}`}
        onClick={toggleViewStudent}
      >
        <Level.Side align="left">
          <Level.Item>{`${firstName} ${lastName}`}</Level.Item>
        </Level.Side>

        <Level.Side align="left">
          <Level.Item>
            <Icon>
              <i
                className={`fas fa-chevron-${
                  selectedStudentId === _id ? 'up' : 'down'
                }`}
              />
            </Icon>
          </Level.Item>
        </Level.Side>
      </Level>

      {selectedStudentId === _id && (
        <ul>
          {Object.entries(student).map(([property, value], idx) => {
            const doNotDisplay = ['_id', '__v'];
            if (doNotDisplay.indexOf(property) !== -1) return null;
            return (
              <StudentItem
                key={idx}
                value={value}
                _id={_id}
                idx={idx}
                property={property}
              />
            );
          })}
        </ul>
      )}
    </Box>
  );
};
