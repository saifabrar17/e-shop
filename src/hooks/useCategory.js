import { useState } from 'react';
import { useEffect } from 'react';

const useCategory = (category) => {
    const [products,setProducts]=useState([]);
    
    useEffect(()=>{
        fetch(`https://mysterious-basin-77883.herokuapp.com/products?category=${category}`)
        .then(res=>res.json())
        .then(data=>setProducts(data.slice(-6)))

    },[category]);
    return [products,setProducts]
};

export default useCategory;