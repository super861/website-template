const initialState = {
  bannerImages: [
    "images/banner/firstslide.png",
    "images/banner/secondslide.png",
    "images/banner/thirdslide.png"
  ]
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default rootReducer;
