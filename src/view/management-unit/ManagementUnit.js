// material
import { Grid } from '@material-ui/core';

// components
import Page from '../../components/Page';
import ManagementUnitList from './components/ManagementUnitList';

// ----------------------------------------------------------------------

export default function GeneralBooking() {
  return (
    <Page title="Management Unit | SCHEDULY">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ManagementUnitList />
        </Grid>
      </Grid>
    </Page>
  );
}
