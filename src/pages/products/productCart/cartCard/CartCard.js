import React from 'react';
import { Grid, IconButton, Typography } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ClearIcon from '@mui/icons-material/Clear';
// import Checkbox from '@mui/material/Checkbox';
import WarningModal from '../warningModal/WarningModal';

// const label = { inputProps: { 'aria-label': 'Checkbox demo' }};
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    
  }));
  

const CartCard = ({product,handleRemove,handleOpen,open,handleClose}) => {
    
    const {name,price,quentity,image}=product;

  
    return (
        <>
        <Grid item xs={12}  >
            <Item >
            
                <IconButton onClick={handleOpen} sx={{float:'right'}} variant="contained" color="error" aria-label="remove from shopping cart" title='Remove Product'>
                <ClearIcon  sx={{color:'crimson'}}/>
               </IconButton>
               
                
                <Grid container spacing={2}>
                <Grid item xs={3} md={2} sx={{display:'flex',justifyContent:'center',alignItems:'start'}}>
                <img src={image} alt="" style={{width:'100px'}} />
                
                </Grid>
                <Grid item xs={5} md={6}>
                    <Typography variant="body2" sx={{textAlign:'start'}} gutterBottom>
                        {name}
                    </Typography>
                
                </Grid>
                <Grid item xs={2} md={2}>
                    <Typography variant="body1" gutterBottom sx={{fontWeight:'bold'}}>
                       $ <span style={{color:'tomato'}}>{price}</span>  
                    </Typography>
                
                </Grid>
                <Grid item xs={2} md={2}>
                    <Typography variant="body1" gutterBottom>
                       Qty: {quentity}      
                    </Typography>
                
                </Grid>
                </Grid>
                
            </Item>
        </Grid>
        <WarningModal open={open} handleClose={handleClose} handleRemove={handleRemove} product={product}></WarningModal>

        </>
    );
};

export default CartCard;