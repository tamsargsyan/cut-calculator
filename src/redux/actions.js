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
export const removeDimension = id => ({
  type: ActionTypes.REMOVE_DIMENSION,
  payload: {
    id,
  },
});
export const updateDimension = (id, key, value) => ({
  type: ActionTypes.UPDATE_DIMENSION,
  payload: { id, key, value },
});
export const rotateDimension = (width, height, newId) => ({
  type: ActionTypes.ROTATE_DIMENSION,
  payload: {
    width,
    height,
    newId,
  },
});
