import { Box, Button, CircularProgress, Modal, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';


const style = {

    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid cyan',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column'
  };

const EmptyCart = ({open,handleClose}) => {
    return (
        <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >


        {/* <CircularProgress/> */}

          <Typography id="modal-modal-title" variant="h6" component="h2" color='error'>
            No Product in Cart !!
          </Typography>
          <Link style={{textDecoration:'none'}} to='/'>
          <Button sx={{mt:2}} variant='contained' onClick={handleClose}>Buy Now</Button>
          </Link>
        </Box>
      </Modal>
    );
};

export default EmptyCart;