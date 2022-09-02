// material
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import { PropTypes } from 'prop-types';

// ----------------------------------------------------------------------

export default function AlertDialog({ openn, Content, description, setOpenn, setAgreed }) {
  console.log(openn);
  return (
    <div>
      <Dialog open={openn} onClose={() => setOpenn(false)}>
        <DialogTitle>{Content}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenn(false)}>Disagree</Button>
          <Button onClick={() => setAgreed(true)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AlertDialog.propTypes = {
  openn: PropTypes.bool,
  Content: PropTypes.string,
  description: PropTypes.string,
  setOpenn: PropTypes.func,
  setAgreed: PropTypes.func
};
