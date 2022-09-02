import { Container, Grid } from '@material-ui/core';
import MainQueueCode from './components/MainQueueCode';
import useSettings from '../../hooks/useSettings';
import Page from '../../components/Page';

const Queues = () => {
  const { themeStretch } = useSettings();
  return (
    <Page title="Queues">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <MainQueueCode />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Queues;
