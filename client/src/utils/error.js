export const getError = (error) => {
  if (!error.response) {
    error.response = {
      data: {
        success: 'false',
        message: 'Server Error',
      },
    };
  }

  return error.response.data;
};
