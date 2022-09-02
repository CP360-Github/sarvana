import { Box, Card, Divider, Modal, TextField, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import cross from '@iconify/icons-eva/close-outline';
import moreHorizontalFill from '@iconify/icons-eva/more-horizontal-fill';
import { useDispatch } from 'react-redux';
import { getAcdData } from '../../api/ContactTypeApi';
import { MIconButton } from '../../components/@material-extend';
import { setAcdValue, setCopiedAgent, setEmailLang, setMuValue } from '../../ReduxCreated/actions/AgenDefinition';
import { getCopyFromAgents, getEmailLanguage, getMuData } from '../../api/AgentDefinitionApi';

export function CopyAcdData() {
  const style1 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '1px solid grey',
    boxShadow: 24,
    p: 4
  };
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const [openCopyFormData, setOpenCopyFormData] = useState(false);
  const [search, setSearch] = useState('');
  const [searchedData, setSearchedData] = useState();

  const handleClick = () => {
    setOpenCopyFormData(true);
    //  setCopyFromEg(true);
  };
  const handleClose = () => {
    setOpenCopyFormData(false);
  };

  const handleSelected = (e) => {
    dispatch(setAcdValue(e));
    setOpenCopyFormData(false);
  };

  const getAcdDetails = useCallback(async (search) => {
    await getAcdData(search)
      .then((response) => setSearchedData(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getAcdDetails(search);
  }, [search, getAcdDetails]);

  const filterData = (searchedData, search) =>
    searchedData?.filter((el) => el.param_name?.toLowerCase().indexOf(search.toLowerCase()) !== -1);

  return (
    <>
      <>
        <MIconButton ref={menuRef} size="large" onClick={handleClick}>
          <Icon icon={moreHorizontalFill} width={20} height={20} />
        </MIconButton>
      </>
      <>
        <Modal open={openCopyFormData} onClose={handleClose}>
          <Card sx={style1}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography id="modal-modal-title" variant="h5">
                Acd Values
              </Typography>
              <Icon icon={cross} onClick={handleClose} color="grey" cursor="pointer" />
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Search"
                variant="outlined"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <Box>
                <Box
                  sx={{
                    mt: 1,
                    pt: 1,
                    pb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ ml: 3 }}>ID</Box>
                  <Box sx={{ mr: 3 }}>Name</Box>
                </Box>
                <Box sx={{ overflow: 'scroll', height: 200 }}>
                  {filterData(searchedData, search)?.map((e) => (
                    <Box
                      key={e?.id}
                      sx={{ cursor: 'pointer', pt: 1, pb: 1, display: 'flex', justifyContent: 'space-between' }}
                      onClick={() => handleSelected(e)}
                    >
                      <Box sx={{ ml: 3 }}>{e?.id}</Box>
                      <Box sx={{ mr: 3 }}>{e?.param_name}</Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Card>
        </Modal>
      </>
    </>
  );
}

export function CopyMuData() {
  const style1 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '1px solid grey',
    boxShadow: 24,
    p: 4
  };
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const [openCopyFormData, setOpenCopyFormData] = useState(false);
  const [search, setSearch] = useState('');
  const [searchedData, setSearchedData] = useState();

  const handleClick = () => {
    setOpenCopyFormData(true);
    //  setCopyFromEg(true);
  };
  const handleClose = () => {
    setOpenCopyFormData(false);
  };

  const handleSelected = (e) => {
    dispatch(setMuValue(e));
    setOpenCopyFormData(false);
  };

  const getMuDetails = useCallback(async (search) => {
    await getMuData(search)
      .then((response) => setSearchedData(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getMuDetails(search);
  }, [search, getMuDetails]);

  const filterData = (searchedData, search) =>
    searchedData?.filter((el) => el.name?.toLowerCase().indexOf(search.toLowerCase()) !== -1);
  return (
    <>
      <>
        <MIconButton ref={menuRef} size="large" onClick={handleClick}>
          <Icon icon={moreHorizontalFill} width={20} height={20} />
        </MIconButton>
      </>
      <>
        <Modal open={openCopyFormData} onClose={handleClose}>
          <Card sx={style1}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography id="modal-modal-title" variant="h5">
                Mu Values
              </Typography>
              <Icon icon={cross} onClick={handleClose} color="grey" cursor="pointer" />
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Search"
                variant="outlined"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <Box>
                <Box
                  sx={{
                    mt: 1,
                    pt: 1,
                    pb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ ml: 3 }}>ID</Box>
                  <Box sx={{ mr: 3 }}>Name</Box>
                </Box>
                <Box sx={{ overflow: 'scroll', height: 200 }}>
                  {filterData(searchedData, search)?.map((e) => (
                    <Box
                      key={e?.id}
                      sx={{ cursor: 'pointer', pt: 1, pb: 1, display: 'flex', justifyContent: 'space-between' }}
                      onClick={() => handleSelected(e)}
                    >
                      <Box sx={{ ml: 3 }}>{e?.id}</Box>
                      <Box sx={{ mr: 3 }}>{e?.name}</Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Card>
        </Modal>
      </>
    </>
  );
}

export function CopyEmailData() {
  const style1 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '1px solid grey',
    boxShadow: 24,
    p: 4
  };
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const [openCopyFormData, setOpenCopyFormData] = useState(false);
  const [search, setSearch] = useState('');
  const [searchedData, setSearchedData] = useState();

  const handleClick = () => {
    setOpenCopyFormData(true);
    //  setCopyFromEg(true);
  };
  const handleClose = () => {
    setOpenCopyFormData(false);
  };

  const handleSelected = (e) => {
    dispatch(setEmailLang(e));
    setOpenCopyFormData(false);
  };

  const fetchEmailLanguage = useCallback(async (search) => {
    await getEmailLanguage(search)
      .then((response) => setSearchedData(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetchEmailLanguage(search);
  }, [search, fetchEmailLanguage]);

  const filterData = (searchedData, search) =>
    searchedData?.filter((el) => el.name?.toLowerCase().indexOf(search.toLowerCase()) !== -1);

  return (
    <>
      <>
        <MIconButton ref={menuRef} size="large" onClick={handleClick}>
          <Icon icon={moreHorizontalFill} width={20} height={20} />
        </MIconButton>
      </>
      <>
        <Modal open={openCopyFormData} onClose={handleClose}>
          <Card sx={style1}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography id="modal-modal-title" variant="h5">
                Email language
              </Typography>
              <Icon icon={cross} onClick={handleClose} color="grey" cursor="pointer" />
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Search"
                variant="outlined"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <Box>
                <Box
                  sx={{
                    mt: 1,
                    pt: 1,
                    pb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ ml: 3 }}>ID</Box>
                  <Box sx={{ mr: 3 }}>Name</Box>
                </Box>
                <Box sx={{ overflow: 'scroll', height: 200 }}>
                  {filterData(searchedData, search)?.map((e) => (
                    <Box
                      key={e?.id}
                      sx={{ cursor: 'pointer', pt: 1, pb: 1, display: 'flex', justifyContent: 'space-between' }}
                      onClick={() => handleSelected(e)}
                    >
                      <Box sx={{ ml: 3 }}>{e?.id}</Box>
                      <Box sx={{ mr: 3 }}>{e?.name}</Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Card>
        </Modal>
      </>
    </>
  );
}

export function CopyFromAgentData() {
  const style1 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '1px solid grey',
    boxShadow: 24,
    p: 4
  };
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const [openCopyFormData, setOpenCopyFormData] = useState(false);
  const [search, setSearch] = useState('');
  const [searchedData, setSearchedData] = useState();

  const handleClick = () => {
    setOpenCopyFormData(true);
    //  setCopyFromEg(true);
  };
  const handleClose = () => {
    setOpenCopyFormData(false);
  };

  const handleSelected = (e) => {
    dispatch(setCopiedAgent(e));
    setOpenCopyFormData(false);
  };

  const fetchCopyFromAgents = useCallback(async (search) => {
    await getCopyFromAgents(search)
      .then((response) => setSearchedData(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetchCopyFromAgents(search);
  }, [search, fetchCopyFromAgents]);

  const filterData = (searchedData, search) =>
    searchedData?.filter((el) => el.name?.toLowerCase().indexOf(search.toLowerCase()) !== -1);

  return (
    <>
      <>
        <MIconButton ref={menuRef} size="large" onClick={handleClick}>
          <Icon icon={moreHorizontalFill} width={20} height={20} />
        </MIconButton>
      </>
      <>
        <Modal open={openCopyFormData} onClose={handleClose}>
          <Card sx={style1}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography id="modal-modal-title" variant="h5">
                Agent Data
              </Typography>
              <Icon icon={cross} onClick={handleClose} color="grey" cursor="pointer" />
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Search"
                variant="outlined"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <Box>
                <Box
                  sx={{
                    mt: 1,
                    pt: 1,
                    pb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ ml: 3 }}>ID</Box>
                  <Box sx={{ mr: 3 }}>Name</Box>
                </Box>
                <Box sx={{ overflow: 'scroll', height: 200 }}>
                  {filterData(searchedData, search)?.map((e) => (
                    <Box
                      key={e?.id}
                      sx={{ cursor: 'pointer', pt: 1, pb: 1, display: 'flex', justifyContent: 'space-between' }}
                      onClick={() => handleSelected(e)}
                    >
                      <Box sx={{ ml: 3 }}>{e?.id}</Box>
                      <Box sx={{ mr: 3 }}>
                        {e?.first_name} {e?.last_name}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Card>
        </Modal>
      </>
    </>
  );
}
