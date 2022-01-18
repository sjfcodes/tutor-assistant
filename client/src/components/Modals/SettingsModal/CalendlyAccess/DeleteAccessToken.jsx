import React, { useContext } from 'react';
import { Button } from 'react-bulma-components';
import { CourseContext } from '../../../../context';
import { deleteModel } from '../../../../utils';

const DeleteAccessToken = () => {
//   const [deleteState, setDeleteState] = useState('');
//   const [loading, setLoading] = useState(false);
  const { allCourses, selectedCourse } = useContext(CourseContext);
  const { calendly: { accessToken } } = allCourses[selectedCourse];

  const handleDeleteAccessToken = async () => {
    await deleteModel(
      {
        _id: accessToken,
        model: 'calendly/token',
        body: { courseId: selectedCourse },
      },
    );
    window.location.reload();
  };

  return (
    <Button
      fullwidth
      color='danger'
      onClick={handleDeleteAccessToken}
    >
      delete current connection
    </Button>
  );
};
export default DeleteAccessToken;
