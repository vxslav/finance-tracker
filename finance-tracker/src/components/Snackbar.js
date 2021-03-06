import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackbar } from '../redux/actions/snackbarActions';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const snackbar =  useSelector(state => state.snackbar);
  const isOpen = snackbar.snackbarOpen;
  const type = snackbar.snackbarType;
  const msg = snackbar.snackbarMessage;
  const vertical = snackbar.vertical;
  const horizontal = snackbar.horizontal;
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setSnackbar(false));
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar 
        open={isOpen}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={6000}  
        onClose={handleClose}>
        <Alert 
            onClose={handleClose} 
            severity={type} 
            sx={{ width: '100%' }}>
            {msg}
        </Alert>
      </Snackbar>
    </Stack>
  );
}