import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducers';
import { matchListReducer, matchDetailsReducer, matchTopRatedReducer } from './reducers/matchReducers';
import { reviewCreateReducer, reviewListReducer, reviewDetailsReducer, reviewUpdateReducer, reviewDeleteReducer } from './reducers/reviewReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  matchList: matchListReducer,
  matchDetails: matchDetailsReducer,
  matchTopRated: matchTopRatedReducer,
  reviewCreate: reviewCreateReducer,
  reviewList: reviewListReducer,
  reviewDetails: reviewDetailsReducer,
  reviewUpdate: reviewUpdateReducer,
  reviewDelete: reviewDeleteReducer,
});

// Charger l'utilisateur depuis le localStorage
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;