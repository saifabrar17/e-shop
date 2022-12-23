
const addTodb=(id,quentity=1,type='regular')=>{
    
    const oldItems = JSON.parse(localStorage.getItem('shopping_cart')) || [];
    
    const match = oldItems.find(item=> item['product_id'] === id);
    if (match) {
        match['product_qty'] += parseInt(quentity);
    } else {
        const newItem = {
            'product_id': id,
            'product_qty': parseInt(quentity),
            'product_type': type
        };
        oldItems.push(newItem);
    }
    localStorage.setItem('shopping_cart', JSON.stringify(oldItems));

}


// const addTodb=(id,quentity)=>{
//     const exists=localStorage.getItem('shopping_cart');
//     let shopping_cart={}
   
//     if(!exists){
//         shopping_cart[id]= parseInt(quentity);
       

//     }else{

//         shopping_cart=JSON.parse(exists);

//         if(shopping_cart[id]){
//             const newCount=shopping_cart[id]+parseInt(quentity);
//             shopping_cart[id]=newCount;
//         }else{
//             shopping_cart[id]=parseInt(quentity);
//         }
       

//     }

//     localStorage.setItem('shopping_cart',JSON.stringify(shopping_cart));


// }

const removeFromDb=(id)=>{
    const exists=localStorage.getItem('shopping_cart');
    if(!exists){

    }else{
        const shopping_cart=JSON.parse(exists);
       // delete shopping_cart[id];
   
        const remainingElement=shopping_cart.filter(element=>element.product_id !== id); 

        localStorage.setItem('shopping_cart',JSON.stringify(remainingElement));

    }

}

const getStoredDb=()=>{
    const exists=localStorage.getItem('shopping_cart');
    return exists? JSON.parse(exists):{};

}

const clearDb=()=>{
    const exists=localStorage.getItem('shopping_cart');
    return exists?localStorage.removeItem('shopping_cart'):{};
}

export {addTodb,removeFromDb,getStoredDb,clearDb};