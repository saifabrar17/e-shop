import { Button, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import CardMedia from '@mui/material/CardMedia';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bkash from '../../../images/payment/bKash.png';
import { clearDb, removeFromDb } from '../../../utilities/LocalStorage';

import '../Payment.css';

const validMobile=new RegExp(/(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$/);

const PaymentMethod = (props) => {

    const [biller,setBiller]=useState([]);
    const [mobileErr,setMobileErr]=useState(false);
    const navigate=useNavigate();
    
   // console.log(props);


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

    },[biller?.mobile]);

    const confirmPayment=()=>{
        navigate('/confirmorder');
        const orderdata={...props.orderInfo,paymentMethod:'bKash',bkashNum:biller.mobile, trxID:biller.TrxID};
        // console.log(data);
        const url='https://mysterious-basin-77883.herokuapp.com/orders';

        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(orderdata)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log('Success',data);
            if(props?.id){
                removeFromDb(props?.id);
    
            }else{
                clearDb();
            }

        }).catch((error)=>{
            console.error('Error',error);
        });
        
    }


    return (
      <Box>

        <form onSubmit={confirmPayment}>
        <Grid container spacing={2}>
        <Grid sx={{display:{sm:'none',md:'block'}}} item xs={4} md={5} lg={6} >
           
            <CardMedia
                className="bkash"
                component="img"
                image={bkash}
                alt="bkash"
            />
        
        </Grid>
        <Grid item xs={8} md={7} lg={6}>
      
                <TextField
                    sx={{ mt:1, width: '25ch' }}
                    required  
                    label="bKash Num"
                    name='mobile'
                    onBlur={handleOnBlur}
                    id="standard-size-small"
                    // defaultValue="01700000000"
                    size="small"
                    variant="standard"
                />
                {mobileErr && <Typography color='error.main' variant='body1' sx={{ml:1}}>Mobile Num is not valid !</Typography>}

                <TextField
                    sx={{ mt:.5, width: '25ch' }}
                    required  
                    label="TrxID"
                    name='TrxID'
                    onBlur={handleOnBlur}
                    id="standard-size-small"
                    // defaultValue="01700000000"
                    size="small"
                    variant="standard"
                />

            
        </Grid>    
        </Grid>
            <Button type='submit'  fullWidth sx={{mt:4}} variant="contained" color="warning">
                Confirm Payment
            </Button>
        </form>
      </Box>
            
    );
};

export default PaymentMethod;