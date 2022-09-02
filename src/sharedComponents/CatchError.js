import React from 'react';
import { useSnackbar, SnackbarProvider } from 'notistack5';
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { MIconButton } from '../components/@material-extend';

function CatchError({ errorMsg }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return enqueueSnackbar(errorMsg, {
    variant: 'error',
    action: (key) => (
      <MIconButton size="small" onClick={() => closeSnackbar(key)}>
        <Icon icon={closeFill} />
      </MIconButton>
    )
  });
}
export function NotificationCatch() {
  return (
    <SnackbarProvider>
      <CatchError />
    </SnackbarProvider>
  );
}
