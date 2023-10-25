import { ActionTypes } from "./constants";

const initialState = {
  materialId: null,
  layoutData: [],
  dimensions: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_MATERIAL:
      return {
        ...state,
        materialId: action.payload.id,
      };
    case ActionTypes.ADD_DIMENSION:
      return {
        ...state,
        dimensions: [...state.dimensions, action.payload.dimension],
      };
    case ActionTypes.REMOVE_DIMENSION:
      return {
        ...state,
        dimensions: state.dimensions.filter(
          dim => dim.id !== action.payload.id
        ),
      };
    case ActionTypes.UPDATE_DIMENSION:
      const updatedDimensions = state.dimensions.map(dim => {
        if (dim.id === action.payload.dimension.id) {
          return { ...dim, ...action.payload.dimension };
        }
        return dim;
      });

      return {
        ...state,
        dimensions: updatedDimensions,
      };
    default:
      return state;
  }
};

export default reducer;
