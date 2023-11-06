import { uniqueId } from "lodash";
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
        dimensions: [action.payload.dimension, ...state.dimensions],
      };
    case ActionTypes.REMOVE_DIMENSION:
      return {
        ...state,
        dimensions: state.dimensions.filter(
          dim => dim.id !== action.payload.id
        ),
      };
    case ActionTypes.UPDATE_DIMENSION:
      const { id, key, value } = action.payload;
      const updatedDimensions = state.dimensions.map(dim => {
        if (dim.id === id) {
          return { ...dim, [key]: value };
        }
        return dim;
      });
      return {
        ...state,
        dimensions: updatedDimensions,
      };
    case ActionTypes.ROTATE_DIMENSION:
      const { width, height, newId } = action.payload;
      const existingDimensionIndex = state.dimensions.findIndex(
        dim => +dim.width === height && +dim.height === width
      );

      if (width === height) {
        return state;
      }

      const rotatedDimension = state.dimensions.map((dim, index) => {
        if (index === existingDimensionIndex) {
          return {
            ...dim,
            quantity: String(Number(dim.quantity) + 1),
          };
        } else if (+dim.width === width && +dim.height === height) {
          return {
            ...dim,
            quantity: String(Number(dim.quantity) - 1),
          };
        } else {
          return dim;
        }
      });
      const filteredDimensions = rotatedDimension.filter(
        dim => Number(dim.quantity) > 0
      );

      if (existingDimensionIndex === -1) {
        filteredDimensions.push({
          border: {
            leftPart: "",
            rightPart: "",
            topPart: "",
            bottomPart: "",
          },
          height: String(width),
          width: String(height),
          layerColor: "",
          quantity: "1",
          id: state.dimensions.length + 1,
        });
      }

      return {
        ...state,
        dimensions: filteredDimensions,
      };
    default:
      return state;
  }
};

export default reducer;
