import * as React from 'react';
import './Navbar.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import InputBase from '@mui/material/InputBase';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useAuth from '../../../hooks/useAuth';
import { getStoredDb } from '../../../utilities/LocalStorage';
import useProducts from '../../../hooks/useProducts';
import AuthModal from '../../authentication/AuthModal';
import logo from '../../../images/logo/logo.png';

const theme = createTheme({
  components: {
    // Name of the component
    MuiAppBar: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          backgroundColor: 'rgba(228, 228, 243, 0.89)',
          color: 'black',
        },
      },
    },
  },
});

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  // alpha(theme.palette.common.white, 0.15)
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.75),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


const pages = [
    {
        title:'Home',
        page_link:'/home'
    },
    {
        title:'Products',
        page_link:'/products'
    }
  ];

const settings = [
        {
            title:'Profile',
            page_link:''
        },
        {
            title:'Account',
            page_link:''
        },
        {
            title:'Dashboard',
            page_link:'/dashboard'
        }
  
   ];

const Navbar = () => {
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [active,setActive]=React.useState(false);
  

  const [products]=useProducts();
  
  const storedDb= getStoredDb();
  const keys=Object.keys(storedDb);

  const location= useLocation();


  

  //console.log(keys.length);

  const {user,userLogOut}=useAuth();
  //  console.log(user);

  const navigate=useNavigate();
  
  // let searchText;

  const handleSearchInput=(e)=>{
   const searchText=e.target.value;

    if(searchText){
      setActive(true);

    }else{
      setActive(false);
    }

  }
  
  

  const handleSearch=(event)=>{
    
    const searchText= document.getElementById('searchInputId').value;
    
    const url=`/products`;
    
    const searchProducts=products.filter(product=>product.name.toLowerCase().includes(searchText.toLowerCase()));
  
    navigate(url,{state:{searchText:`${searchText}`,searchProducts:{searchProducts}}});

    // setTimeout(()=>{
    //   document.getElementById('searchInputId').value='';
    //   setActive(false);

    // },500);
    

  }
  


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (pageLink) => {
    setAnchorElNav(null);

    if(pageLink){
      navigate(pageLink);
    }
   


  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  
  const handleCart=()=>{
    navigate('/shoppingcart');
   
  }

  const handleLogout=()=>{
    userLogOut();
     handleCloseNavMenu();

  }

    const handleOpen = () => {
         setOpen(true);
         handleCloseNavMenu();
         
        
      };
    const handleClose = () => {
      
      setOpen(false)
     // handleCloseNavMenu();
      handleCloseUserMenu();
    };

  
  return (
    <>
    <ThemeProvider theme={theme}>
    <AppBar position="sticky">
      <Container >
      {/* maxWidth="xl" */}
        <Toolbar disableGutters>
        
          <Link to='/' style={{textDecoration:'none'}}>
          <Box sx={{alignItems:'center',mr: 2, display: { xs: 'none', md: 'flex' },}}>
          <img src={logo} alt="" width={50} height={50}  />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{  color:'orangered' }}
          >
            E-Shop
            
          </Typography>
          </Box>
          </Link>
          

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'flex', md: 'none' },
              }}
            >  
           
           <Box sx={{px:2,mb:1}}>
              <Search sx={{display:'flex',border:'1px solid black'}}>

              <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              id="searchInputId"
              onChange={handleSearchInput}

              />

              {active? 
              <Button  onClick={handleSearch} size='small' variant='contained' color='secondary'>
              <SearchIcon />
              </Button> :

              <Button  disabled  onClick={handleSearch} size='small' variant='contained' color='secondary'>
              <SearchIcon />
              </Button>

              }


              </Search>    
            </Box>
            
                {pages.map((page) => (
                <Link style={{textDecoration:'none'}} key={Math.random()} to={page?.page_link}>
                <MenuItem key={Math.random()} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page?.title}</Typography>
                </MenuItem>
                </Link>
              ))}
                
              
            </Menu>
          </Box>
          
            <Link to='/' style={{textDecoration:'none'}}>
              <Box sx={{flexGrow: 1,alignItems:'center',mr: 5, display: { xs: 'flex', md: 'none' },}}>
                <img src={logo} alt="" width={50} height={50}  />
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{  color:'orangered' }}
                >
                  e-Shop
                  
                </Typography>
              </Box>
            </Link>

      
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
           
            <Link style={{textDecoration:'none'}} key={Math.random()} to={page?.page_link}>
              
              <Button
                key={Math.random()}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                {page?.title}
              </Button>
              </Link>
              
            ))}
            
          </Box>

          {/* <Box sx={{my:'auto'}}>
           <a href="https://api.whatsapp.com/message/6YDZ2PT7BQV5O1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer"><WhatsAppIcon  sx={{fontSize:30, borderRadius:2, mr:2, color:'white',bgcolor:'success.light',p:.5}}/></a>
           </Box> */}
            
          <Search sx={{display:{xs:'none',md:'flex'},mr:2}}>

            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              id="searchInputId"
              onChange={handleSearchInput}

            />

            {active? 
              <Button id='searchBtnId' onClick={handleSearch} size='small' variant='contained' color='secondary'>
              <SearchIcon />
              </Button> :
              
              <Button id='searchBtnId' disabled  onClick={handleSearch} size='small' variant='contained' color='secondary'>
              <SearchIcon />
              </Button>
          
          }

            
          </Search>

          <IconButton onClick={handleCart} sx={{mr:{xs:2,md:3}}} aria-label="cart">
            <StyledBadge badgeContent={keys.length} color="secondary">
            <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
          
          
          { user.displayName &&
          
            <Typography variant="body1" sx={{display:{xs:'none',sm:'flex'},mr:1}}>{user.displayName}
            </Typography>
          }


          {!user.email?<Button variant="outlined"  sx={{fontWeight:'bold',bgcolor:'white',borderRadius:'12px',
          
          
        }} color='error' onClick={handleOpen}>login</Button>: 
          
          
          <Box sx={{ flexGrow: 0,display:'flex' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={user.photoURL?user.photoURL:'/static/images/avatar/2.jpg'} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={Math.random()} onClick={()=>handleCloseNavMenu(setting.page_link)}>
                  <Typography textAlign="center">{setting.title}</Typography>
                </MenuItem>
              ))}

 
                <MenuItem key={Math.random()} onClick={handleLogout}>
                  <Typography sx={{ color: 'error.main',fontWeight:'bold' }} textAlign="center">Logout</Typography>
                </MenuItem>

            </Menu>
          </Box>
          }

        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>

    <AuthModal open={open} handleClose={handleClose} location={location}></AuthModal>
    </>
  );
};

export default Navbar;