import { string } from 'prop-types';
import React from 'react';
import { Button } from 'react-bulma-components';
import { useSelector } from 'react-redux';
import { deleteModel } from '../../../../utils';

const DeleteAccessToken = ({ courseId }) => {
//   const [deleteState, setDeleteState] = useState('');
//   const [loading, setLoading] = useState(false);
  const { allCourses } = useSelector((state) => state.courses);
  const { calendly: { accessToken } } = allCourses[courseId];

  const handleDeleteAccessToken = async () => {
    await deleteModel(
      {
        _id: accessToken,
        model: 'calendly/token',
        body: { courseId },
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

DeleteAccessToken.propTypes = {
  courseId: string.isRequired,
};

export default DeleteAccessToken;
