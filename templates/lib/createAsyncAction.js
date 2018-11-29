const createAsyncAction = (type, fn) => (...args) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: `${type}_STARTED`,
    payload: args,
  });

  let result;

  try {
    result = await fn(...args, dispatch, getState);
  } catch (error) {
    dispatch({
      type: `${type}_FAILED`,
      error: true,
      payload: error,
    });

    throw error;
  }

  dispatch({
    type: `${type}_ENDED`,
    payload: result,
  });

  return result;
};

export default createAsyncAction;
