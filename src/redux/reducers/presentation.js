import { CLICK_SLIDE, RESET_STATE } from "../actions/types";

const initialState = {
  previewIndex: 1,
  mainSlide: 1,
  slideStyle: 1,
};

// eslint-disable-next-line default-param-last
const presentationReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CLICK_SLIDE:
      return {
        // presentationSlideList: [...state.presentationSlideList, payload],
        ...initialState,
        slideStyle: payload,
      };
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
};

export default presentationReducer;
