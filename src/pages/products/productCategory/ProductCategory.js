import React from 'react';
import { useLocation } from 'react-router-dom';

const ProductCategory = () => {
    
    const location = useLocation();
    const {name}=location?.state?.someOtherProp;

    console.log(name)
    return (
        <div>
            <h3>{name}</h3>
            
        </div>
    );
};

export default ProductCategory;