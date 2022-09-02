import { Card, Checkbox, Typography, List, ListItem, ListItemButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import '../EntitySet.css';

const EntityIncludeTable = ({
  title,
  entityList,
  setSelectedEntity,
  selectedEntity,
  setChecked,
  checked,
  setIsDisableForward,
  searchText
}) => {
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value.id);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      setSelectedEntity((prev) => [...prev, value]);
      newChecked.push(value.id);
    } else {
      const filterData = selectedEntity?.filter((val) => val.id !== value.id);
      setSelectedEntity(filterData);
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    if (title === 'Entities') {
      setIsDisableForward({ checkFrom: 'entities', checkToken: newChecked.length !== 0 });
    } else {
      setIsDisableForward({ checkFrom: 'includes', checkToken: newChecked.length !== 0 });
    }
  };

  const filterData = (searchedData, search) =>
    searchedData?.filter(
      (el) =>
        (el.eg_name !== undefined && el.eg_name.toLowerCase().indexOf(search.toLowerCase()) !== -1) ||
        (el.mu_name !== undefined && el.mu_name.toLowerCase().indexOf(search.toLowerCase()) !== -1) ||
        (el.ct_name !== undefined && el.ct_name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
    );

  return (
    <Card sx={{ width: '100%', height: '400px', overflow: 'auto', borderRadius: '7px' }}>
      <List sx={{ width: '100%' }} disablePadding>
        <Typography
          align="center"
          variant="h5"
          sx={{ background: 'lightgrey', paddingTop: '10px' }}
          height="50px"
          disablePadding
        >
          {title}
        </Typography>
        <ListItem sx={{ background: '#e5e2e278' }} height="50px">
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <div style={{ width: '30px' }}> </div>
            <div style={{ width: '40px' }}>ID</div>
            <div style={{ width: '100px' }}>Name</div>
          </div>
        </ListItem>
        {filterData(entityList, searchText).map((EntitySet) => {
          const labelId = `checkbox-list-label-${EntitySet.id}`;
          return (
            <ListItem key={EntitySet.id} disablePadding style={{ borderBottom: '1px solid lightgrey' }}>
              <ListItemButton role={undefined} dense onClick={handleToggle(EntitySet)}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                  <div>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(EntitySet.id) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </div>

                  <div style={{ width: '40px' }}>{EntitySet.id}</div>
                  <div style={{ width: '100px' }}>
                    {EntitySet.eg_name !== undefined && EntitySet.eg_name}
                    {EntitySet.mu_name !== undefined && EntitySet.mu_name}
                    {EntitySet.ct_name !== undefined && EntitySet.ct_name}
                  </div>
                </div>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};

export default EntityIncludeTable;

EntityIncludeTable.propTypes = {
  title: PropTypes.string,
  entityList: PropTypes.array,
  selectedEntity: PropTypes.array,
  setSelectedEntity: PropTypes.func,
  setChecked: PropTypes.func,
  checked: PropTypes.array,
  setIsDisableForward: PropTypes.func,
  searchText: PropTypes.string
};
