import * as React from 'react';
import '../HotDeals.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { Button, CardActions } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const HotDealCard = ({hotdeal}) => {
    const {title,image,price,rating,discount} = hotdeal;

    const navigate=useNavigate();
    const handleBuy=()=>{
      navigate('/temp');
    }

    return (
        <Card sx={{mx:1}}>
        <Box className='card-img-bg' sx={{display:'flex',justifyContent: 'center', alignItems: 'center'}} style={{height:'200px'}}>
            
        <CardMedia
         sx={{mx:'auto'}}
          component="img"
          style={{width:'180px',height:'150px'}}
          image={image}
          alt="green iguana"
        />

        </Box>
        
         <CardContent className='text-overlap'>
          
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          

          <Box sx={{display:'flex'}}>
          <Typography style={{textAlign:'start'}} sx={{fontWeight:700,pl:0}} variant="body1" color="text.black">
            ${price}
          </Typography>
          <Typography style={{backgroundColor:'',color:'red'}} sx={{px:1,ml:1, borderRadius:2,color:"text.black"}} variant="body1">
            -${discount} off
          </Typography>
          </Box>

          <Rating sx={{display:'flex',justifyContent:'start',alignItems:'center'}}  name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />


        <CardActions sx={{display:'flex',flexFlow:'column' ,justifyContent:'center',}} className='card-overlay'>

        <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
         
        <Button onClick={handleBuy}  color="error" variant="contained">
          Buy Now
        </Button>
       </CardActions>


        </CardContent>
      
      
    </Card>
    );
};

export default HotDealCard;