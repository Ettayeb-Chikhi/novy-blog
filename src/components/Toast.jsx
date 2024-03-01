import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Toast = ({ message, isError, open, handleClose }) => {
    return (
        <Snackbar open={open}
        autoHideDuration={5000} onClose={handleClose}
        anchorOrigin={ {vertical: 'top', horizontal: 'right'} }>
            <Alert
                onClose={handleClose}
                severity= {isError ? "error" : "success"}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}

export default Toast