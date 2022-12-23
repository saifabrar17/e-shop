import { useState } from 'react';
import { useEffect } from 'react';
import { getStoredDb } from '../utilities/LocalStorage';


const useCart = () => {

    const [cart,setCart]=useState([]);
    const [loading,setLoading]=useState(false);

   
    useEffect(()=>{ 
        

        const storedDb= getStoredDb();
        
        if(storedDb){
            setLoading(true);

            // console.log(storedDb);

            const newCart=[];
        // const elementCart=[];
            
        let urls = [
            'https://mysterious-basin-77883.herokuapp.com/products',
            'https://mysterious-basin-77883.herokuapp.com/flashsell'
          ];
          
          // map every url to the promise of the fetch
          let requests = urls.map(url => fetch(url));
          
          // Promise.all waits until all jobs are resolved
          Promise.all(requests)
          // map array of responses into an array of response.json() to read their content
          .then(responses => Promise.all(responses.map(res => res.json())))
          .then(data=>{
             // console.log(data);
              data.forEach(element => {

                // element.forEach(productElement => {
                //     elementCart.push(productElement);
                    
                // });

                for (const iterator of storedDb) {

                    const addedProducts=element.find(product=>product._id===iterator.product_id);
                    // console.log(addedProducts);
    
                    if(addedProducts){
                        const quentity=iterator.product_qty;
                        const productType=iterator.product_type;
                        addedProducts.quentity=quentity;
                        addedProducts.productType=productType;
    
                        newCart.push(addedProducts);

                    }
        
                    // console.log(newCart);
                    
                }

                    setCart(newCart);
                    
                    // console.log('ld',loading);
                        
              });
    
          }).finally(()=>setLoading(false))

        

        }
        else{
            setLoading(false);
        }
       // console.log(storedDb);
        
        

    },[])
    
    return [cart,setCart,loading,setLoading];
};

export default useCart;