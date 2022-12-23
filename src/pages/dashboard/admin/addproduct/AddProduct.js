import React, { useState } from 'react';
import { Button, Grid, Typography,TextField,Rating, Alert } from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import { useForm } from 'react-hook-form';
import '../../../../components/authentication/userregister/UserRegister.css';
import ProgressModal from '../../../../components/progressmodal/ProgressModal';
                    
const CustomizedBox = styled(Box)(({ theme }) => ({
   color:'#c4c4c4', 
   '&:hover': {
     color:'black',
  }
}));
const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};


const AddProduct = () => {

    const { register, formState: { errors }, handleSubmit,reset } = useForm();

    const [inputList, setinputList]= useState([{discription:'', value:''}]);
    const [rating, setRating] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
    const [success,setSuccess]=useState(false);
    const [loading,setLoading]=useState(false);
    // const [imageLink,setImageLink]=useState('');


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  const handleOnBlur=(e, index)=>{
    const {name, value}= e.target;
    const list= [...inputList];
    list[index][name]= value;
    setinputList(list);

  }
 
  const handleremove= index=>{
    const list=[...inputList];
    list.splice(index,1);
    setinputList(list);
  }

  const handleaddclick=()=>{ 
    setinputList([...inputList, { description:'', value:''}]);
   
  }

  const onSubmit = (data) => {
    setLoading(true);
    handleOpen();

    

    const addProduct={name:data.name.toLowerCase(),seller:data.seller.toLowerCase(),price:data.price,shipping:data.shipping,category:data.category.toLowerCase(),stock:data.stock,star:rating,starCount:data.starCount,features:inputList}

    // console.log(addProduct);
    //  console.log(data.image[0]);
    
     const formData= new FormData();
     formData.append("image",data.image[0]);
 
     fetch("https://api.imgur.com/3/image/",{
     method:'post',
     headers:{
       Authorization: `${process.env.REACT_APP_FIREBASE_IMGUR_ID}`
     },
     body:formData
   })
   .then(res=>res.json())
   .then(data=>{

    if(data.success){
    // setImageLink(data.data.link);
   // const deletehash=data.data.deletehash;
   // console.log('success',data);
    // console.log('image',data.data.link);
    postData(addProduct,data.data.link);
    

     }
   })    
  };

   const postData=(data,image)=>{

    const product={...data,image:image}

    
    fetch('https://mysterious-basin-77883.herokuapp.com/products', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
      })
      .then(res => res.json())
      .then(data => {

      if(data.insertedId){
       // console.log('Success:', data);
        setSuccess(true);
        setLoading(false);
        reset();
      }
      
      })
      .catch(error => {
      console.error('Error:', error);
      setLoading(false);
      });

   }

    return (
        <div >

           {
            success &&
            <Alert onClose={() =>setSuccess(false)}>This is a success alert — check it out!</Alert>

           } 
           
          <Typography sx={{textAlign:'start',fontWeight:'bold'}} gutterBottom variant="h5"  component='div'>Add New Product:</Typography>
           <form className='register-form' id='form-container' onSubmit={handleSubmit(onSubmit)}>
      
            <div style={{color:'red',fontSize:'13px',textAlign:'start'}}>
            <input
                
                className="user-register"
                style={{marginTop:'6px'}}
                placeholder='Product Name'
                type="text"
                {...register('name', {
                required: true,
                })}
            />
            {errors.name && "Please enter the product name"}
            </div>

            <div style={{color:'red',fontSize:'13px',textAlign:'start'}}>
            <input
                
                className="user-register"
                style={{marginTop:'6px'}}
                placeholder='Seller'
                type="text"
                {...register('seller', {
                required: true,
                })}
            />
            {errors.seller && "Please enter the seller name"}
            </div>

           <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                <Grid item xs={6}>
                <div style={{color:'red',fontSize:'13px',textAlign:'start'}}>
                <input
                    
                    className="user-register"
                    style={{marginTop:'6px'}}
                    placeholder='Category'
                    type="text"
                    {...register('category', {
                    required: true,
                    })}
                />
                {errors.category && "Please enter the product category"}
                </div>
                    
                </Grid>
                <Grid item xs={6}>
                <div style={{color:'red',fontSize:'13px',textAlign:'start'}}>
                <input
                    
                    className="user-register"
                    style={{marginTop:'6px'}}
                    placeholder='Product Stock'
                    type="number"
                    {...register('stock', {
                    required: true,min:0,

                    })}
                />
                {errors.stock && "Please enter the num of stock"}
                </div>
                </Grid>
                <Grid item xs={6}>
                <div style={{color:'red',fontSize:'13px',textAlign:'start'}}>
                <input
                    
                    className="user-register"
                    style={{marginTop:'6px'}}
                    placeholder='Price'
                    type="number"
                    step="0.01"
                    {...register('price', {
                    required: true,min:0,

                    })}
                />
                {errors.price && "Please enter the product price"}
                </div>

                </Grid>
                <Grid item xs={6}>
                <div style={{color:'red',fontSize:'13px',textAlign:'start'}}>
                <input
                    
                    className="user-register"
                    style={{marginTop:'6px'}}
                    placeholder='Shipping Cost'
                    type="number"
                    step="0.01"
                    {...register('shipping', {
                    required: true,min:0,

                    })}
                />
                {errors.shipping && "Please enter the shipping cost"}
                </div>

                </Grid>
                <Grid item xs={6}>
                
                <CustomizedBox 
                  sx={{
                    mt:1,
                    border: 1,
                    borderRadius: 1,
                    padding:1,
                    display: 'flex',
                  }}
                >
                  <Rating
                    name="hover-feedback"
                    value={rating}
                    precision={0.5}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                  />
                  {rating !== null && (
                    <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
                  )}
                </CustomizedBox>
                
                </Grid>
                <Grid item xs={6}>
                <div style={{color:'red',fontSize:'13px',textAlign:'start'}}>
                <input
                    defaultValue={0 || ''}
                    className="user-register"
                    style={{marginTop:'6px'}}
                    placeholder='Rating Count'
                    type="number"
                    {...register('starCount', {
                    required: true,min:0,

                    })}
                />
                {errors.starCount && "Please enter the num of rating people"}
                </div>   

                </Grid>
            </Grid>


           { 
            inputList.map( (x,i)=>{
             // console.log(x.description,i);
            return(
            
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{my:1}} key={Math.random()}>
           
              <Grid item xs={9}>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} key={Math.random()}>

                  <Grid item xs={6}>
                    
                    <TextField
                    className='user-register'
                    fullWidth
                    size='small'
                    required
                    type="text"
                    defaultValue={x.description || ''}
                    id="outlined-required"
                    label="Features Key"
                    //  variant="standard"
                    name="description"
                    onBlur={(e)=>handleOnBlur(e,i)}

                    />

                  </Grid>

                  <Grid item xs={6}>

                    <TextField
                    fullWidth
                    size='small'
                    required
                    type="text"
                    id="outlined-required"
                    label="Features Value"
                    defaultValue={x.value || ''}
                   // variant="filled"
                    name="value"
                    onBlur={(e)=>handleOnBlur(e,i)}

                    />

                    </Grid>

                </Grid>

              </Grid>
                <Grid item xs={3} >
                  <Box sx={{display:{xs:'colum',sm:'flex'}}}>
                    {
                    inputList.length!==1 &&
                    <Button size='small'  variant="outlined" color="error" onClick={()=> handleremove(i)}>Remove</Button>
                    }
                    { inputList.length-1===i &&
                    <Button  size='small'  variant='contained' color='warning' sx={{ml:1}} onClick={ handleaddclick}>Add More</Button>
                    }
                  </Box>
                </Grid>
              </Grid>
              );
             }
            )} 

            

            <div style={{color:'red',fontSize:'13px',textAlign:'start',marginTop:'4px'}}>
            <input
                required
               // accept="image/*"
                className="user-register"
                style={{marginTop:'6px'}}
                placeholder='Product Photo'
                type="file"
                // onChange={(e)=>setImage(e.target.files[0])}
                {...register('image', {
                required: true,

                })}
            />
           
            {errors.image && "Please enter the product photo"}
            </div>
            

            {/* <input className='register' type="submit" value="Add Product" /> */}
            <Button sx={{py:1.5,mt:2}} fullWidth variant='contained' color='secondary' type='submit'>Add Product</Button>

          </form>

          {loading &&
          <ProgressModal open={open} handleClose={handleClose} />
          }
     
        </div>
    );
};

export default AddProduct;


