import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import arrowheadLeftFill from '@iconify/icons-eva/arrowhead-left-fill';
import arrowheadRightFill from '@iconify/icons-eva/arrowhead-right-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import {
  Grid,
  List,
  Card,
  Button,
  Checkbox,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Typography,
  Box
} from '@material-ui/core';

// ----------------------------------------------------------------------

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

const AgentDataGroupList = ({
  left,
  setLeft,
  right,
  setRight,
  title1,
  title2,
  buttonClick,
  setRightSideadgs,
  value
}) => {
  const [checked, setChecked] = useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleAllRight = () => {
    setRight(right.concat(left));
    setRightSideadgs(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setRightSideadgs(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setRightSideadgs(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
    setRightSideadgs([]);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const customList = (items) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return (
      <Card
        sx={{
          width: '200px',
          padding: '10px',
          height: 'auto',
          overflow: 'auto',
          borderRadius: 1.5
        }}
      >
        {buttonClick === false ? (
          <List dense component="div" role="list">
            {items?.map((value, index) => (
              <ListItemButton key={index} role="listitem" onClick={handleToggle(value)}>
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': index }}
                  />
                </ListItemIcon>
                <ListItemText id={index} primary={value?.description} />
              </ListItemButton>
            ))}
          </List>
        ) : value ? (
          <List dense component="div" role="list">
            {items?.map((value, index) => (
              <ListItemButton key={index} role="listitem" onClick={handleToggle(value)}>
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': index }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={index}
                  primary={
                    value?.adg?.datatype === 3
                      ? new Date(value?.adg_value).toLocaleTimeString('en-US', options)
                      : value?.adg?.datatype === 6
                      ? new Date(value?.adg_value).toLocaleDateString()
                      : value?.adg_value
                  }
                />
              </ListItemButton>
            ))}
          </List>
        ) : null}
      </Card>
    );
  };
  return (
    <>
      {buttonClick === false ? (
        <Grid container alignItems="center">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row'
            }}
          >
            <Box sx={{ width: '300px', height: 'auto' }}>
              <Typography variant="h6">{title1}</Typography>
            </Box>
            <Box sx={{ width: '300px', height: 'auto', justifyContent: 'end', display: 'flex' }}>
              <Typography variant="h6">{title2}</Typography>
            </Box>
          </Box>
        </Grid>
      ) : value ? (
        <Grid container alignItems="center">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row'
            }}
          >
            <Box sx={{ width: '300px', height: 'auto' }}>
              <Typography variant="h6">{title1}</Typography>
            </Box>
            <Box sx={{ width: '300px', height: 'auto', justifyContent: 'end', display: 'flex' }}>
              <Typography variant="h6">{title2}</Typography>
            </Box>
          </Box>
        </Grid>
      ) : null}

      <Grid container justifyContent="space-between" alignItems="center" sx={{ py: 3 }}>
        <Grid item>{customList(left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center" sx={{ p: 3 }}>
            <Button
              color="inherit"
              variant="outlined"
              size="small"
              disabled={left.length === 0}
              onClick={handleAllRight}
              aria-label="move all right"
              sx={{ my: 1 }}
            >
              <Icon icon={arrowheadRightFill} width={18} height={18} />
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
              sx={{ my: 1 }}
            >
              <Icon icon={arrowIosForwardFill} width={18} height={18} />
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              onClick={handleCheckedLeft}
              size="small"
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
              sx={{ my: 1 }}
            >
              <Icon icon={arrowIosBackFill} width={18} height={18} />
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              size="small"
              disabled={right.length === 0}
              onClick={handleAllLeft}
              aria-label="move all left"
              sx={{ my: 1 }}
            >
              <Icon icon={arrowheadLeftFill} width={18} height={18} />
            </Button>
          </Grid>
        </Grid>

        <Grid item>{customList(right)}</Grid>
      </Grid>
    </>
  );
};

export default AgentDataGroupList;

AgentDataGroupList.propTypes = {
  left: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  setLeft: PropTypes.func,
  right: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  setRight: PropTypes.func,
  title1: PropTypes.string,
  title2: PropTypes.string,
  buttonClick: PropTypes.bool,
  setRightSideadgs: PropTypes.func,
  value: PropTypes.any
};
