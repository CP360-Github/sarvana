import { ActionTypes } from '../constants/ActionTypes';

export const setOpenSkills = (openskill) => ({ type: ActionTypes.OPENSKILL, payload: openskill });

export const setDataEdit = (dataEdit) => ({ type: ActionTypes.DATAEDIT, payload: dataEdit });

export const setSelectedAvailability = (selectedAvailability) => ({
  type: ActionTypes.AVAILABILITY,
  payload: selectedAvailability
});

export const setIconsData = (iconsData) => ({ type: ActionTypes.ICONSDATA, payload: iconsData });

export const setIcons = (icons) => ({ type: ActionTypes.ICONS, payload: icons });

export const setShowData = (showData) => ({ type: ActionTypes.SHOWDATA, payload: showData });

export const IconSelected = (selectedIcon) => ({ type: ActionTypes.ICONSELECTED, payload: selectedIcon });

export const SelectedIconDescription = (selectedIconDescription) => ({
  type: ActionTypes.SelectedIconDescription,
  payload: selectedIconDescription
});

export const saveClickedAvailability = (saveClicked) => ({ type: ActionTypes.SAVECLICKED, payload: saveClicked });
