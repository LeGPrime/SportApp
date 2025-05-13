export const matchListReducer = (state = { matches: [] }, action) => {
    switch (action.type) {
      case 'MATCH_LIST_REQUEST':
        return { loading: true, matches: [] };
      case 'MATCH_LIST_SUCCESS':
        return { loading: false, matches: action.payload };
      case 'MATCH_LIST_FAIL':
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const matchDetailsReducer = (state = { match: {} }, action) => {
    switch (action.type) {
      case 'MATCH_DETAILS_REQUEST':
        return { loading: true, ...state };
      case 'MATCH_DETAILS_SUCCESS':
        return { loading: false, match: action.payload };
      case 'MATCH_DETAILS_FAIL':
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };