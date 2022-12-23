import { useState } from 'react';
import { useEffect } from 'react';

const useProducts = () => {
    const [products,setProducts] =useState([]);
    const [displayProducts,setDisplayProducts]=useState([]);

    useEffect(()=>{
        fetch('https://mysterious-basin-77883.herokuapp.com/products')
        .then(res=>res.json())
        .then(data=>{
            setProducts(data);
            setDisplayProducts(data);
        });
        

    },[products]);

    return [products,setProducts,displayProducts,setDisplayProducts];
};

export default useProducts;