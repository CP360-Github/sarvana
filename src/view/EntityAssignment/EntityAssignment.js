import { Container, Grid } from '@material-ui/core';
import useSettings from '../../hooks/useSettings';
import Page from '../../components/Page';
import MainEntityAssignment from './Components/MainEntityAssignment';

const EntityAssignment = () => {
  const { themeStretch } = useSettings();
  return (
    <Page title="Entity Assignment">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <MainEntityAssignment />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default EntityAssignment;
