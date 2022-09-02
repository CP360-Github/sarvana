import { Icon } from '@iconify/react';
import { useState, useEffect, useCallback } from 'react';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import arrowheadLeftFill from '@iconify/icons-eva/arrowhead-left-fill';
import arrowheadRightFill from '@iconify/icons-eva/arrowhead-right-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import { useSelector, useDispatch } from 'react-redux';
import { Grid, List, Card, Button, Checkbox, ListItemIcon, ListItemButton, Typography } from '@material-ui/core';
import { setFourChecked, setRightChecked } from '../../../../ReduxCreated/actions/EnterPriseGroup';

// ----------------------------------------------------------------------

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function SimpleTransferList() {
  let IconsData = [];
  let y = [];
  const dispatch = useDispatch();
  const selectedAvailability = useSelector((state) => state.actiontype.selectedAvailability);
  const saveClicked = useSelector((state) => state.actiontype.saveClicked);
  const icons = useSelector((state) => state.actiontype.icons);
  const iconsData = useSelector((state) => state.actiontype.iconsData);
  const fourChecked = useSelector((state) => state.details.fourChecked);
  const showData = useSelector((state) => state.actiontype.showData);
  const storeSkills = useSelector((state) => state.details.storeSkills);
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState(icons);
  const [right, setRight] = useState([]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const [openSkills, setOpenSkills] = useState(false);

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

  const handleAllRight = useCallback(() => {
    setRight(right.concat(left));
    setLeft([]);
  }, [left, right]);

  const handleCheckedRight = (IconsData, y) => {
    if (openSkills === true) {
      setRight(IconsData);
      setLeft(y);
    } else {
      setRight(right.concat(leftChecked));
      setLeft(not(left, leftChecked));
      setChecked(not(checked, leftChecked));
    }
  };

  const handleCheckedRightt = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    console.log(right.concat(leftChecked));
    dispatch(setRightChecked(right.concat(leftChecked)));
    setOpenSkills(false);
    dispatch(setFourChecked(false));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const handleCheckedFourCheckedTrue = (IconsData, y) => {
    console.log(IconsData, y);
    setRight(IconsData);
    setLeft(y);
    dispatch(setFourChecked(false));
    setOpenSkills(false);
  };

  useEffect(() => {
    console.log(saveClicked, 'saveClicked');
    console.log(rightChecked, 'rightChecked');
    console.log(fourChecked, 'fourChecked');
    console.log(selectedAvailability?.id, 'selectedAvailability?.id');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    IconsData = [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
    y = [];
    if (selectedAvailability?.id === 1) {
      setOpenSkills(false);
      handleAllRight();
      dispatch(setFourChecked(false));
    } else if (selectedAvailability?.id === 2) {
      setOpenSkills(true);
      iconsData?.map((d) =>
        d?.open_skills?.length === storeSkills?.length
          ? icons.filter((val) =>
              val.id === d.id ? IconsData.push({ id: val.id, icon: val.icon, description: val.description }) : ''
            )
          : icons.filter((val) =>
              val.id !== d.id ? '' : y.push({ id: val.id, icon: val.icon, description: val.description })
            )
      );
      handleCheckedRight(IconsData, y);
      dispatch(setFourChecked(false));
    } else if (selectedAvailability?.id === 3) {
      setOpenSkills(true);
      iconsData.map((d) =>
        d.available === true
          ? IconsData.push({ id: d.id, icon: d.icon, description: d.description })
          : y.push({ id: d.id, icon: d.icon, description: d.description })
      );
      handleCheckedRight(IconsData, y);
      dispatch(setFourChecked(false));
    } else if (selectedAvailability?.id === 4) {
      if (fourChecked === true) {
        iconsData?.map((d) =>
          showData.available_activity_code.includes(d?.id)
            ? IconsData.push({ id: d.id, icon: d.icon, description: d.description })
            : y.push({ id: d.id, icon: d.icon, description: d.description })
        );
        handleCheckedFourCheckedTrue(IconsData, y);
      } else {
        handleCheckedRightt();
      }
    } else if (selectedAvailability === null || selectedAvailability === undefined) {
      handleAllLeft();
      dispatch(setFourChecked(false));
    }
    // eslint-disable-next-line
  }, [selectedAvailability, openSkills, saveClicked]);

  const customList = (y) => (
    <Card
      sx={{
        width: 200,
        maxHeight: 620,
        overflow: 'auto',
        borderRadius: 1.5
      }}
    >
      <List dense component="div" role="list">
        {y?.map((value) => (
          <ListItemButton key={value.id} role="listitem" onClick={handleToggle(value)}>
            {selectedAvailability?.id === 4 && (
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': value.id }}
                />
              </ListItemIcon>
            )}

            <Icon id={value.id} icon={`${value.icon}`} fontSize="40px" />
            <Typography
              id={value.id}
              style={{ fontSize: '10px', paddingLeft: '10px', paddingTop: '10px' }}
            >{`${value.description}`}</Typography>
          </ListItemButton>
        ))}
      </List>
    </Card>
  );

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ width: 'auto', py: 3 }}>
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center" sx={{ p: 3 }}>
          <Button
            color="inherit"
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0 || selectedAvailability?.id !== 4}
            aria-label="move all right"
            sx={{ my: 1 }}
          >
            <Icon icon={arrowheadRightFill} width={18} height={18} />
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            size="small"
            onClick={handleCheckedRightt}
            disabled={leftChecked.length === 0 || selectedAvailability?.id !== 4}
            aria-label="move selected right"
            sx={{ my: 1 }}
          >
            <Icon icon={arrowIosForwardFill} width={18} height={18} />
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0 || selectedAvailability?.id !== 4}
            aria-label="move selected left"
            sx={{ my: 1 }}
          >
            <Icon icon={arrowIosBackFill} width={18} height={18} />
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0 || selectedAvailability?.id !== 4}
            aria-label="move all left"
            sx={{ my: 1 }}
          >
            <Icon icon={arrowheadLeftFill} width={18} height={18} />
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right)}</Grid>
    </Grid>
  );
}
