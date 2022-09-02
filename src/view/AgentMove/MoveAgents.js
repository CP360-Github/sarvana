import { Grid } from '@material-ui/core';
import Page from '../../components/Page';
import MainMoveAgents from './components/MainMoveAgents';

const MoveAgents = () => (
  <Page title="Move Agents">
    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <MainMoveAgents />
      </Grid>
    </Grid>
  </Page>
);

export default MoveAgents;
