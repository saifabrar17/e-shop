import '../Products.css';
import { Button, Container, CssBaseline, Divider,  Grid, IconButton, Paper, Rating, Typography } from '@mui/material';
import { Box} from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { addTodb } from '../../../utilities/LocalStorage';
import SnackbarAlert from '../../../components/shared/snackbar/SnackbarAlert';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import { styled } from '@mui/material/styles';
import ProductFeatures from './productFeatures/ProductFeatures';
import SimilarProduct from '../similarProduct/SimilarProduct';
import Footer from '../../../components/shared/footer/Footer';



const CustomCartButton= styled(Button)(({ theme }) => ({
    color:'black',
    borderRadius: 16,
    backgroundColor: 'yellow',
    '&:hover': {
      backgroundColor: '#ffd814',
    },
  }));

const  CustomBuyButton= styled(Button)(({ theme }) => ({
    color:'black',
    borderRadius: 16,
    backgroundColor: '#ffa41c',
    '&:hover': {
      backgroundColor: '#e47911',
      
    },
  }));


const ProductDetails = () => {

    const navigate=useNavigate();

    const [product,setProduct]=useState([]);
    const [quentity,setQuentity]=useState([1]);
    // const [stocks,setStocks]=useState([]);
    const [open, setOpen] = React.useState(false);

   const {id}= useParams();

   const {sellType}=useLocation()?.state;
  // console.log(sellType);

   let url;
   
   if(sellType==='regular'){
    url=`https://mysterious-basin-77883.herokuapp.com/products/${id}`;

   }else if(sellType==='flashsell'){
    url=`https://mysterious-basin-77883.herokuapp.com/flashsell/${id}`;

   }

   useEffect(()=>{
       fetch(url)
       .then(res=>res.json())
       .then(data=>setProduct(data))

   },[url]);
   
  

    
    const handleAdd=()=>{
        let add= parseInt(quentity)+1;
        setQuentity(add);
        
    }
    const handleMinus=()=>{
        let minus=parseInt(quentity)-1;
        if(minus>=1){
            setQuentity(minus);
        }
        

    }

    

    const handleBuyNow=()=>{
        const url=`/productorder/${id}`
        navigate(url)

        addTodb(id,quentity);

    }

    const addtoCart=()=>{
        addTodb(id,quentity);
        setOpen(true);

        // setTimeout(()=>{
        //     navigate('/');

        // },1000);
       // navigate('/');
    }

    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    
    
    // // const handleStock=()=>{
    //     let stock=product.stock;
    //     console.log(stock);
    //     setStocks(stock-quentity);

    // // }
   
   
  // console.log(product);
   
    return (
        <>
        <React.Fragment>
        <CssBaseline />
        <Container>
        
        
        {product.length !==0 ?
        <>
        <Box sx={{ mt:6 }} style={{minHeight:'100vh',maxHeight:'auto'}}>



         
            <Grid container spacing={2}>

                <Grid item  xs={12} sm={6} md={3.5} lg={3.5} className="static-section">
                    <img src={product?.image} alt="" style={{width:'90%'}}  />
                    
                </Grid>
                <Grid item sx={{textAlign:'start',overflowY:{sm:'scroll'},height:{sm:'100vh',xs:'auto'}}} xs={12} sm={6} md={5.5} lg={5.5} className="scroll-section">
                    
                    <Typography sx={{fontWeight:'500'}} variant="h6" component="div" gutterBottom>
                    {product?.name}
                    </Typography>

                    <Box sx={{display:'flex',justifyContent:'start',alignItems:'center'}}>
                        <Rating sx={{}}  name="half-rating-read" value={product?.star} precision={0.5} readOnly />

                        <Typography  sx={{ml:1}} variant="body1" component="div">
                        {product?.star}
                        </Typography>

                        <Typography  sx={{color: 'text.primary',ml:2}} variant="body1" component="div">
                        {product?.starCount} Reviews
                        </Typography>

                    </Box>
                    
                    
                    <Typography  sx={{color:'text.primary',mt:.5}} variant="subtitle1" component="div">
                     <span className='squre-sec'>Popular Choice's</span> in Traditional {product?.category} by {product?.seller}
                    </Typography>

                    



                    <Divider sx={{mb:2,mt:1,bgcolor: 'text.secondary'}}/>

                    <Box sx={{display:{md:'flex'},alignItems:'start',justifyContent:'space-between'}} >

                        <Typography  sx={{fontWeight: 'bold',color:'crimson'}} variant="h6" component="div" gutterBottom>
                            USD ${product?.price}
                        </Typography>

                        <Typography  sx={{display:'flex',alignItems:'center',fontWeight: 'bold',color:'info.main'}} variant="body1" component="div">
                        <LocalShippingIcon color="error" sx={{mr:1}}/>
                          Est. Shipping: ${product?.shipping}
                        </Typography>
                       
                        

                        <Typography  sx={{fontWeight: 'bold',display:'flex',alignItems:'center',fontStyle: 'oblique'}} variant="body2" component="div" gutterBottom>
                        
                        <StoreMallDirectoryIcon color='warning' sx={{mr:.5}}/>
                        
                        
                         From  {product?.seller} Store
                        </Typography>
                        

                       
                    </Box>

                    <Box sx={{mt:3}}>
                       <Typography  sx={{fontWeight: '500',mb:1,borderBottom:'1px solid black',display:'inline-block'}} variant="h6" component="div">
                          Item Specification
                        </Typography>
                        

                        {product?.features.map(feature=><ProductFeatures feature={feature} key={Math.random()}></ProductFeatures>)}

                    </Box>

                    <Box sx={{mt:3}}>

                    <Typography  sx={{fontWeight: '500',mb:1,borderBottom:'1px solid black',display:'inline-block'}} variant="h6" component="div">
                        About This Item
                    </Typography>

                    <Typography  sx={{textAlign:'justify'}} variant="body1" component="div">
                        {product?.description ? product?.description : 
                        <>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex quibusdam, labore tenetur adipisci minima dolorem amet cumque necessitatibus maiores enim harum repudiandae molestias modi temporibus a repellendus, pariatur laborum nobis eius id non quasi! Perferendis beatae ex debitis tempore ipsa eius officia. Eum unde nisi odit dolorum maiores sed dignissimos! Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quod vitae accusantium odio. Delectus odit dignissimos, aut quod esse nesciunt animi quasi rerum hic neque?</>

                        }                   
                    
                   
                   </Typography>
                    </Box>
                    
                    <Box sx={{mt:3}}>

                    <Typography  sx={{fontWeight: '500',mb:1,borderBottom:'1px solid black',display:'inline-block'}} variant="h6" component="div">
                        Note*
                    </Typography>

                    <Typography  sx={{textAlign:'justify',color: 'text.secondary'}} variant="body1" component="div">
                        {product?.note ? product?.note : 
                        <>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex quibusdam, labore tenetur adipisci minima dolorem amet cumque necessitatibus maiores enim harum repudiandae molestias modi temporibus a repellendus, pariatur laborum nobis eius id non quasi! </>

                        }                   
                                    
                   </Typography>
                    </Box>          

                </Grid>

                <Grid item   xs={12} sm={6} md={3} lg={3} className="static-section">
                  <Paper elevation={3}  sx={{p:2,border:1,borderColor: '#d5d9d9',boxShadow: 1,borderRadius:3}}>

                    <Typography  sx={{fontWeight: 'bold',textAlign:'start',color:'crimson'}} variant="h6" component="div" gutterBottom>
                        USD ${product?.price}
                    </Typography>

                    <Typography  sx={{textAlign:'start'}} variant="body2" component="div" gutterBottom>
                     ${product?.shipping} Shipping & Import Fees
                    </Typography>

                    
                    <Box sx={{display:'flex',justifyContent:'start',alignItems:'center'}}>
                        
                        <Typography  sx={{}} variant="body1" component="div">
                            Quentity:
                        </Typography>

                        

                        <IconButton onClick={handleMinus}  aria-label="remove" size="large" fontSize="inherit" sx={{ml:1.5,mr:{sm:1,md:1.5,lg:2},p:1}}>
                        <RemoveCircleIcon className="minusbutton"  sx={{color: 'primary.main'}} />
                        </IconButton>

                        <p>{quentity}</p>
                        
                        <IconButton onClick={handleAdd} aria-label="add" size="large" fontSize="inherit" sx={{ml:{sm:1,md:1.5,lg:2},p:1}}>
                        <AddCircleIcon className="addbutton" sx={{color: 'primary.main'}} />
                        </IconButton>
                    
                    </Box>
                    <Typography  sx={{ml:1,color: 'text.secondary'}} variant="body2" component="div">
                        {product?.stock} peices available
                    </Typography>
            

                    <Box sx={{mt:5,display:'flex',flexDirection:'column'}}>
                        
                        <CustomCartButton onClick={addtoCart}  sx={{fontWeight:'600',textTransform:'capitalize'}}>Add to Cart</CustomCartButton>

                        <CustomBuyButton  onClick={handleBuyNow}  sx={{ textTransform:'capitalize',fontWeight:'bold',mt:1 }}>Buy Now</CustomBuyButton>

                        
                </Box>
                </Paper>
                    
                </Grid>


            </Grid>
        </Box>
        <Box sx={{mt:6}}>
          
          <SimilarProduct category={product?.category}></SimilarProduct>


        </Box>
        </>
        :<div></div>
        }
        
        <SnackbarAlert open={open} handleClose={handleClose}></SnackbarAlert>

        </Container>
        <Footer></Footer>
    </React.Fragment>
     </>

    );
};

export default ProductDetails;



