import { Icon } from '@iconify/react';
import { PropTypes } from 'prop-types';
import edit from '@iconify/icons-eva/edit-2-fill';
import { useDispatch } from 'react-redux';
import { EditData, DataEdit } from '../ReduxCreated/actions/EnterPriseGroup';
import MIconButton from '../components/@material-extend/MIconButton';

export const EditIcon = ({ e }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    console.log(e, 'eeee');
    dispatch(DataEdit(e));
    dispatch(EditData(true));
  };
  return (
    <>
      <MIconButton onClick={handleClick} size="large">
        <Icon icon={edit} width={20} height={20} />
      </MIconButton>
    </>
  );
};

EditIcon.propTypes = {
  e: PropTypes.object
};
