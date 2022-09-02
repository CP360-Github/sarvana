import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';
import {
  Container,
  Grid,
  Box,
  Card,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  FormHelperText
} from '@material-ui/core';
import moreHorizontalFill from '@iconify/icons-eva/more-horizontal-fill';
import { useNavigate } from 'react-router-dom';
import useSettings from '../../hooks/useSettings';
import Page from '../../components/Page';
import { MIconButton } from '../../components/@material-extend';
import AvailabilityCalendarForm from './Components/AvailabilityCalendarForm';
import './AgentAvailability.css';
import BaseAcdModal from './Components/BaseAcdModal';

const WorkRuleAvailability = () => {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const [nextOrSave, setNextOrSave] = useState('Next');
  const [selectedBsc, setSelectedBsc] = useState({});
  const RedirectToAvailabilityDashboard = () => {
    navigate('/dashboard/agents/agent-availability');
  };

  const WorkRule = Yup.object().shape({
    BaseScheduleCode: Yup.string().required('Base Schedule Code Required!'),
    WorkStatus: Yup.string().required('Work Status Required!'),
    weeklyRule: Yup.string().required('Weekly Rules Required!'),
    weeklyFrom: Yup.string().required('Work Hours From Required!'),
    weeklyTo: Yup.string().required('Work Hours To Required!'),
    forceToWork: Yup.string().required('Force To Work Required!'),
    MaxScheduleLength: Yup.string().required('Max Schedule Length Required!'),
    ConsecutiveDaysOffFrom: Yup.string()
      .min(1, 'Please enter more than 1 character')
      .max(2, 'Please enter less than 2 character')
      .required('Consecutive Days Off From Required!'),
    ConsecutiveDaysOffTo: Yup.string().required('Consecutive Days Off To Required!'),
    MinTimeBetweenSchedule: Yup.string().required('Min Time Between Schedule Required!'),
    MinResetPeriodPerWeek: Yup.string().required('Min Reset Period Per Week Required!'),
    MaxAverageWorkHours: Yup.string().required('Max Average Work Hours Required!'),
    Rotation: Yup.string().length(2)
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      dateRange: 1,
      BaseScheduleCode: '',
      forceToWork: '',
      WorkStatus: 1,
      weeklyRule: 1,
      Rotation: '',
      weeklyFrom: '',
      weeklyTo: '',
      ConsecutiveDaysOffFrom: '',
      ConsecutiveDaysOffTo: '',
      ConsecutiveDaysToWorkFrom: '',
      ConsecutiveDaysToWorkTo: '',
      MaxScheduleLength: '',
      MinTimeBetweenSchedule: '',
      MinResetPeriodPerWeek: '',
      MaxAverageWorkHours: '',
      MaxDayOff: '',
      InNumbersOfWeeks: '',
      InNumbersOfDays: ''
    },
    validationSchema: WorkRule,
    onSubmit: (values) => {
      console.log(values);
      addWorkRuleHandler();
    }
  });

  const { errors, touched, values, getFieldProps, handleSubmit, setFieldValue } = formik;

  const addWorkRuleHandler = async () => {
    // setNextOrSave((prev) => (prev === 'Next' ? 'Save' : 'Next'));
    console.log(values);
  };
  useEffect(() => {
    setFieldValue('BaseScheduleCode', selectedBsc?.description);
  }, [selectedBsc, setFieldValue]);
  return (
    <Page title="Agent Availability">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Card sx={{ py: '2rem', pr: '2rem', pl: '1rem' }}>
              <Formik value={formik}>
                <div>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <Typography variant="h5" sx={{ cursor: 'pointer' }} onClick={RedirectToAvailabilityDashboard}>
                      {nextOrSave === 'Next' ? 'Agent Work Rule' : 'Agent Availability'}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        variant="contained"
                        sx={{ background: 'gray', mr: 3 }}
                        disabled={nextOrSave === 'Next'}
                        onClick={() => setNextOrSave((prev) => (prev === 'Save' ? 'Next' : 'Save'))}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        // onClick={() => setNextOrSave((prev) => (prev === 'Next' ? 'Save' : 'Next'))}
                      >
                        {nextOrSave}
                      </Button>
                    </Box>
                  </Box>

                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: '100%' }
                    }}
                    autoComplete="off"
                  >
                    {nextOrSave === 'Next' ? (
                      <>
                        <Grid container spacing={1}>
                          <Grid item xs={6} md={4}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <FormControl fullWidth>
                                <InputLabel> Date Range</InputLabel>
                                <Select
                                  label="Date Range"
                                  size="small"
                                  variant="outlined"
                                  name="dateRange"
                                  {...getFieldProps('dateRange')}
                                  error={Boolean(touched.dateRange && errors.dateRange)}
                                  helperText={touched.dateRange && errors.dateRange}
                                >
                                  <MenuItem value={1}> Default </MenuItem>
                                </Select>
                              </FormControl>
                              <MIconButton style={{ width: '40px', height: '40px' }}>
                                <Icon icon={moreHorizontalFill} width={20} height={20} />
                              </MIconButton>
                            </div>
                          </Grid>
                          <Grid item xs={6} md={4}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <TextField
                                size="small"
                                label="Base Schedule Code*"
                                variant="outlined"
                                sx={{ width: '100%' }}
                                name="BaseScheduleCode"
                                inputProps={{
                                  readOnly: true
                                }}
                                value={values.BaseScheduleCode}
                                {...getFieldProps('BaseScheduleCode')}
                                error={Boolean(touched.BaseScheduleCode && errors.BaseScheduleCode)}
                                helperText={touched.BaseScheduleCode && errors.BaseScheduleCode}
                              />
                              <BaseAcdModal modalHeading="Base Schedule Code" setSelectedBsc={setSelectedBsc} />
                            </div>
                          </Grid>
                          <Grid item xs={6} md={4}>
                            <FormGroup sx={{ justifyContent: 'center' }}>
                              <FormControlLabel control={<Checkbox />} name="forceToWork" label="Force To Work*" />
                              <FormHelperText error={Boolean(touched.forceToWork && errors.forceToWork)}>
                                {touched.forceToWork && errors.forceToWork}
                              </FormHelperText>
                            </FormGroup>
                          </Grid>
                          <Grid item xs={6} md={4} mt={2}>
                            <FormControl sx={{ width: '89%' }}>
                              <InputLabel> Work Status*</InputLabel>
                              <Select
                                size="small"
                                label="Work Status*"
                                variant="outlined"
                                name="WorkStatus"
                                {...getFieldProps('WorkStatus')}
                                error={Boolean(touched.WorkStatus && errors.WorkStatus)}
                                helperText={touched.WorkStatus && errors.WorkStatus}
                              >
                                <MenuItem value={1}> Part </MenuItem>
                                <MenuItem value={2}> Full </MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={6} md={4} mt={2}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <FormControl fullWidth>
                                <InputLabel> Weekly Rules*</InputLabel>
                                <Select
                                  size="small"
                                  label="Weekly Rules*"
                                  variant="outlined"
                                  fullWidth
                                  name="weeklyRule"
                                  {...getFieldProps('weeklyRule')}
                                  error={Boolean(touched.weeklyRule && errors.weeklyRule)}
                                  helperText={touched.weeklyRule && errors.weeklyRule}
                                  inputProps={{ readOnly: true }}
                                >
                                  <MenuItem value={1}> Work Rule 1 </MenuItem>
                                  <MenuItem value={2}> Work Rule 2 </MenuItem>
                                  <MenuItem value={3}> Work Rule 3 </MenuItem>
                                </Select>
                              </FormControl>
                              <MIconButton style={{ width: '40px', height: '40px' }}>
                                <Icon icon={moreHorizontalFill} width={20} height={20} />
                              </MIconButton>
                            </div>
                          </Grid>
                          <Grid item xs={6} md={4} mt={2}>
                            <FormControl
                              sx={{ width: '89%' }}
                              // disabled
                            >
                              <TextField
                                type="number"
                                InputLabelProps={{
                                  shrink: true
                                }}
                                label="Rotation"
                                variant="outlined"
                                name="Rotation"
                                {...getFieldProps('Rotation')}
                                error={Boolean(touched.Rotation && errors.Rotation)}
                                helperText={touched.Rotation && errors.Rotation}
                                size="small"
                              />
                            </FormControl>
                          </Grid>
                        </Grid>
                        <Grid container spacing={1} mt={2}>
                          <Grid item xs={6} md={12} mt={1}>
                            <Typography paragraph>
                              <strong>
                                Default preferences exist : &nbsp; &nbsp; <span style={{ color: 'red' }}>No</span>
                              </strong>
                            </Typography>
                            <Typography paragraph sx={{ mt: '2rem' }}>
                              <strong> Date range preferences exist:</strong>
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container spacing={1} sx={{ paddingLeft: '1rem' }}>
                          <Grid item md={12} sx={{ marginBlock: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <Typography sx={{ width: '200px', mb: 0 }} paragraph>
                                <strong>Weekly Hours</strong>
                              </Typography>
                              <div>
                                <TextField
                                  type="time"
                                  sx={{ width: '150px' }}
                                  InputLabelProps={{
                                    shrink: true
                                  }}
                                  label="From*"
                                  variant="outlined"
                                  name="weeklyFrom"
                                  {...getFieldProps('weeklyFrom')}
                                  error={Boolean(touched.weeklyFrom && errors.weeklyFrom)}
                                  helperText={touched.weeklyFrom && errors.weeklyFrom}
                                  size="small"
                                />
                                <TextField
                                  type="time"
                                  InputLabelProps={{
                                    shrink: true
                                  }}
                                  size="small"
                                  sx={{ width: '150px', marginLeft: '1rem' }}
                                  label="To*"
                                  variant="outlined"
                                  name="weeklyTo"
                                  {...getFieldProps('weeklyTo')}
                                  error={Boolean(touched.weeklyTo && errors.weeklyTo)}
                                  helperText={touched.weeklyTo && errors.weeklyTo}
                                />
                              </div>
                            </div>
                          </Grid>

                          <Grid item md={12} sx={{ marginBlock: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <Typography sx={{ width: '200px', mb: 0 }} paragraph>
                                <strong>Consecutive Days Off</strong>
                              </Typography>
                              <div>
                                <TextField
                                  type="number"
                                  InputLabelProps={{
                                    shrink: true
                                  }}
                                  sx={{ width: '150px' }}
                                  label="From*"
                                  variant="outlined"
                                  size="small"
                                  name="ConsecutiveDaysOffFrom"
                                  {...getFieldProps('ConsecutiveDaysOffFrom')}
                                  error={Boolean(touched.ConsecutiveDaysOffFrom && errors.ConsecutiveDaysOffFrom)}
                                  helperText={touched.ConsecutiveDaysOffFrom && errors.ConsecutiveDaysOffFrom}
                                />
                                <TextField
                                  type="number"
                                  sx={{ width: '150px', marginLeft: '1rem' }}
                                  InputLabelProps={{
                                    shrink: true
                                  }}
                                  label="To*"
                                  variant="outlined"
                                  size="small"
                                  name="ConsecutiveDaysOffTo"
                                  {...getFieldProps('ConsecutiveDaysOffTo')}
                                  error={Boolean(touched.ConsecutiveDaysOffTo && errors.ConsecutiveDaysOffTo)}
                                  helperText={touched.ConsecutiveDaysOffTo && errors.ConsecutiveDaysOffTo}
                                />
                              </div>
                            </div>
                          </Grid>
                          <Grid item md={12} sx={{ marginBlock: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <Typography sx={{ width: '200px', mb: 0 }} paragraph>
                                <strong>Consecutive Days To Work</strong>
                              </Typography>
                              <div>
                                <TextField
                                  type="number"
                                  InputLabelProps={{
                                    shrink: true
                                  }}
                                  sx={{ width: '150px' }}
                                  label="From"
                                  variant="outlined"
                                  size="small"
                                  name="ConsecutiveDaysToWorkFrom"
                                  {...getFieldProps('ConsecutiveDaysToWorkFrom')}
                                  error={Boolean(touched.ConsecutiveDaysToWorkFrom && errors.ConsecutiveDaysToWorkFrom)}
                                  helperText={touched.ConsecutiveDaysToWorkFrom && errors.ConsecutiveDaysToWorkFrom}
                                />
                                <TextField
                                  type="number"
                                  InputLabelProps={{
                                    shrink: true
                                  }}
                                  sx={{ width: '150px', marginLeft: '1rem' }}
                                  label="To"
                                  variant="outlined"
                                  size="small"
                                  name="ConsecutiveDaysToWorkTo"
                                  {...getFieldProps('ConsecutiveDaysToWorkTo')}
                                  error={Boolean(touched.ConsecutiveDaysToWorkTo && errors.ConsecutiveDaysToWorkTo)}
                                  helperText={touched.ConsecutiveDaysToWorkTo && errors.ConsecutiveDaysToWorkTo}
                                />
                              </div>
                            </div>
                          </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                          <Grid item xs={6} md={4} mt={1}>
                            <TextField
                              sx={{ width: '89%' }}
                              label="Max Schedule Length*"
                              variant="outlined"
                              size="small"
                              name="MaxScheduleLength"
                              {...getFieldProps('MaxScheduleLength')}
                              error={Boolean(touched.MaxScheduleLength && errors.MaxScheduleLength)}
                              helperText={touched.MaxScheduleLength && errors.MaxScheduleLength}
                            />
                          </Grid>
                          <Grid item xs={6} md={4} mt={1}>
                            <TextField
                              type="time"
                              InputLabelProps={{
                                shrink: true
                              }}
                              sx={{ width: '89%' }}
                              label="Min Time Between Schedule*"
                              variant="outlined"
                              size="small"
                              name="MinTimeBetweenSchedule"
                              {...getFieldProps('MinTimeBetweenSchedule')}
                              error={Boolean(touched.MinTimeBetweenSchedule && errors.MinTimeBetweenSchedule)}
                              helperText={touched.MinTimeBetweenSchedule && errors.MinTimeBetweenSchedule}
                            />
                          </Grid>
                          <Grid item xs={6} md={4} mt={1}>
                            <TextField
                              sx={{ width: '89%' }}
                              type="time"
                              InputLabelProps={{
                                shrink: true
                              }}
                              label="Min Reset Period Per Week*"
                              variant="outlined"
                              size="small"
                              name="MinResetPeriodPerWeek"
                              {...getFieldProps('MinResetPeriodPerWeek')}
                              error={Boolean(touched.MinResetPeriodPerWeek && errors.MinResetPeriodPerWeek)}
                              helperText={touched.MinResetPeriodPerWeek && errors.MinResetPeriodPerWeek}
                            />
                          </Grid>
                          <Grid item xs={6} md={4} mt={1}>
                            <TextField
                              sx={{ width: '89%' }}
                              label="Max Average Work Hours*"
                              variant="outlined"
                              size="small"
                              name="MaxAverageWorkHours"
                              {...getFieldProps('MaxAverageWorkHours')}
                              error={Boolean(touched.MaxAverageWorkHours && errors.MaxAverageWorkHours)}
                              helperText={touched.MaxAverageWorkHours && errors.MaxAverageWorkHours}
                            />
                          </Grid>
                          <Grid item xs={6} md={4} mt={1}>
                            <TextField
                              sx={{ width: '89%' }}
                              label="Max Day Off"
                              variant="outlined"
                              size="small"
                              name="MaxDayOff"
                              {...getFieldProps('MaxDayOff')}
                              error={Boolean(touched.MaxDayOff && errors.MaxDayOff)}
                              helperText={touched.MaxDayOff && errors.MaxDayOff}
                            />
                          </Grid>
                          <Grid item xs={6} md={4} mt={1}>
                            <TextField
                              sx={{ width: '89%' }}
                              label="In Numbers Of Weeks (rolling)"
                              variant="outlined"
                              size="small"
                              name="InNumbersOfWeeks"
                              {...getFieldProps('InNumbersOfWeeks')}
                              error={Boolean(touched.InNumbersOfWeeks && errors.InNumbersOfWeeks)}
                              helperText={touched.InNumbersOfWeeks && errors.InNumbersOfWeeks}
                            />
                          </Grid>
                          <Grid item xs={6} md={4} mt={1}>
                            <TextField
                              sx={{ width: '89%' }}
                              label="In numbers of days (rolling)"
                              variant="outlined"
                              size="small"
                              name="InNumbersOfDays"
                              {...getFieldProps('InNumbersOfDays')}
                              error={Boolean(touched.InNumbersOfDays && errors.InNumbersOfDays)}
                              helperText={touched.InNumbersOfDays && errors.InNumbersOfDays}
                            />
                          </Grid>
                        </Grid>
                      </>
                    ) : (
                      <>
                        <AvailabilityCalendarForm />
                      </>
                    )}
                  </Box>
                </div>
              </Formik>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default WorkRuleAvailability;
