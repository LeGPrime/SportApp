import axios from 'axios';

export const listMatches = (keyword = '', pageNumber = '') => async (dispatch) => {
  try {
    dispatch({ type: 'MATCH_LIST_REQUEST' });

    const { data } = await axios.get(
      `/api/matches?keyword=${keyword}&pageNumber=${pageNumber}`
    );

    dispatch({
      type: 'MATCH_LIST_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'MATCH_LIST_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMatchDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'MATCH_DETAILS_REQUEST' });

    const { data } = await axios.get(`/api/matches/${id}`);

    dispatch({
      type: 'MATCH_DETAILS_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'MATCH_DETAILS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};