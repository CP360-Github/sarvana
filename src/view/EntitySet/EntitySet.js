import React from 'react';

import { Container, Grid } from '@material-ui/core';
import MainEntitySetCode from './Components/MainEntitySetCode';
import useSettings from '../../hooks/useSettings';
import Page from '../../components/Page';

const EntitySet = () => {
  const { themeStretch } = useSettings();
  return (
    <Page title="Entity Set">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <MainEntitySetCode />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default EntitySet;
