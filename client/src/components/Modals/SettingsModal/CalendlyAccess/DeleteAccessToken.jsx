import React, { useContext } from 'react';
import { Button } from 'react-bulma-components';
import { AppContext } from '../../../../context/AppProvider';
import { deleteModel } from '../../../../utils';

const DeleteAccessToken = () => {
//   const [deleteState, setDeleteState] = useState('');
//   const [loading, setLoading] = useState(false);
  const { tutorDetails } = useContext(AppContext);
  const { accessTokens: { calendly } } = tutorDetails;

  const handleDeleteAccessToken = async () => {
    try {
      await deleteModel('access-token', { tokenId: calendly });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      fullwidth
      color='danger'
      onClick={handleDeleteAccessToken}
    >
      delete calendly access
    </Button>
  );
};
export default DeleteAccessToken;
