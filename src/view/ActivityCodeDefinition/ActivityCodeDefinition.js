import { Grid } from '@material-ui/core';
import Page from '../../components/Page';
import MainActivityCode from './components/MainActivityCode';

const ActivityCodeDefinition = () => (
  <Page title="Activity Code Definition">
    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <MainActivityCode />
      </Grid>
    </Grid>
  </Page>
);

export default ActivityCodeDefinition;
