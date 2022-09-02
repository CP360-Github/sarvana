// hooks
import useAuth from '../hooks/useAuth';
//
import { MAvatar } from './@material-extend';
import createAvatar from '../utils/createAvatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();

  return (
    <MAvatar
      src={user.photoURL}
      alt={`${user?.first_name} ${user?.last_name}`}
      color={user.photoURL ? 'default' : createAvatar(user.username).color}
      {...other}
    >
      {createAvatar(user.username).name}
    </MAvatar>
  );
}
