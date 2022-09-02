import { ActionTypes } from '../constants/ActionTypes';

export const setVolatile = (data) => ({ type: ActionTypes.SHOW_DETAILS, payload: data });

export const SetTimezone = (timezone) => ({ type: ActionTypes.SHOW_TIMEZONE, payload: timezone });

export const RecordDeleted = (deleted) => ({ type: ActionTypes.SHOW_DELETED, payload: deleted });

export const EditData = (edited) => ({ type: ActionTypes.SHOW_EDITED, payload: edited });

export const DataEdit = (dataedit) => ({ type: ActionTypes.SHOW_DATAEDIT, payload: dataedit });

export const setSelectedEg = (selectedEg) => ({ type: ActionTypes.SHOW_SELECTEDEG, payload: selectedEg });

export const setCopiedEg = (copiedEg) => ({ type: ActionTypes.SHOW_COPIEDEG, payload: copiedEg });

export const setCopyFrom = (copyFrom) => ({ type: ActionTypes.SHOW_COPYFROM, payload: copyFrom });

export const setOkValue = (okValue) => ({ type: ActionTypes.SHOW_OKVALUE, payload: okValue });

export const setSelectedIndex = (selectedIndex) => ({ type: ActionTypes.SHOWINDEX, payload: selectedIndex });

export const setDataID = (dataId) => ({ type: ActionTypes.SHOWID, payload: dataId });

export const setSavee = (savee) => ({ type: ActionTypes.SAVEE, payload: savee });

export const setRightChecked = (rightChecked) => ({ type: ActionTypes.RIGHT, payload: rightChecked });

export const setFourChecked = (fourChecked) => ({ type: ActionTypes.FOUR, payload: fourChecked });

export const setStoreSkills = (storeSkills) => ({ type: ActionTypes.SKILLS, payload: storeSkills });
