import React,{useState} from 'react';
import { IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import google from '../../../images/login/google.png';
import useAuth from '../../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
const axios = require('axios');


const RegisterPage = ({location,handleClose}) => {
  const [loginData,setLoginData]=useState({});
  const {signInUsingGoogle,signUpUsingJWT}=useAuth();

    // const location=useLocation();
    const navigate=useNavigate();

    const handleGoogleLogin=()=>{
      // signInUsingGoogle(location,navigate,handleClose);
    }

    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
      });
    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };


      const handleOnBlur=(e)=>{
        const field=e.target.name;
        const value=e.target.value;

        const newLoginData={...loginData};
        newLoginData[field]=value;
        setLoginData(newLoginData);

    }

    const submitHandler=(e)=>{
        console.log(loginData);

        axios.post('http://localhost:5000/users/',loginData)
        .then(res=>{
          console.log(res);
          signUpUsingJWT(loginData.displayName,loginData.email,location,navigate,handleClose);

        })
        .catch((err)=>console.log(err))



       

        e.preventDefault();

    }

    

      

      
    return (
        
        <Box sx={{}}>

          <Box component='form'
          onSubmit={submitHandler}
          sx={{
          display:'flex',flexDirection:'column',alignItems:'center',
          '& .MuiTextField-root': { mb: '16px', '& .MuiOutlinedInput-root':{
          borderRadius:'15px',
          backgroundColor:'white',

          }},
          '& .MuiInputBase-input':{py:'12px'}
          }}
          noValidate
          autoComplete="off">

            <TextField
            id="loginId"
            // label="Email"
            // sx={{py:1}}
            fullWidth
            type='text'
            placeholder='Your Name'
            onBlur={handleOnBlur}
            name='displayName'
            InputProps={{
            startAdornment: (
            <InputAdornment position="start">
              <PersonOutlineIcon />
            </InputAdornment>
            ),
            }}
            //variant="standard"
            />


            <TextField
            id="loginId"
            // label="Email"
            // sx={{py:1}}
            fullWidth
            type='text'
            placeholder='abc@example.com'
            onBlur={handleOnBlur}
            name='email'
            InputProps={{
            startAdornment: (
            <InputAdornment position="start">
              <MailOutlineIcon/>
            </InputAdornment>
            ),
            }}
            //variant="standard"
            />

            <TextField
            id="passwordId"
            fullWidth
            // label="Password"
            placeholder='••••••••'

            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            onBlur={handleOnBlur}
            name='password'
            InputProps={{
            startAdornment: (
            <InputAdornment position="start">
              <LockOutlinedIcon/>
            </InputAdornment>
            ),
            endAdornment: (
            <InputAdornment position="end">
            <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            >
            {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
            </InputAdornment>
            ),
            }}
            //variant="standard"
            /> 

          
          <input className='register' type="submit" value="Register" />



          </Box>

          <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',mt:2}} >
            <span className='left'></span>
            <Typography variant='subtitle1' sx={{textAlign:'center'}} component="div">
            Or Continue With
            </Typography>
            <span className='right'></span>
          </Box>

          <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}} >
            <img onClick={handleGoogleLogin} src={google} alt="" style={{width:'90px',marginTop:'10px'}}/>
          </Box>
          

        </Box>
    );
};

export default RegisterPage;