import { CircularProgress } from '@mui/material';
import React from 'react';

const Temp = () => {
    return (
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'80vh'}}>
            
            <h2>Working on site. comming soon...</h2>
            <CircularProgress color="secondary" sx={{ml:1}}/>
        
            
        </div>
    );
};

export default Temp;