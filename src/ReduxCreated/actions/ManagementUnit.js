import { ActionTypes } from '../constants/ActionTypes';

export const setTimeZoneValue = (timezonevalue) => ({ type: ActionTypes.SHOW_TIMEZONEVALUE, payload: timezonevalue });

export const setCopyFromMU = (copyFrommu) => ({ type: ActionTypes.SHOW_COPYFROMMU, payload: copyFrommu });

export const setCopiedMU = (copiedMu) => ({ type: ActionTypes.SHOW_COPIEDMU, payload: copiedMu });

export const setSave = (onSave) => ({ type: ActionTypes.ON_SAVE, payload: onSave });

export const RecordDeleted = (deleted) => ({ type: ActionTypes.SHOW_DELETEDD, payload: deleted });
