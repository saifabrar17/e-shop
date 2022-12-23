import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import Notfind from '../../notfind/Notfind';

const ProtectedRoute = ({children}) => {
    const {isAdmin,isLoading}=useAuth();
    const [loading,setLoading]=useState(true);
   
    useEffect(()=>{
        if(isAdmin){

            setLoading(false);

        }

    },[isAdmin])
    
    if(loading && isLoading){
        return <CircularProgress/>
    }

    return (
        
         !isAdmin?<Notfind/>:children
    
    
    );
};

export default ProtectedRoute;