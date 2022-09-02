import { ActionTypeContact } from '../constants/ActionTypeContact';

export const setVolatile = (data) => ({ type: ActionTypeContact.SHOW_DETAILS, payload: data });

export const SetTimezone = (timezone) => ({ type: ActionTypeContact.SHOW_TIMEZONE, payload: timezone });

export const RecordDeleted = (deleted) => ({ type: ActionTypeContact.SHOW_DELETED, payload: deleted });

export const EditData = (edited) => ({ type: ActionTypeContact.SHOW_EDITED, payload: edited });

export const DataEdit = (dataedit) => ({ type: ActionTypeContact.SHOW_DATAEDIT, payload: dataedit });

export const setSelectedEg = (selectedEg) => ({ type: ActionTypeContact.SHOW_SELECTEDEG, payload: selectedEg });

export const setCopiedegg = (copiedegg) => ({ type: ActionTypeContact.SHOW_COPIEDEGG, payload: copiedegg });

export const setCopiedCt = (copiedCt) => ({ type: ActionTypeContact.SHOW_COPIEDCT, payload: copiedCt });

export const setAcdValue = (AcdValue) => ({ type: ActionTypeContact.SHOW_ACDVALUE, payload: AcdValue });

export const setCopyFrom = (copyFrom) => ({ type: ActionTypeContact.SHOW_COPYFROM, payload: copyFrom });

export const setOkValue = (okValue) => ({ type: ActionTypeContact.SHOW_OKVALUE, payload: okValue });

export const setSelectedIndex = (selectedIndex) => ({ type: ActionTypeContact.SHOWINDEX, payload: selectedIndex });

export const setDataId = (dataId) => ({ type: ActionTypeContact.SHOWID, payload: dataId });

export const setSavee = (savee) => ({ type: ActionTypeContact.SAVEE, payload: savee });

export const setRightChecked = (rightChecked) => ({ type: ActionTypeContact.RIGHT, payload: rightChecked });

export const setFourChecked = (fourChecked) => ({ type: ActionTypeContact.FOUR, payload: fourChecked });

export const setStoreSkills = (storeSkills) => ({ type: ActionTypeContact.SKILLS, payload: storeSkills });
