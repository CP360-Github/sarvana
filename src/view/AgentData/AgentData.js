import { Grid } from '@material-ui/core';
import Page from '../../components/Page';
import MainAgentData from './components/MainAgentData';

const AgentData = () => (
  <Page title="Agent Data">
    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <MainAgentData />
      </Grid>
    </Grid>
  </Page>
);

export default AgentData;
