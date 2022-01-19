// relay error message for logging?
const reportErrorToSomeServer = () => {};

const handleError = (error) => {
  console.warn(error);
  const err = new Error(error);
  reportErrorToSomeServer(err);

  return err;
};

export default handleError;
