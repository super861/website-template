import * as types from '../actions/actionTypes';

const initialState = {
  bannerImages: [
    "images/banner/firstslide.png",
    "images/banner/secondslide.png",
    "images/banner/thirdslide.png"
  ]
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
    default:
      return state;
  }
};

export default rootReducer;
