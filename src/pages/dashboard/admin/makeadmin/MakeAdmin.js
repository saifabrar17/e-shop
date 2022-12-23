import React, { useState } from 'react';
import { Box,Typography} from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const MakeAdmin = () => {

  const [email,setEmail]=useState('');

  console.log(email);

  const handleAdminEmail=(e)=>{

    const adminEmail= document.getElementById('inputAdminId').value;
    setEmail(adminEmail);
    const user={email:adminEmail};
        
        fetch('https://mysterious-basin-77883.herokuapp.com/users/admin',{
            method:'PUT',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(user)
        }).then(result=>{
          document.getElementById('inputAdminId').value='';
                //setSuccess(true);
                 console.log(result);
                 

             })

    

    console.log(email);
    e.preventDefault();

  }



    return (
        <Box sx={{ '& > :not(style)': { m:1 },minHeight:'50vh',bgcolor:'#F9F9F9',borderRadius:'12px', display:'flex',flexFlow:'column',alignItems: 'center',justifyContent:'center'  }} > 
           <Box>    
          <Typography sx={{textAlign:'start',fontWeight:'bold'}} variant="subtitle1" gutterBottom component="div">Enter Admin Email</Typography>
          <Paper
          component="form"
          sx={{ p: '8px 4px', display: 'flex', alignItems: 'center', width: 400,mx:'auto' }}
        >
          
          <IconButton sx={{ p: '10px' }} aria-label="menu">
            <EmailIcon/>
          </IconButton>
          
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            id='inputAdminId'
            placeholder="abc@example.com"
            inputProps={{ 'aria-label': 'email-field' }}
            
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton  onClick={(e)=>handleAdminEmail(e)} color="primary" sx={{ p: '10px' }} aria-label="click">
            <ArrowCircleRightIcon />
          </IconButton>
          
          </Paper>
          </Box>  
      </Box>
    );
};

export default MakeAdmin;