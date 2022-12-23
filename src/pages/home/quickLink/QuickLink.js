import React from 'react';
import '../Home.css';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import {Container, Grid } from '@mui/material';
import StarsIcon from '@mui/icons-material/Stars';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Paper from '@mui/material/Paper';
import EuroIcon from '@mui/icons-material/Euro';
import RedeemIcon from '@mui/icons-material/Redeem';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  fontWeight:'bold',
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  borderRadius: '20px',
  color: theme.palette.text.secondary,
}));

const QuickLink = () => {

  
   
    return (
    <Container sx={{mt:5}}>

      <Box  sx={{ flexGrow: 1,mb:5 }}>
      <Grid container spacing={2}>
        
        <Grid item xs={6} md={3} lg={3}>
        
        <Item className='quick'><StarsIcon sx={{marginRight:2,color: 'info.main'}}/> Top Rated</Item>
        </Grid>
        
        <Grid item xs={6} md={3} lg={3}>
        <Item className='quick'><EuroIcon sx={{marginRight:2,  color: 'success.main'}}/> Discount</Item>
        </Grid> 

        <Grid item xs={6} md={3} lg={3}>
        <Item className='quick'><LocalShippingIcon sx={{marginRight:2,color: 'error.main' }}/> Free Shipping</Item>
          
        </Grid>

        <Grid item xs={6} md={3} lg={3}>
        <Item className='quick'><RedeemIcon sx={{marginRight:2,color: 'warning.main'}}/> Winter Exclusive</Item>
          
        </Grid>
      </Grid>
    </Box>
    <hr />
          
   </Container>
    );
};

export default QuickLink;