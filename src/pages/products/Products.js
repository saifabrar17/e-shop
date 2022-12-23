import { Container, Divider, Grid, Typography} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';


import ProductCard from './productCard/ProductCard';
import Footer from '../../components/shared/footer/Footer';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor:'white' ,
    border:'1px solid black',
    '&:hover': {
      backgroundColor:'white',
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

const Products = () => {
    
    const [products,setProducts] =useState([]);
    const [displayProducts,setDisplayProducts]=useState([]);
    
    const {findItem}=useParams();
    //console.log(findItem);

    const location=useLocation();

     // console.log(location?.state?.searchProducts?.searchProducts);

    
    let url;

    (findItem?
    url=`https://mysterious-basin-77883.herokuapp.com/products?category=${findItem}`:
   
    url='https://mysterious-basin-77883.herokuapp.com/products');


    useEffect(()=>{
        fetch(url)
        .then(res=>res.json())
        .then(data=>{
            setProducts(data);
            setDisplayProducts(data);

        }); 

    },[url]);

   
    const handleSearch=(e)=>{
        
        const searchText=e.target.value;

        const findProducts=products.filter(product=>product.name.toLowerCase().includes(searchText.toLowerCase()));
        // console.log(findProducts);
        setDisplayProducts(findProducts);

    }


    return (
         <>
         <Container>
             
             <Box sx={{mt:3}}>
                
                <Box
                sx={{display:{xs:'block',sm:'flex'},justifyContent:'space-between',alignItems:'end'}}>
                
                <Typography variant='h5' color='info.main' component='div'>Product Zone</Typography>

                <Search sx={{display:{xs:'flex'}}}>
                
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                   placeholder="Search…"
                   inputProps={{ 'aria-label': 'search' }}
                   id="searchInputId"
                   onChange={handleSearch} /> 
                    
                </Search>

                </Box>

             </Box>
             <Divider sx={{mt:2,bgcolor:'black'}}></Divider>



            <Grid container spacing={{ xs: 2, md: 3 }} sx={{py:3}} columns={{ xs: 4, sm: 8, md: 12, lg:12 }}>
                
       {/* product mapping */}
                
                { location?.state?.searchProducts ?

                (location?.state?.searchProducts?.searchProducts.map(product=><ProductCard key={Math.random()} product={product}></ProductCard>)):
                  
                (displayProducts.map(product=><ProductCard key={Math.random()} product={product}></ProductCard>))         
                
                }

                </Grid>

                
           </Container>
           <Footer></Footer>
           </>
            
        
    );
};

export default Products;