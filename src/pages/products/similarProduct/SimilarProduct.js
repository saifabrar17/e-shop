import { Box, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import useCategory from '../../../hooks/useCategory';
import ProductCard from '../productCard/ProductCard';

const SimilarProduct = ({category}) => {
    const [products]= useCategory(category);

   

    return (
        <Box>
        
            <Typography  sx={{mt:2,textTransform:'capitalize',textAlign:'start',color: 'info.main',fontWeight:'bold'}} variant="h5" component="div">
                Similar {category}
            </Typography>
            <Divider sx={{mt:2,mb:4,bgcolor: 'text.secondary'}}></Divider>


          <Grid container spacing={{ xs: 2, md: 3 }} sx={{py:3}} columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}>
            {products.map(product=><ProductCard product={product} key={Math.random()}></ProductCard>)}
          </Grid>
        </Box>
    );
};

export default SimilarProduct;