import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { Menu, MenuItem, ListItemText, Typography, Button, Divider } from '@material-ui/core';
import { useSnackbar } from 'notistack5';
import closeFill from '@iconify/icons-eva/close-fill';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import AlertDialog from '../../../pages/components-overview/material-ui/dialog/AlertDialog';
import { DisableQueue } from '../../../api/Queue';
import { MIconButton } from '../../../components/@material-extend';
import { DisableQueueAction } from '../../../ReduxCreated/actions/Queue';

const UseMoreButton = ({ queueId, isDisable }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [isOpen, setIsOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState();
  const handleDelete = async (id, disableToken) => {
    try {
      const response = await DisableQueue(id, disableToken);
      if (response.statusText === 'OK') {
        dispatch(DisableQueueAction({ id, is_disabled: response.data.is_disabled }));
        enqueueSnackbar(`Queue Successfully ${disableToken === false ? `Disabled` : `Restored`} !`, {
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
      {isDisable === true ? (
        <Button variant="outlined" color="primary" onClick={() => setOpenPopup(true)}>
          Restore
        </Button>
      ) : (
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
      )}
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
        <MenuItem component={Link} to={`/dashboard/account-setup/queues-history/${queueId}`}>
          <ListItemText
            primary="History"
            primaryTypographyProps={{ variant: 'body2', padding: '5px', textAlign: 'center', fontSize: '15px' }}
          />
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => setOpenPopup(true)}>
          <ListItemText
            primary="Disable"
            primaryTypographyProps={{
              variant: 'body2',
              padding: '5px',
              color: 'red',
              textAlign: 'center',
              fontSize: '15px'
            }}
          />
        </MenuItem>
      </Menu>
      <AlertDialog
        setAgreed={() => handleDelete(queueId, !isDisable)}
        setOpenn={setOpenPopup}
        openn={openPopup}
        Content={`Are you sure you want to ${isDisable === false ? `Disable` : `Restore`} Queue?`}
        description=""
      />
    </>
  );
};

export default UseMoreButton;

UseMoreButton.propTypes = {
  queueId: PropTypes.number,
  isDisable: PropTypes.bool
};
