import {
  Box,
  Card,
  Typography,
  Divider,
  TableRow,
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableBody,
  Button
} from '@material-ui/core';
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack5';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { MIconButton } from '../../../components/@material-extend';
import { DeleteSkill, MuViewSkills } from '../../../api/agent/AgentSkills';
import Scrollbar from '../../../components/Scrollbar';

const ViewSkills = () => {
  const navigate = useNavigate();

  const [viewSkillData, setViewSkill] = useState([]);

  const { id } = useParams();

  const getSkills = async () => {
    try {
      await MuViewSkills(id).then((response) => setViewSkill(response.data));
    } catch (error) {
      console.log(error);
    }
  };
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [deletee, setDelete] = useState(false);

  const handleDelete = async (skillid, dateid) => {
    try {
      await DeleteSkill(id, skillid, dateid);
      setDelete(!deletee);
      enqueueSnackbar('Skill Deleted Successfully!', {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    } catch (error) {
      enqueueSnackbar('Skill Not Deleted!', {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    }
  };

  useEffect(() => {
    getSkills();
    // eslint-disable-next-line
  }, [deletee]);
  return (
    <>
      <Card>
        <Box sx={{ m: 2, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
          <Typography
            style={{ cursor: 'pointer' }}
            id="modal-modal-title"
            variant="h5"
            onClick={() => {
              navigate(`/dashboard/agents/agent-skills/`);
            }}
          >
            Agent Skills
          </Typography>
          <Typography id="modal-modal-title" variant="h5">
            / View Skills
          </Typography>
        </Box>
        <Typography sx={{ m: 2, display: 'flex', alignItems: 'center' }} id="modal-modal-title" variant="h6">
          {viewSkillData?.map((d, index) => (index === 0 ? d?.agent?.id + d?.agent?.username : null))}
        </Typography>

        <Divider sx={{ mb: 2 }} />
        <Scrollbar>
          <TableContainer sx={{ Width: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Skills</TableCell>
                  <TableCell align="center">Starting Date</TableCell>
                  <TableCell align="center">Ending Date</TableCell>
                  <TableCell align="center">Reserve</TableCell>
                  <TableCell align="center">Level</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>

              <TableBody>
                {viewSkillData?.map((data, i) => (
                  <TableRow key={i}>
                    <TableCell align="center">{data?.skill?.skill_name}</TableCell>
                    <TableCell align="center">{data?.date_range?.start_date}</TableCell>
                    <TableCell align="center">{data?.date_range?.end_date}</TableCell>
                    <TableCell align="center">{data?.reserve.toString() === 'true' ? 'yes' : '-'}</TableCell>
                    <TableCell align="center">{data?.level}</TableCell>
                    <TableCell align="center">
                      <Button onClick={() => handleDelete(data?.skill?.id, data?.date_range?.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
    </>
  );
};

export default ViewSkills;
