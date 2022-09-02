import { alpha, Button, Divider, Menu, MenuItem, styled } from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { KeyboardArrowDown } from '@material-ui/icons';
import { useNavigate } from 'react-router';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack5';
import closeFill from '@iconify/icons-eva/close-fill';
import { useDispatch, useSelector } from 'react-redux';
import AlertDialog from '../../pages/components-overview/material-ui/dialog/AlertDialog';
import { RecordDeleted, setDataId } from '../../ReduxCreated/actions/AgenDefinition';
import { DisableAgents } from '../../api/AgentDefinitionApi';
import { MIconButton } from '../../components/@material-extend';

AgentMoreButton.propTypes = {
  anchorEl: PropTypes.object,
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  dataIds: PropTypes.object,
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

function AgentMoreButton({ anchorEl, handleClose, open, dataIds, handleClick }) {
  const [openn, setOpenn] = useState(false);
  const [agreed, setAgreed] = useState(false);
  // const [dataId, setDataId] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const dataId = useSelector((state) => state.AgentDef.dataId);

  const handleDelete = useCallback(async () => {
    await DisableAgents(dataId?.id, !dataId?.is_disabled)
      .then(dispatch(RecordDeleted(!dataId?.is_disabled)))
      .then(
        enqueueSnackbar(`successfully ${dataId?.is_disabled === false ? `Disabled` : `Restored`} `, {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        })
      );
    handleClose();
    setTimeout(dispatch(RecordDeleted(dataId?.is_disabled)), 1000);
  }, [dataId?.id, dataId?.is_disabled, dispatch, enqueueSnackbar, handleClose, closeSnackbar]);

  useEffect(() => {
    if (agreed === true) {
      handleDelete();
      setAgreed(false);
      setOpenn(false);
    } else {
      setOpenn(false);
    }
  }, [agreed, handleDelete]);

  const handleOpen = (data) => {
    setOpenn(true);
    dispatch(setDataId(data));
  };

  const handleAgentData = () => {
    navigate(`/dashboard/agents/agent-definition/agent-data/${dataId?.id}`);
  };
  const handleClicktData = (e, data) => {
    handleClick(e);
    dispatch(setDataId(data));
  };

  return (
    <>
      {dataIds.is_disabled === false ? (
        <Button
          id="demo-customized-button"
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="outlined"
          size="small"
          disableElevation
          onClick={(event) => handleClicktData(event, dataIds)}
          endIcon={<KeyboardArrowDown />}
        >
          More
        </Button>
      ) : (
        <Button variant="outlined" color="primary" onClick={() => handleOpen(dataIds)}>
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
        <Divider sx={{ my: 0.5 }} />

        <MenuItem onClick={handleAgentData} sx={{ display: 'flex', justifyContent: 'center' }}>
          Agent Data
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />

        <MenuItem
          onClick={() => handleOpen(dataId)}
          sx={{ color: 'error.main', display: 'flex', justifyContent: 'center' }}
        >
          Disable
        </MenuItem>
      </StyledMenu>
      <AlertDialog
        setAgreed={setAgreed}
        setOpenn={setOpenn}
        openn={openn}
        Content={`Are you sure you want to ${dataId?.is_disabled === false ? `disable` : `restore`} ?`}
        description=""
      />
    </>
  );
}

export default AgentMoreButton;
