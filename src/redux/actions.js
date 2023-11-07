import { ActionTypes } from "./constants";

export const getMaterial = id => ({
  type: ActionTypes.GET_MATERIAL,
  payload: {
    id,
  },
});
export const addDimension = dimension => ({
  type: ActionTypes.ADD_DIMENSION,
  payload: {
    dimension,
  },
});
export const removeDimension = idx => ({
  type: ActionTypes.REMOVE_DIMENSION,
  payload: {
    idx,
  },
});
export const updateDimension = (id, key, value) => ({
  type: ActionTypes.UPDATE_DIMENSION,
  payload: { id, key, value },
});
export const rotateDimension = (width, height) => ({
  type: ActionTypes.ROTATE_DIMENSION,
  payload: {
    width,
    height,
  },
});
