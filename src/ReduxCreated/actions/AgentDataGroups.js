import { ActionTypes } from '../constants/ActionTypes';

export const setDataType = (dataType) => ({ type: ActionTypes.DATATYPE, payload: dataType });

export const setDataEdit = (dataEdit) => ({ type: ActionTypes.DATAEDITT, payload: dataEdit });

export const setClicked = (clicked) => ({ type: ActionTypes.CLICKED, payload: clicked });
