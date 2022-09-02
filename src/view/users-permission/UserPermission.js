import { Grid } from '@material-ui/core';
import Page from '../../components/Page';
import MainUserPermission from './components/MainUserPermission';

const UserPermission = () => (
  <Page title="User Permissions">
    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <MainUserPermission />
      </Grid>
    </Grid>
  </Page>
);

export default UserPermission;
