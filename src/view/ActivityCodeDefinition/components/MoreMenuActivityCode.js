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
import { MIconButton } from '../../../components/@material-extend';
import { setDataEdit } from '../../../ReduxCreated/actions/ActivityCodeDefinition';
import { DeleteActivityCodeDefintion } from '../../../api/ActivityCodeDefinition';
import AlertDialog from '../../../pages/components-overview/material-ui/dialog/AlertDialog';

export function MoreMenuButton({ rowID }) {
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [openn, setOpenn] = useState();
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleDelete = async () => {
    await DeleteActivityCodeDefintion(rowID?.id);
    enqueueSnackbar('successfully Deleted', {
      variant: 'success',
      action: (key) => (
        <MIconButton size="small" onClick={() => closeSnackbar(key)}>
          <Icon icon={closeFill} />
        </MIconButton>
      )
    });
    setOpenn(false);
  };

  const handleEdit = () => {
    dispatch(setDataEdit(true));
  };

  return (
    <>
      <>
        <MIconButton ref={menuRef} size="large" onClick={handleOpen}>
          <Icon icon={moreVerticalFill} width={20} height={20} />
        </MIconButton>
      </>

      <Menu
        open={open}
        anchorEl={menuRef.current}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
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

MoreMenuButton.propTypes = {
  rowID: PropTypes.object
};
