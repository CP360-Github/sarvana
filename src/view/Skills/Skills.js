import { Container, Grid } from '@material-ui/core';
import MainSkillsCode from './Components/MainSkillsCode';
import useSettings from '../../hooks/useSettings';
import Page from '../../components/Page';

const Skills = () => {
  const { themeStretch } = useSettings();
  return (
    <Page title="Skills">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <MainSkillsCode />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Skills;
