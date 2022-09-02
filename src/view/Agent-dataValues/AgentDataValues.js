import { Grid } from '@material-ui/core';
import Page from '../../components/Page';
import FilterAgentDataValues from './components/FilterAgentDataValues';

const AgentDataValues = () => (
  <Page title="Agent Data Values">
    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <FilterAgentDataValues />
      </Grid>
    </Grid>
  </Page>
);

export default AgentDataValues;
