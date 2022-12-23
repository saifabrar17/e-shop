import React, { useState } from 'react';
import '../Category.css';
import { CardActionArea, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Navigate } from 'react-router-dom';


const CategoryCard = ({category}) => {
    const {name,image}=category;
    const [success,setSuccess]=useState(false);
    
    const handleCategory=()=>{
      
      setSuccess(true);
      

    }


    return (
      <>
      {success? <Navigate to={`/products/${name}`}  state={{someOtherProp:{name}}}></Navigate>:

      <Grid item xs={2} sm={4} md={4}>
      <Card sx={{  }}>
      <CardActionArea onClick={handleCategory}>
        
        <img className='category-content' src={image} alt="Category" />
        <CardContent>
          <Typography sx={{textTransform:'capitalize',fontSize:{xs:'4vw', md:'2vw',lg:'1.8vw'}}} gutterBottom variant="h5" component="div">
           {name}
          </Typography>

        </CardContent>
        </CardActionArea>
  
      </Card>          
      </Grid>
      }
      </>
    );
};

export default CategoryCard;