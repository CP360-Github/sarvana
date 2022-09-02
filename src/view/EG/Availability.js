import React, { useEffect, useCallback, useState } from 'react';
import { Typography, Box, Card, Divider, Autocomplete, TextField, Button } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack5';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import SimpleTransferList from '../../pages/components-overview/material-ui/transfer-list/SimpleTransferList';
import {
  saveClickedAvailability,
  setSelectedAvailability,
  setIconsData,
  setIcons,
  setShowData
} from '../../ReduxCreated/actions/ActivityCodeDefinition';
import { EditAvailabilityEnterprise, GetAvailabilityEnterprise } from '../../api/EnterPriseGroupAPI';
import { setFourChecked, setStoreSkills } from '../../ReduxCreated/actions/EnterPriseGroup';
import { GetSkills, GetActivityCodeDefinitionNoPage } from '../../api/ActivityCodeDefinition';
import MIconButton from '../../components/@material-extend/MIconButton';

const Availability = () => {
  const navigate = useNavigate();
  const handleEnterpriseClick = () => {
    navigate('/dashboard/account-setup/enterprise-group');
  };
  const dispatch = useDispatch();
  const selectedAvailability = useSelector((state) => state.actiontype.selectedAvailability);
  const rightChecked = useSelector((state) => state.details.rightChecked);
  const saveClicked = useSelector((state) => state.actiontype.saveClicked);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const handleAvailableSave = async () => {
    console.log(selectedAvailability, 'setDisableSave(false);');
    if (selectedAvailability === undefined || selectedAvailability === null) {
      enqueueSnackbar('Please select a value from DropDown', {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    } else {
      dispatch(saveClickedAvailability(!saveClicked));
      let IsChecked = [];
      console.log(rightChecked);
      if (selectedAvailability?.id === 4) {
        rightChecked?.map((d) => IsChecked.push(d.id));
      } else {
        IsChecked = [];
      }
      await EditAvailabilityEnterprise(id, selectedAvailability, IsChecked).then(
        enqueueSnackbar('successfully Saved', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        })
      );
    }
  };

  const getSkills = useCallback(async () => {
    await GetSkills()
      .then((response) => dispatch(setStoreSkills(response.data.results)))
      .catch((error) => console.log(error));
  }, [dispatch]);

  const { id } = useParams();
  const hIcons = [];
  const Data = [];
  const [variable, setVariable] = useState(true);

  const AvailabilityA = async () => {
    console.log(id);
    dispatch(setFourChecked(true));
    await GetActivityCodeDefinitionNoPage()
      .then((response) =>
        response.data.results.map((data) => {
          hIcons.push({ id: data.id, icon: data.icon, description: data.description });
          return Data.push(data);
        })
      )
      .catch((err) => {
        console.log(err);
      });
    dispatch(setIcons(hIcons));
    dispatch(setIconsData(Data));
    await GetAvailabilityEnterprise(id)
      .then((response) => {
        dispatch(setShowData(response.data));
        dispatch(setSelectedAvailability(availabilityMenu[response.data.activity_code_availability - 1]));
        dispatch(setFourChecked(true));
        getSkills();
      })
      .catch((err) => {
        console.log(err);
      });
    setVariable(false);
  };
  useEffect(() => {
    AvailabilityA();
    // eslint-disable-next-line
  }, []);
  return (
    <Card>
      <Box sx={{ m: 2, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
        <Typography style={{ cursor: 'pointer' }} id="modal-modal-title" variant="h5" onClick={handleEnterpriseClick}>
          Enterprise Group
        </Typography>
        <Typography id="modal-modal-title" variant="h5">
          / Availability
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ m: 2, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
        <Autocomplete
          disablePortal
          options={availabilityMenu}
          sx={{ width: 300, margin: 2 }}
          renderInput={(params) => <TextField {...params} label="Available Activity Code" />}
          onChange={(event, value) => dispatch(setSelectedAvailability(value))}
          value={selectedAvailability || null}
        />
      </Box>
      {!variable ? <SimpleTransferList /> : ''}
      <div style={{ display: 'flex', justifyContent: 'end', padding: '10px' }}>
        <Button type="submit" variant="contained" color="primary" onClick={handleAvailableSave}>
          Save
        </Button>
      </div>
    </Card>
  );
};

export default Availability;

const availabilityMenu = [
  { label: 'All Activity Code', id: 1 },
  { label: 'All Activity Code with the "open" attribute', id: 2 },
  { label: 'All Activity Code with the "Available" attribute', id: 3 },
  { label: 'Selected Activity Code', id: 4 }
];
