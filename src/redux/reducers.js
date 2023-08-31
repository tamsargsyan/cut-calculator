import { ActionTypes } from "./constants";

const initialState = {
  layoutData: [{
    length: "",
    width: "",
    quantity: ""
  }],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LAYOUT_DATA:
      const layoutData = action.payload;
      return {
        ...state,
        layoutData: [...state.layoutData, layoutData],
      };
    default:
      return state;
  }
};

export default reducer;
