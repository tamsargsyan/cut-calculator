import { ActionTypes } from "./constants";

export const getLayoutData = (layoutData) => ({
  type: ActionTypes.LAYOUT_DATA,
  payload: layoutData,
});
