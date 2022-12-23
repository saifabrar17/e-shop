import { Button, CircularProgress, Container, Divider, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import ProductCart from '../productCart/ProductCart';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import useCart from '../../../hooks/useCart';
import { removeFromDb } from '../../../utilities/LocalStorage';
import Footer from '../../../components/shared/footer/Footer';
import EmptyCart from './EmptyCart';


const validMobile=new RegExp(/(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$/);

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    

  }));

const ProductOrder = () => {
    const {user}= useAuth();
    const {id}= useParams();
    
    const initialInfo={customerName:user.displayName,email:user.email};

    const [biller,setBiller]=useState(initialInfo);
    const [mobileErr,setMobileErr]=useState(false);
    const [cart,setCart,loading,setLoading]=useCart();
    const [selectedCart,setSelectedCart]=useState([]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const navigate = useNavigate();

    // console.log('loading',loading);




    


    useEffect(()=>{
        const selectedProduct=cart.filter(product=>product._id===id);
        setSelectedCart(selectedProduct);



    },[cart, id])
    
    

    let price=0;
    let shippingFee=0;

    for (const product of id?selectedCart:cart) {
        // console.log(product);
        price=(parseFloat(price)+ parseFloat(product.price*product.quentity)).toFixed(2);
        
        shippingFee= (parseFloat(shippingFee)+parseFloat(product.shipping)).toFixed(2);
        
    }

    const totalPrice=(parseFloat(price)+parseFloat(shippingFee)).toFixed(2);

   
    const handleRemove=(p_id)=>{
        // const remainProduct=id?selectedCart:cart.filter(product=>product._id!==p_id);
        // id?setSelectedCart([]):setCart(remainProduct);

        if(id){
            const remainProduct=selectedCart.filter(product=>product._id!==p_id);
            setSelectedCart(remainProduct);
        }else{
            const remainProduct=cart.filter(product=>product._id!==p_id);
            setCart(remainProduct);
        }

        removeFromDb(p_id);
        handleClose();

    }



    // console.log(price);

    const handleOnBlur=(e)=>{
        const field=e.target.name;
        const value=e.target.value;

        const newBiller={...biller};
        newBiller[field]=value;
        setBiller(newBiller);

    }


    useEffect(()=>{
       
        if(!validMobile.test(biller.mobile) && biller?.mobile !==undefined){
            setMobileErr(true);

        }else{
            setMobileErr(false);
           // console.log(biller.mobile);
            
        }

    },[biller?.mobile])


    const handleBilling=(e)=>{

        if(!mobileErr){

            if(id){
                navigate(`/payment/${id}`,{state:{totalPrice:{totalPrice},name:`${biller?.customerName}`,mobile:`${biller?.mobile}`,cart:{selectedCart}}});
            }
            else{
                navigate(`/payment`,{state:{totalPrice:{totalPrice},name:`${biller?.customerName}`,mobile:`${biller?.mobile}`,cart:{cart}}});
            }

            // console.log(biller);
        }
       
        e.preventDefault();

    }

    // console.log('cart',cart);

    useEffect(()=>{

        if(!loading && cart.length <= 0){

                handleOpenModal();
        
        }
        else{
            handleCloseModal()
        }
        
    },[cart.length, loading])

    
    

    return (
          <>

          {loading && 
             <Box style={{maxHeight:'100vh',minHeight:'auto'}}>
                <CircularProgress sx={{mt:5}}/>
             </Box>
              
          }

          {cart.length && 
           
          <Box sx={{backgroundColor:'#f4f4f4'}}>
           <Container>
            {/* <p>product id: {id}</p> */}
            
            <Box sx={{ flexGrow: 1,py:5}}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={8}>
                    <ProductCart cart={id?selectedCart:cart} handleRemove={handleRemove} open={open} handleOpen={handleOpen} handleClose={handleClose}></ProductCart>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Item sx={{textAlign: 'start'}}>
                    
                    <form onSubmit={handleBilling}>

                    <Typography variant="h6" gutterBottom component="div">
                    Shipping & Billing
                    </Typography>


                    <TextField
                    sx={{ m: 1, width: '25ch' }}
                    required
                    label="Customer Name"
                    name='customerName'
                    type="text"
                    id="outlined-size-small"
                    defaultValue={user.displayName}
                    onBlur={handleOnBlur}
                    variant="standard"
                    size="small"
                    />


                    <TextField
                    sx={{ m: 1, width: '25ch' }}
                    disabled
                    label="Email"
                    name='email'
                    type="email"
                    id="filled-size-small"
                    value={user?.email || ''}
                    variant="standard"
                    size="small"
                    />


                    <TextField
                    sx={{ mx:1,mt:1, width: '25ch' }}
                    required  
                    label="Mobile Num"
                    name='mobile'
                    onBlur={handleOnBlur}
                    id="standard-size-small"
                    // defaultValue="01700000000"
                    size="small"
                    variant="standard"
                    />
                    {mobileErr && <Typography color='error.main' variant='body1' sx={{ml:1}}>Mobile Number is not valid !</Typography>}


                    <Typography variant="h6" sx={{mt:2}} gutterBottom component="div">
                    Order Summary
                    </Typography>
                    <Box sx={{display:'flex',justifyContent:'space-between'}}>
                    <Typography color="text.secondary" variant="body1" gutterBottom component="div">
                    Subtotal ({cart.length} items)
                    </Typography>
                    <Typography  variant="body1" gutterBottom component="div">
                    $ {price}
                    </Typography>

                    </Box>
                    <Box sx={{display:'flex',justifyContent:'space-between'}}>

                    <Typography color="text.secondary" variant="body1" gutterBottom component="div">
                    Shipping Fee
                    </Typography>

                    <Typography  variant="body1" gutterBottom component="div">
                    $ {shippingFee}
                    </Typography>

                    </Box>
                    <Divider sx={{mt:2,mb:1}}></Divider>
                    <Box sx={{display:'flex',justifyContent:'space-between'}}>

                    <Typography  variant="body1" gutterBottom component="div">
                    Total
                    </Typography>

                    <Typography  variant="body1" gutterBottom component="div">
                    {totalPrice}
                    </Typography>

                    </Box>

                    <Button type='submit'  fullWidth sx={{mt:3}} variant="contained" color="warning">
                    Proceed to Pay
                    </Button>

                    </form>
                  </Item>
                </Grid>

              </Grid>
            </Box>

            
           </Container>
          </Box>
           }

          <EmptyCart open={openModal} handleClose={handleCloseModal}/>
            
          <Footer></Footer>
          

      

          </>
    );
};

export default ProductOrder;