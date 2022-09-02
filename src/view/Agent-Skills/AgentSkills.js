import { Grid } from '@material-ui/core';
import Page from '../../components/Page';
import FilterAgentSkills from './components/FilterAgentSkills';

const AgentSkills = () => (
  <Page title="Agent Skills">
    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <FilterAgentSkills />
      </Grid>
    </Grid>
  </Page>
);

export default AgentSkills;
