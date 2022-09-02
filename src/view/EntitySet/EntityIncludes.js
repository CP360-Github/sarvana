import { Box, Typography, Divider, Button, TextField } from '@material-ui/core';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import arrowheadLeftFill from '@iconify/icons-eva/arrowhead-left-fill';
import arrowheadRightFill from '@iconify/icons-eva/arrowhead-right-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import { useSnackbar } from 'notistack5';
import closeFill from '@iconify/icons-eva/close-fill';
import {
  GetSingleEntitySet,
  UpdateEntitySet,
  GetEnterpriseGroup,
  GetManagementUnits,
  getContactTypes
} from '../../api/EntitySet';
import EntityIncludeTable from './Components/EntityIncludeTable';
import { MIconButton } from '../../components/@material-extend';

const EntityIncludes = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [entitySetData, setEntitySetData] = useState({});
  const [entityList, setEntityList] = useState([]);
  const [includesList, setIncludesList] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [checked, setChecked] = useState([]);
  const [isDisableForward, setIsDisableForward] = useState({ checkFrom: '', checkToken: false });
  useEffect(() => {
    getSetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEnterpriseClick = () => {
    navigate('/dashboard/account-setup/entity-sets');
  };
  const { id, setType } = useParams();

  const getSetData = useCallback(async () => {
    try {
      const result = await GetSingleEntitySet(parseInt(id, 10), parseInt(setType, 10));
      if (result.status === 200) {
        setEntitySetData(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [id, setType]);

  const entityAccToSet = useCallback(
    async (setData) => {
      if (setType === '1') {
        const responseEg = await GetEnterpriseGroup();
        let egList = responseEg.data.results;
        egList = egList?.map((object) => ({ ...object, setType: 'EG' }));
        if (setData.eg_set_eg_include.length !== 0) {
          const filteredEgList = filterSetIncludes(setData.eg_set_eg_include, egList);
          setEntityList(filteredEgList.filterSet);
          setIncludesList(filteredEgList.filterIncludes);
        } else {
          setEntityList(egList);
        }
      }
      if (setType === '2') {
        let egListArr;
        let muListArr;
        let egListArrInc;
        let muListArrInc;
        const responseEg = await GetEnterpriseGroup();
        const responseMu = await GetManagementUnits();
        let egList = responseEg.data.results;
        let muList = responseMu.data.results;
        egList = egList.map((object) => ({ ...object, setType: 'EG' }));
        muList = muList.map((object) => ({ ...object, setType: 'MU' }));
        if (setData.eg_include.length !== 0) {
          const filteredEgList = filterSetIncludes(setData.eg_include, egList);
          egListArr = filteredEgList.filterSet;
          egListArrInc = filteredEgList.filterIncludes;
        } else {
          egListArr = egList;
          egListArrInc = [];
        }
        if (setData.mu_include.length !== 0) {
          const filteredEgList = filterSetIncludes(setData.mu_include, muList);
          muListArr = filteredEgList.filterSet;
          muListArrInc = filteredEgList.filterIncludes;
        } else {
          muListArr = muList;
          muListArrInc = [];
        }
        setEntityList([...egListArr, ...muListArr]);
        setIncludesList([...egListArrInc, ...muListArrInc]);
      }
      if (setType === '3') {
        let egListArr;
        let ctListArr;
        let egListArrInc;
        let ctListArrInc;
        const responseEg = await GetEnterpriseGroup();
        const responseCt = await getContactTypes();
        let egList = responseEg.data.results;
        let ctList = responseCt.data.results;
        egList = egList.map((object) => ({ ...object, setType: 'EG' }));
        ctList = ctList.map((object) => ({ ...object, setType: 'CT' }));
        if (setData.ct_set_eg_include.length !== 0) {
          const filteredEgList = filterSetIncludes(setData.ct_set_eg_include, egList);
          egListArr = filteredEgList.filterSet;
          egListArrInc = filteredEgList.filterIncludes;
        } else {
          egListArr = egList;
          egListArrInc = [];
        }
        if (setData.ct_include.length !== 0) {
          const filteredEgList = filterSetIncludes(setData.ct_include, ctList);
          ctListArr = filteredEgList.filterSet;
          ctListArrInc = filteredEgList.filterIncludes;
        } else {
          ctListArr = ctList;
          ctListArrInc = [];
        }
        setEntityList([...egListArr, ...ctListArr]);
        setIncludesList([...egListArrInc, ...ctListArrInc]);
      }
    },
    [setType]
  );
  useEffect(() => {
    if (Object.keys(entitySetData).length !== 0) {
      entityAccToSet(entitySetData);
    }
  }, [entityAccToSet, entitySetData]);

  const filterSetIncludes = (setIds, setList) => {
    const filterSet = setList?.filter((lists) => !setIds.includes(lists.id));
    const filterIncludes = setList?.filter((lists) => setIds.includes(lists.id));
    return { filterSet, filterIncludes };
  };

  const addRemoveEntitySetComplete = () => {
    setEntityList([]);
    setIncludesList((prev) => [...prev, ...entityList]);
    setChecked([0]);
  };
  const addRemoveIncludeComplete = () => {
    setIncludesList([]);
    setEntityList((prev) => [...prev, ...includesList]);
    setChecked([0]);
  };

  // eslint-disable-next-line consistent-return
  const dataProvider = () => {
    if (setType === '1') {
      const data = {
        set_name: entitySetData.set_name,
        week_first_day: entitySetData.week_first_day,
        timezone_id: entitySetData.timezone,
        eg_set_eg_include: []
      };
      includesList.forEach((val) => {
        if (val.setType === 'EG') {
          data.eg_set_eg_include.push(val.id);
        }
      });
      return data;
    }
    if (setType === '2') {
      const data = {
        set_name: entitySetData.set_name,
        week_first_day: entitySetData.week_first_day,
        timezone_id: entitySetData.timezone,
        eg_include: [],
        mu_include: []
      };
      includesList.forEach((val) => {
        if (val.setType === 'EG') {
          data.eg_include.push(val.id);
        }
        if (val.setType === 'MU') {
          data.mu_include.push(val.id);
        }
      });
      return data;
    }
    if (setType === '3') {
      const data = {
        set_name: entitySetData.set_name,
        week_first_day: entitySetData.week_first_day,
        timezone_id: entitySetData.timezone,
        ct_set_eg_include: [],
        ct_include: []
      };
      includesList.forEach((val) => {
        if (val.setType === 'EG') {
          data.ct_set_eg_include.push(val.id);
        }
        if (val.setType === 'CT') {
          data.ct_include.push(val.id);
        }
      });
      return data;
    }
  };

  const submitHandler = async () => {
    try {
      const data = dataProvider();
      const response = await UpdateEntitySet(data, parseInt(id, 10), parseInt(setType, 10));
      if (response.statusText === 'OK') {
        enqueueSnackbar('Entity Set Successfully Updated!', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      } else {
        enqueueSnackbar('Something Went Wrong!', {
          variant: 'error',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addEntitySetSingle = () => {
    const filterSet = entityList?.filter((lists) => !selectedEntity.find(({ id }) => lists.id === id));
    setEntityList(filterSet);
    setIncludesList((prev) => [...prev, ...selectedEntity]);
    setSelectedEntity([]);
    setChecked([]);
    setIsDisableForward({ checkFrom: 'entities', checkToken: false });
  };
  const addIncludeSingle = () => {
    const filterSet = includesList?.filter((lists) => selectedEntity.find(({ id }) => lists.id === id));
    const filterSetFromInclude = includesList?.filter((lists) => !selectedEntity.find(({ id }) => lists.id === id));
    setEntityList((prev) => [...prev, ...filterSet]);
    setIncludesList(filterSetFromInclude);
    setSelectedEntity([]);
    setChecked([]);
    setIsDisableForward({ checkFrom: 'includes', checkToken: false });
  };

  return (
    <div>
      <Box sx={{ m: 2, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
        <Typography style={{ cursor: 'pointer' }} id="modal-modal-title" variant="h5" onClick={handleEnterpriseClick}>
          New Sets
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <TextField
        style={{ width: '300px', marginBottom: '1.5rem', marginInline: '32px' }}
        size="small"
        label="Search"
        variant="outlined"
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '40px', marginInline: '30px' }}>
        <EntityIncludeTable
          title="Entities"
          entityList={entityList}
          setSelectedEntity={setSelectedEntity}
          selectedEntity={selectedEntity}
          setChecked={setChecked}
          checked={checked}
          setIsDisableForward={setIsDisableForward}
          searchText={searchText}
        />
        <div style={{ width: '70px', textAlign: 'center' }}>
          <Button
            type="button"
            className="buttonRevForStyle"
            variant="contained"
            size="small"
            onClick={addRemoveEntitySetComplete}
          >
            <Icon icon={arrowheadRightFill} width="20px" />
          </Button>
          <Button
            type="button"
            className="buttonRevForStyle"
            variant="contained"
            disabled={!(isDisableForward.checkFrom === 'entities' && isDisableForward.checkToken === true)}
            size="small"
            onClick={addEntitySetSingle}
          >
            <Icon icon={arrowIosForwardFill} width="20px" />
          </Button>
          <Button
            type="button"
            className="buttonRevForStyle"
            disabled={!(isDisableForward.checkFrom === 'includes' && isDisableForward.checkToken === true)}
            variant="contained"
            size="small"
            onClick={addIncludeSingle}
          >
            <Icon icon={arrowIosBackFill} width="20px" />
          </Button>

          <Button
            type="button"
            className="buttonRevForStyle"
            variant="contained"
            size="small"
            onClick={addRemoveIncludeComplete}
          >
            <Icon icon={arrowheadLeftFill} width="20px" />
          </Button>
        </div>
        <EntityIncludeTable
          title="Includes"
          entityList={includesList}
          setSelectedEntity={setSelectedEntity}
          selectedEntity={selectedEntity}
          setChecked={setChecked}
          checked={checked}
          setIsDisableForward={setIsDisableForward}
          searchText={searchText}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'end', marginInline: '20px', marginBlock: '20px' }}>
        <Button type="submit" variant="contained" color="primary" onClick={submitHandler}>
          Save
        </Button>
      </Box>
    </div>
  );
};

export default EntityIncludes;
