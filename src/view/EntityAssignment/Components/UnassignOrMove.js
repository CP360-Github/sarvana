import * as Yup from 'yup';
import { useState, useRef, useEffect } from 'react';
import cross from '@iconify/icons-eva/close-outline';
import {
  Box,
  Typography,
  TextField,
  Button,
  Modal,
  Card,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';
import { Formik, useFormik } from 'formik';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { MIconButton } from '../../../components/@material-extend';
import AddContactTypeModal from '../../Queues/components/AddContactTypeModal';
import AddEnterPriseGroup from './AddEnterpriseGroup';
import { MoveEntity, UnAssignEntity } from '../../../api/EntityAssignment';
import {
  UpdateEntityHistoryAction,
  UnassignEntityHistoryAction
} from '../../../ReduxCreated/actions/EntityAssignment.action';

const UnassignOrMove = ({ entityType, modalType, historyId }) => {
  const style = {
    position: 'absolute',
    priority: 0,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '1px solid grey',
    boxShadow: 24,
    p: 4
  };
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [moveToEntityId, setMoveToEntityId] = useState('');
  const [moveToEntityName, setMoveToEntityName] = useState('');
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedData({});
  };
  const entityName = useSelector((state) => state.EntityAssignment.selectedEntityName);

  const MoveToEntity = Yup.object().shape({
    selectEntity:
      modalType === 'Un-assign' ? '' : Yup.string().required(`${entityType === 'Queue' ? 'CT' : 'EG'} is Required!`),
    EffectiveDate: Yup.string().required('Name is Required!')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      selectEntity: '',
      EffectiveDate: new Date().toLocaleDateString().split('/').reverse().join('-')
    },
    validationSchema: MoveToEntity,
    onSubmit: () => {
      if (modalType === 'Un-assign') {
        submitUnAssignedEntityAPI();
      } else {
        submitMoveEntityAPI();
      }
    }
  });
  const submitUnAssignedEntityAPI = async () => {
    try {
      const data = {
        date_assign: values.EffectiveDate,
        type: entityType === 'Queue' ? 'Q' : entityType,
        type_id: entityName.split('_')[0]
      };
      const resp = await UnAssignEntity(data);
      if (resp.data.status === 'success') {
        dispatch(UnassignEntityHistoryAction(historyId));
        handleCloseModal();
      }
    } catch (err) {
      console.log('submitMoveEntityAPI', err);
    }
  };
  const submitMoveEntityAPI = async () => {
    try {
      const data = {
        date_assign: values.EffectiveDate,
        type: entityType === 'Queue' ? 'Q' : entityType,
        type_id: entityName.split('_')[0],
        to_type_id: moveToEntityId
      };
      const resp = await MoveEntity(data);
      if (resp.data.status === 'success') {
        const historyAdd = {
          assigned_to: moveToEntityName,
          starting_date: values.EffectiveDate,
          ending_date: null,
          assigned_by: 'scheduly_admin',
          type: entityType === 'Queue' ? 'Q' : entityType,
          type_id: entityName.split('_')[0],
          time_assigned: new Date()
          // time_assigned: new Date().toLocaleDateString('en-US', options)
        };
        const historyUpdate = {
          historyId,
          prevDate: getPreviousDay(new Date())
        };

        dispatch(UpdateEntityHistoryAction({ historyAdd, historyUpdate }));
        handleCloseModal();
      }
    } catch (err) {
      console.log('submitMoveEntityAPI', err);
    }
  };
  function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
    return previous.toLocaleDateString().split('/').reverse().join('-');
  }
  const { errors, touched, values, handleSubmit, getFieldProps, setFieldValue } = formik;

  useEffect(() => {
    setFieldValue(
      'selectEntity',
      Object.keys(selectedData).length !== 0
        ? ` ${selectedData.id} ${selectedData.eg_name !== undefined ? selectedData.eg_name : selectedData.ct_name}`
        : ''
    );
    setMoveToEntityId(selectedData.id);
    setMoveToEntityName(selectedData.eg_name !== undefined ? selectedData.eg_name : selectedData.ct_name);
  }, [selectedData, setFieldValue]);

  return (
    <div>
      <Button
        ref={modalRef}
        style={{ background: 'transparent', color: 'gray', fontWeight: '400', width: '135px' }}
        startIcon={
          <MIconButton style={{ backgroundColor: 'rgba(99, 115, 129, 0.08)', width: '35px', height: '35px' }}>
            <Icon icon={modalType === 'Un-assign' ? 'mdi:folder-remove-outline' : 'bi:folder-symlink'} />
          </MIconButton>
        }
        onClick={handleOpenModal}
      >
        {modalType}
      </Button>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Card sx={style}>
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography id="modal-modal-title" variant="h5">
              {modalType}
            </Typography>
            <Icon icon={cross} onClick={handleCloseModal} color="grey" cursor="pointer" />
          </Box>
          <Divider />
          <Formik value={formik}>
            <Box>
              <Typography variant="h5" mt={2}>
                {entityType} : {entityName?.split('_')[1]}
              </Typography>
              {modalType === 'Move to' ? (
                <>
                  <FormControl sx={{ display: 'flex', mt: '20px' }}>
                    <FormLabel id="demo-radio-buttons-group-label"> Move to </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue={entityType === 'Queue' ? 'CT' : 'EG'}
                      name="radio-buttons-group"
                      row
                    >
                      <FormControlLabel
                        disabled={entityType === 'Queue'}
                        value="EG"
                        control={<Radio size="small" />}
                        label="EG"
                      />
                      <FormControlLabel
                        value="CT"
                        disabled={entityType !== 'Queue'}
                        control={<Radio size="small" />}
                        label="CT"
                      />
                    </RadioGroup>
                  </FormControl>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: '20px'
                    }}
                  >
                    <FormControl fullWidth>
                      <TextField
                        size="small"
                        label={`Select ${entityType === 'Queue' ? 'CT' : 'EG'}`}
                        variant="outlined"
                        value={values.selectEntity}
                        InputLabelProps={{ shrink: true }}
                        {...getFieldProps('selectEntity')}
                        error={Boolean(touched.selectEntity && errors.selectEntity)}
                        helperText={touched.selectEntity && errors.selectEntity}
                      />
                    </FormControl>
                    {entityType === 'Queue' ? (
                      <AddContactTypeModal setSelectedValue={setSelectedData} />
                    ) : (
                      <AddEnterPriseGroup setSelectedValue={setSelectedData} />
                    )}
                  </div>
                </>
              ) : null}

              <TextField
                sx={{ my: '30px', width: '100%' }}
                type="date"
                size="small"
                label="Effective Date"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={new Date().toLocaleDateString().split('/').reverse().join('-')}
                {...getFieldProps('EffectiveDate')}
                error={Boolean(touched.EffectiveDate && errors.EffectiveDate)}
                helperText={touched.EffectiveDate && errors.EffectiveDate}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Button sx={{ mr: 3 }} variant="contained" color="warning" onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                  Save
                </Button>
              </Box>
            </Box>
          </Formik>
        </Card>
      </Modal>
    </div>
  );
};

export default UnassignOrMove;

UnassignOrMove.propTypes = {
  entityType: PropTypes.string,
  modalType: PropTypes.string,
  historyId: PropTypes.string
};
