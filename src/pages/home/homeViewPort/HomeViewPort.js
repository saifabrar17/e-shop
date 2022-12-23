import React from 'react';
import { Divider, Grid,Paper, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import ListIcon from '@mui/icons-material/List';
import Homebanner from '../homebanner/Homebanner';
import QuickLink from '../quickLink/QuickLink';
import CatagoryList from './catagoryList/CatagoryList';


const categoriList=[
    
    
    {
        name:"fashion",
        
    },
    {
        name:"laptop",
        
    },

    {
        name:"phone and parts",
        
    },

    {
        name:"jewelry & watch",
       
    },

    {
        name:"bag & bagpack",
        
    },

    {
        name:"accessories",
       
    },

    {
        name:"beauty & health",
        
    }


]

const HomeViewPort = () => {
    return (
        <Box sx={{ flexGrow: 1 }} style={{minHeight:'100vh',backgroundColor:'#f5f5f5'}}>
        
        <Grid container spacing={1}>
        
            <Grid item  sx={{display:{xs:'none',sm:'none',md:'flex',lg:'flex'}}} md={2.5} lg={2}>
            <Paper sx={{pr:2}}>

                <Toolbar style={{paddingLeft:'16px'}}  sx={{fontWeight:'bold',fontSize:'20px',color:'green'}}>
                <ListIcon sx={{mr:2,fontSize:'25px'}}/>
                Catagories
                </Toolbar>

                <Divider />

                {categoriList.map((listItem,index)=><CatagoryList listItem={listItem} index={index} key={Math.random()}></CatagoryList>)}
                
            </Paper>
            </Grid> 
            
            
            <Grid item xs={12} md={9.5} lg={10}>
                <Homebanner></Homebanner>
                
            
            </Grid>
            
            
        </Grid>
        </Box>
    );
};

export default HomeViewPort;