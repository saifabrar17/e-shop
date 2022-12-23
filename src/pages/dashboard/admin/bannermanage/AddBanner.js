import React, { useState } from 'react';
import { Button, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import '../../../../components/authentication/userregister/UserRegister.css';
import ProgressModal from '../../../../components/progressmodal/ProgressModal';

const AddBanner = () => {
    const { register, formState: { errors }, handleSubmit,reset } = useForm();
    const [success,setSuccess]=useState(false);
    const [loading,setLoading]=useState(false);
    // const [imageLink,setImageLink]=useState('');


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  

  const onSubmit = (data) => {
    setLoading(true);
    handleOpen();

    const addBanner={name:data.name.toLowerCase()}

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
    postData(addBanner,data.data.link);
    

     }
   })    
  };

   const postData=(data,image)=>{

    const banner={...data,banner_slide:image}

    
    fetch('https://mysterious-basin-77883.herokuapp.com/banner', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(banner)
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
        <div>
            {
            success &&
            <Alert onClose={() =>setSuccess(false)}>This is a success alert — check it out!</Alert>

           } 
           
           <form className='register-form' id='form-container' onSubmit={handleSubmit(onSubmit)}>
      
            <div style={{color:'red',fontSize:'13px',textAlign:'start'}}>
            <input
                
                className="user-register"
                style={{marginTop:'6px'}}
                placeholder='Banner Name'
                type="text"
                {...register('name', {
                required: true,
                })}
            />
            {errors.name && "Please enter the banner name"}
            </div>


            <div style={{color:'red',fontSize:'13px',textAlign:'start',marginTop:'4px'}}>
            <input
                required
               // accept="image/*"
                className="user-register"
                style={{marginTop:'6px'}}
                placeholder='Banner Photo'
                type="file"
                // onChange={(e)=>setImage(e.target.files[0])}
                {...register('image', {
                required: true,

                })}
            />
           
            {errors.image && "Please enter the category photo"}
            </div>
            

            {/* <input className='register' type="submit" value="Add Product" /> */}
            <Button sx={{py:1.5,mt:2}} fullWidth variant='contained' color='secondary' type='submit'>Add Category</Button>

          </form>

          {loading &&
          <ProgressModal open={open} handleClose={handleClose} />
          }
            
        </div>
    );
};

export default AddBanner;