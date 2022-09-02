import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { Menu, MenuItem, ListItemText, Typography, Button, Divider } from '@material-ui/core';
import { useSnackbar } from 'notistack5';
import closeFill from '@iconify/icons-eva/close-fill';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import AlertDialog from '../../../pages/components-overview/material-ui/dialog/AlertDialog';
import { DeleteEntitySet } from '../../../api/EntitySet';
import { MIconButton } from '../../../components/@material-extend';
import { DeleteEntitySetAction } from '../../../ReduxCreated/actions/EntitySet.action';

const UseMoreButton = ({ entitySetId, entitySetType }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [isOpen, setIsOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState();
  const handleDelete = async (id) => {
    try {
      const response = await DeleteEntitySet(id, entitySetType);
      if (response.statusText === 'No Content') {
        dispatch(DeleteEntitySetAction(id));
        enqueueSnackbar('Entity Set Successfully Deleted!', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      }
      setIsOpen(false);
      setOpenPopup(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        ref={ref}
        onClick={() => setIsOpen(true)}
        style={{ display: 'flex', justifyContent: 'space-between', gap: '5px' }}
      >
        <Typography variant="body2">More</Typography>
        <Icon icon="eva:arrow-ios-downward-outline" width={20} height={20} />
      </Button>
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem component={Link} to={`/dashboard/account-setup/entity-include/${entitySetId}/${entitySetType}`}>
          <ListItemText
            primary="Entity Include"
            primaryTypographyProps={{ variant: 'body2', padding: '5px', textAlign: 'center', fontSize: '15px' }}
          />
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => setOpenPopup(true)}>
          <ListItemText
            primary="Delete"
            primaryTypographyProps={{
              variant: 'body2',
              padding: '5px',
              color: 'red',
              textAlign: 'center',
              fontSize: '15px'
            }}
          />
        </MenuItem>
        <AlertDialog
          setAgreed={() => handleDelete(entitySetId)}
          setOpenn={setOpenPopup}
          openn={openPopup}
          Content="Are you sure you want to delete?"
          description=""
        />
      </Menu>
    </>
  );
};

export default UseMoreButton;

UseMoreButton.propTypes = {
  entitySetId: PropTypes.number,
  entitySetType: PropTypes.number
};
