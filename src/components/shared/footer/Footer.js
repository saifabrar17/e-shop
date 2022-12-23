import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Box } from '@mui/system';
import React from 'react';
import QuickLink from './quickLink/QuickLink';
import ShopNow from './shopNow/ShopNow';
import { Link } from 'react-router-dom';

const Footer = () => {

    return (
        <Box sx={{mt:3, p:5,backgroundColor:'cornsilk'}}>
            <Container>
             
            <Box sx={{ flexGrow: 1 }}>
             <Grid container spacing={2}>
            
            <Grid item xs={12} md={4}>
                <QuickLink></QuickLink>
                
            
            </Grid>

            <Grid item xs={12} md={4}>
                <ShopNow></ShopNow>
            
            </Grid>

            <Grid item xs={12} md={4}>
            <Typography sx={{textAlign:'start',fontWeight:'bold',color:'crimson'}} variant="h6" gutterBottom component="div">
            Email Subscription:
            </Typography>
            <TextField sx={{color:'navy',fontWeight:'bold',mt:2}} fullWidth label="Enter Your Email" id="fullWidth" />
            <Button sx={{float:"left",mt:2}} variant="contained">Submit</Button>

            
            </Grid>

        </Grid>
        </Box>

        <hr />
        <Typography variant="subtitle1" gutterBottom component="div">
                &copy; 2021 All Right Served By e-Shop Ltd.
        </Typography>
        
        <Box>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FacebookIcon color="primary" sx={{fontSize:40}}/></a>

            <InstagramIcon color="error" sx={{fontSize:40}}/>

            {/* <LinkedInIcon color="primary" sx={{fontSize:40}}/> */}
            <a href="https://api.whatsapp.com/message/" target="_blank" rel="noopener noreferrer"><WhatsAppIcon color="success" sx={{fontSize:40}}/></a>


        </Box>


        </Container>

        </Box>

            
    );
};

export default Footer;