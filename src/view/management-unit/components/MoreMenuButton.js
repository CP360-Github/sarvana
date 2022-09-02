import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/styles';
import { Menu, Divider, MenuItem, Typography, alpha, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack5';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import { KeyboardArrowDown } from '@material-ui/icons';
import MIconButton from '../../../components/@material-extend/MIconButton';
import { RecordDeleted } from '../../../ReduxCreated/actions/ManagementUnit';
import AlertDialog from '../../../pages/components-overview/material-ui/dialog/AlertDialog';
import { DisableManagement } from '../../../api/ManagementUnitAPI';

MoreMenuButton.propTypes = {
  anchorEl: PropTypes.object,
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  dataRow: PropTypes.object,
  handleClick: PropTypes.func
};
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0'
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
      }
    }
  }
}));

export function MoreMenuButton({ anchorEl, handleClose, open, dataRow, handleClick }) {
  const navigate = useNavigate();
  const handleHistory = () => {
    navigate(`/admin/management-unit-history/${dataRow.id}`);
  };

  const handleAgentData = () => {
    navigate(`/admin/management-unit-agent-data/${dataRow.id}`);
  };
  const [openn, setOpenn] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleDelete = useCallback(
    async (disabilityToken) => {
      await DisableManagement(dataRow.id, !disabilityToken)
        .then(dispatch(RecordDeleted(!disabilityToken)))
        .then(
          enqueueSnackbar(`successfully ${disabilityToken === false ? `Disabled` : `Restored`} `, {
            variant: 'success',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          })
        );
      handleClose();
      setTimeout(dispatch(RecordDeleted(disabilityToken)), 1000);
    },
    [handleClose, dataRow?.id, dispatch, enqueueSnackbar, closeSnackbar]
  );

  useEffect(() => {
    if (agreed === true) {
      handleDelete(dataRow.is_disabled);
      setAgreed(false);
      setOpenn(false);
    } else {
      setOpenn(false);
    }
  }, [agreed, dataRow.is_disabled, handleDelete]);

  const handleOpen = () => {
    setOpenn(true);
  };

  return (
    <>
      {dataRow.is_disabled === false ? (
        <Button
          id="demo-customized-button"
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="outlined"
          size="small"
          disableElevation
          onClick={(event) => handleClick(event)}
          endIcon={<KeyboardArrowDown />}
        >
          More
        </Button>
      ) : (
        <Button variant="outlined" color="primary" onClick={handleOpen}>
          Restore
        </Button>
      )}

      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleAgentData} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="body2" sx={{ ml: 2 }}>
            Agent Data
          </Typography>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleHistory} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="body2">History</Typography>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleOpen} sx={{ color: 'error.main', display: 'flex', justifyContent: 'center' }}>
          <Typography variant="body2" sx={{ ml: 2 }}>
            Disable
          </Typography>
        </MenuItem>
      </StyledMenu>
      <AlertDialog
        setAgreed={setAgreed}
        setOpenn={setOpenn}
        openn={openn}
        Content={`Are you sure you want to ${dataRow.is_disabled === false ? `disable` : `restore`} ?`}
        description=""
      />
    </>
  );
}
