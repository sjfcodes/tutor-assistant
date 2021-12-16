// relay error message for logging?
const reportErrorToSomeServer = () => {};

const handleError = (message) => {
  const err = new Error(message);
  reportErrorToSomeServer(err);

  return err;
};

export default handleError;
