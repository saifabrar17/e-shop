import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { CircularProgress, Typography } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    height:200,
    bgcolor: 'rgba(0, 0, 0, 0.678)',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
    display: 'flex', 
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'

  };

const ProgressModal = ({open,handleClose}) => {
    
    
    return (
    <div>
    
    <Modal
    keepMounted
    open={open}
    onClose={handleClose}
    aria-labelledby="keep-mounted-modal-title"
    aria-describedby="keep-mounted-modal-description"
    >
    <Box sx={style}>
        
        <CircularProgress color="error" />
        <Typography sx={{mt:2,color:'white'}}>Uploading...</Typography>

    </Box>
    </Modal>
    </div>
    );
};

export default ProgressModal;