import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';

const ShopNow = () => {
    return (
        <>
        <Typography sx={{textAlign:'start',fontWeight:'bold'}} variant="h6" gutterBottom component="div">
        Shop Today:
        </Typography>
        <Box className="quick-link" sx={{display:'flex',flexDirection:'column',alignItems:'start'}}>
            
            <Link to="/">New Exclusive</Link>
            <Link to="/">Top Rated</Link>
            <Link to="/">Sell Offer</Link>
            
        </Box>
        </>
    );
};

export default ShopNow;