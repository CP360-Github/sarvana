import { Grid } from '@material-ui/core';
import Page from '../../components/Page';
import { AppNewInvoice } from '../../components/_dashboard/general-app';

const GeneralApp = () => (
  <Page title="Enterprise  Group | SCHEDULY">
    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <AppNewInvoice />
      </Grid>
    </Grid>
  </Page>
);

export default GeneralApp;
