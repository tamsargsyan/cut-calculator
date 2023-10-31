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
  type: "UPDATE_DIMENSION",
  payload: { id, key, value },
});
