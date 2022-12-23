import React from 'react';
import '../../../home/allproducts/AllProduct.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Rating } from '@mui/material';
import { Box} from '@mui/system';
import { useNavigate } from 'react-router-dom';

const SimilarProductCard = ({product}) => {
    const {_id,name,image,price,star,starCount}=product;

  const navigate= useNavigate();
  
  const handlebuyNow=(id)=>{
    const url=`/buyproduct/${id}`
    navigate(url);
   
  }

  const handleDetails=(id)=>{
    navigate(`/productdetails/${id}`)
  }
  
  // const url='/productDetails';
  
    return (
        <Grid item xs={6} sm={4} md={4} lg={3}>
        <Card sx={{  }}>

        <img src={image} alt="" style={{width:'80%',height:'200px'}} />
        <CardContent>
          <Typography  className="ellipses" title={name} gutterBottom variant="body1" component="div">
              {name}
          </Typography>

          <Typography  sx={{color: 'text.secondary',textAlign: 'left'}} gutterBottom variant="h6" component="div">
           <span style={{fontWeight: 'bold',color:'black'}}>${price}</span> /piece 
          </Typography>
          

    
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center'}}>
        <Rating sx={{}}  name="half-rating-read" defaultValue={star} precision={0.5} readOnly />

        <Typography  sx={{color: 'text.secondary',ml:1}} variant="h6" component="div">
           ({starCount})
        </Typography>
        
        </Box> 
        </CardContent>

        
        <CardActions sx={{ml:1}}>

          
          <Button onClick={()=>handlebuyNow(_id)}  size="small">Buy Now</Button>
          
          <Button onClick={()=>handleDetails(_id)}  size="small">See Details</Button>
        </CardActions>
        </Card>
        </Grid>
    );
};

export default SimilarProductCard;