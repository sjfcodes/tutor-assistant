import React from 'react';
import { Button } from 'react-bulma-components';
import { useSelector } from 'react-redux';
import { deleteModel } from '../../../../../utils';

const DeleteAccessToken = () => {
//   const [deleteState, setDeleteState] = useState('');
//   const [loading, setLoading] = useState(false);
  const { sendGrid: { accessToken } } = useSelector((state) => state.tutor);

  const handleDeleteAccessToken = async () => {
    await deleteModel({
      _id: accessToken,
      model: 'sendgrid/token',
    });
    window.location.reload();
  };

  return (
    <Button
      fullwidth
      color='danger'
      onClick={handleDeleteAccessToken}
    >
      delete connection
    </Button>
  );
};
export default DeleteAccessToken;
