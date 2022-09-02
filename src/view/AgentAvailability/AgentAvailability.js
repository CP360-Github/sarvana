import { Container, Grid } from '@material-ui/core';
import useSettings from '../../hooks/useSettings';
import Page from '../../components/Page';
import MainAgentAvailability from './Components/MainAgentAvailability';

const AgentAvailability = () => {
  const { themeStretch } = useSettings();
  return (
    <Page title="Agent Availability">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <MainAgentAvailability />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default AgentAvailability;
