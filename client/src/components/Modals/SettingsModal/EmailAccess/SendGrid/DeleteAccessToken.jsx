import React, { useContext } from 'react';
import { Button } from 'react-bulma-components';
import { AppContext } from '../../../../../context';
import { deleteModel } from '../../../../../utils';

const DeleteAccessToken = () => {
//   const [deleteState, setDeleteState] = useState('');
//   const [loading, setLoading] = useState(false);
  const { tutorDetails: { sendGrid: { accessToken } } } = useContext(AppContext);

  const handleDeleteAccessToken = async () => {
    await deleteModel(
      {
        _id: accessToken,
        model: 'sendgrid/token',
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
      delete connection
    </Button>
  );
};
export default DeleteAccessToken;
