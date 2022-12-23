import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

const ProductFeatures = ({feature}) => {

    return (
        <Box sx={{display:'flex'}}>

        <Grid container spacing={2}>
        <Grid item xs={4}>
            <Typography  sx={{fontWeight: '600'}} variant="body" component="div">
                    {feature?.description}
            </Typography>
            
        </Grid>
        <Grid item xs={6}>
            <Typography  sx={{}} variant="body" component="div">
                    {feature?.value}
            </Typography>
            
        </Grid>

        </Grid>

            
    
            
            
        </Box>
    );
};

export default ProductFeatures;