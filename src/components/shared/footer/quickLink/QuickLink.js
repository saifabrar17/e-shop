import React from 'react';
import '../Footer.css';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

import AuthModal from '../../../authentication/AuthModal';
import useAuth from '../../../../hooks/useAuth';

const QuickLink = () => {
     const {user,userLogOut}= useAuth();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    


    return (
        <>
        <Typography sx={{textAlign:'start',fontWeight:'bold'}} variant="h6" gutterBottom component="div">
        Quick Link:
        </Typography>
        <Box className="quick-link" sx={{display:'flex',flexDirection:'column',alignItems:'start'}}>
            
            <Link to="/">Home</Link>
            <Link to="/">Explore</Link>
            <Link to="/">About</Link>
            <Link to="/">Contract Us</Link>

            
            <Box sx={{my:4}}>
            {!user.email? 
            <Button onClick={handleOpen} variant="contained" color="error">
              Login</Button>
            :

             <Button onClick={userLogOut} variant="contained" color="error">LogOut</Button> 
            }

            <AuthModal open={open} handleClose={handleClose}></AuthModal>
            </Box>
        </Box>

        



        </>
    );
};

export default QuickLink;