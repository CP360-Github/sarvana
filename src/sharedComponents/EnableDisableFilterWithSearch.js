import { Typography, Switch, Stack, styled, TextField, Box } from '@material-ui/core';
import PropTypes from 'prop-types';

const EnableDisableFilterWithSearch = ({ setFilter, filter, setSearchText, searchText }) => {
  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)'
      }
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff'
        }
      }
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200
      })
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box'
    }
  }));
  return (
    <Box sx={{ mt: 2, mx: 2, mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <TextField
        style={{ width: '300px' }}
        size="small"
        label="Search"
        variant="outlined"
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
      />
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography> {filter === false ? 'Enabled' : 'Disabled'} </Typography>
        <AntSwitch
          checked={filter}
          onChange={(e) => setFilter(e.target.checked)}
          inputProps={{ 'aria-label': 'ant design' }}
        />
      </Stack>
    </Box>
  );
};

export default EnableDisableFilterWithSearch;

EnableDisableFilterWithSearch.propTypes = {
  setFilter: PropTypes.func,
  filter: PropTypes.bool,
  setSearchText: PropTypes.func,
  searchText: PropTypes.string
};
