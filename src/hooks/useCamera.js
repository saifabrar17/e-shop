import { useEffect } from 'react';
import { useState } from 'react';

const useCamera = () => {
    const [cameras,setCameras]=useState([]);
    
    useEffect(()=>{
        fetch('https://mysterious-basin-77883.herokuapp.com/products?category=camera')
        .then(res=>res.json())
        .then(data=>setCameras(data.slice(-9)))

    },[]);





    return [cameras];
};

export default useCamera;