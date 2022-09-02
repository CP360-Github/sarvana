import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack5';
import closeFill from '@iconify/icons-eva/close-fill';
import PropTypes from 'prop-types';
import AlertDialog from '../../../pages/components-overview/material-ui/dialog/AlertDialog';
import { DisableSkills } from '../../../api/Skills';
import { DisableSkillsAction } from '../../../ReduxCreated/actions/Skills.action';
import { MIconButton } from '../../../components/@material-extend';

const EnableDisableButton = ({ skillsId, buttonType }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [openPopup, setOpenPopup] = useState();
  const handleRestore = async (id, enableDisableToken) => {
    try {
      const response = await DisableSkills(id, enableDisableToken);
      if (response.statusText === 'OK') {
        dispatch(DisableSkillsAction({ id, is_disabled: response.data.is_disabled }));
        enqueueSnackbar(`Skill Successfully ${buttonType === 'restore' ? `Restore!` : `Disable!`}`, {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      }
      setOpenPopup(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={() => setOpenPopup(true)}>
        {buttonType === 'restore' ? `Restore` : `Disable`}
      </Button>
      <AlertDialog
        setAgreed={() => handleRestore(skillsId, buttonType !== 'restore')}
        setOpenn={setOpenPopup}
        openn={openPopup}
        Content={`Are you sure you want to ${buttonType === 'restore' ? `Restore` : `Disable`}  Skills?`}
        description=""
      />
    </div>
  );
};

export default EnableDisableButton;

EnableDisableButton.propTypes = {
  skillsId: PropTypes.number,
  buttonType: PropTypes.string
};
