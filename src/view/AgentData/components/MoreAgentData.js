import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack5';
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import edit from '@iconify/icons-eva/edit-2-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import { Menu, MenuItem, Typography, Divider } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MIconButton } from '../../../components/@material-extend';
import AlertDialog from '../../../pages/components-overview/material-ui/dialog/AlertDialog';
import { DeleteAgentData } from '../../../api/AgentDataGroups';
import { setDataEdit } from '../../../ReduxCreated/actions/AgentDataGroups';

export function MoreAgentData({ row }) {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openn, setOpenn] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleDelete = async () => {
    await DeleteAgentData(row?.id)
      .then(
        enqueueSnackbar('successfully Deleted', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        })
      )
      .then(setOpenn(false));
  };

  const handleEdit = () => {
    dispatch(setDataEdit(true));
  };

  const handleValues = (row) => {
    navigate(`/dashboard/account-setup/agent-group-values/${row}`);
  };

  return (
    <>
      <>
        <MIconButton ref={menuRef} size="large" onClick={handleOpen}>
          <Icon icon={moreVerticalFill} width={20} height={20} />
        </MIconButton>
      </>

      <Menu
        open={open || false}
        anchorEl={menuRef.current}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'blue' }} onClick={() => handleValues(row?.id)}>
          <Icon icon="icon-park:data" width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Values
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleEdit}>
          <Icon icon={edit} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Edit
          </Typography>
        </MenuItem>

        <Divider />
        <MenuItem sx={{ color: 'error.main' }} onClick={() => setOpenn(true)}>
          <Icon icon={trash2Outline} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Delete
          </Typography>
        </MenuItem>

        <AlertDialog
          setAgreed={handleDelete}
          setOpenn={setOpenn}
          openn={openn}
          Content="Are you sure you want to delete?"
          description=""
        />
      </Menu>
    </>
  );
}

MoreAgentData.propTypes = {
  row: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};
