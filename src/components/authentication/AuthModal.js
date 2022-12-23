import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material';
import AuthTab from './authtab/AuthTab';


const style = {
    borderRadius:'12px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    background: '#F9F9F9',
    // bgcolor: 'background.paper',
    boxShadow: '0px 13px 61px rgba(169, 169, 169, 0.366013)',
    border: '2px solid #E6E8EC',
    p: 4,
    
  };

const AuthModal = ({open,handleClose,location}) => { 
  // console.log(state);

  return (
      
      <Modal 
       
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        // onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>

            <IconButton onClick={handleClose} sx={{float:'right'}} aria-label="delete">
                <ClearIcon sx={{color:'crimson'}}/>
            </IconButton>
          
            <AuthTab location={location} handleClose={handleClose}></AuthTab>
          </Box>
        </Fade>
      </Modal>
    
  );
};

export default AuthModal;