import * as types from '../actions/actionTypes';

const initialState = {
  bannerImages: [
    "images/banner/firstslide.png",
    "images/banner/secondslide.png",
    "images/banner/thirdslide.png"
  ],
  logged: false
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_DATA_SUCCES:
      return {
        ...state,
        account: {
          ...state.account,
          ...action.data
        }
      };
    case types.LOGIN_SUCCES:
    console.log('succes')
      return {
        ...state,
        ...action.status
      }
    default:
      return state;
  }
};

export default rootReducer;
