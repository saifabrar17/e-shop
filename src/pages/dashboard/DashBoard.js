import * as React from 'react';
import './DashBoard.css';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Footer from '../../components/shared/footer/Footer';
import { Home,AdminPanelSettings,BookOnline,DashboardCustomize, AddShoppingCart} from '@mui/icons-material';
import WidgetsIcon from '@mui/icons-material/Widgets';
import TimerIcon from '@mui/icons-material/Timer';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { Link, Route,Routes, useNavigate } from 'react-router-dom';
import MyOrder from './users/myorder/MyOrder';
import DashHome from './dashboardhome/DashHome';
import MakeAdmin from './admin/makeadmin/MakeAdmin';
import useAuth from '../../hooks/useAuth';
import ManageOrder from './admin/manageorder/ManageOrder';
import AddProduct from './admin/addproduct/AddProduct';
import ManageProduct from './admin/manageproduct/ManageProduct';
import ProtectedRoute from './protectedroute/ProtectedRoute';
import ManageCategory from './admin/managecategory/ManageCategory';
import ManageBanner from './admin/bannermanage/BannerManage';
import ManageFlashSell from './admin/manageflashsell/ManageFlashSell';

const drawerWidth = 240;

const userNavs=[
  {
   name:'Home',
   page_link:'/home',
   icon:<Home/>
   
  },
  {
    name:'My Order',
    page_link:'myorder',
    icon:<BookOnline />
   }
   
]
const adminNavs=[
  {
   name:'Home',
   page_link:'/home',
   icon:<Home/>
   
  },

  {
   name:'Add Product',
   page_link:'addproduct',
   icon:<AddShoppingCart/>
  },
  {
   name:'Manage Product',
   page_link:'manageproduct',
   icon:<AddShoppingCart/>
  },
  {
   name:'Manage Flashsell',
   page_link:'manageflashsell',
   icon:<TimerIcon/>
  },
  {
   name:'Manage Order',
   page_link:'manageorder',
   icon:<ShoppingCartTwoToneIcon/>
  },
  {
    name:'Manage Banner',
    page_link:'managebanner',
    icon:<ViewCarouselIcon/>
   },
  {
    name:'Manage Category',
    page_link:'managecategory',
    icon:<WidgetsIcon/>
   },
  
  {
   name:'Add Admin',
   page_link:'addadmin',
   icon:<AdminPanelSettings />
  },
   
]


function DashBoard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const {userLogOut,user, isAdmin}=useAuth();
  const navigate=useNavigate();

  console.log(isAdmin);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout=()=>{
    userLogOut();
    navigate('/');
    

  }


  const drawer = (
    <div>
      <Toolbar sx={{fontWeight:'bold',fontSize:'20px',color:'green'}}><DashboardCustomize sx={{mr:1}}/>
          DashBoard
      
      </Toolbar>
      <Divider />
      <List>
    
        {!isAdmin && user.email? <>

        {userNavs.map((listItem) => (
          <Link key={Math.random()} to={listItem.page_link} className='list-link'>
          <ListItem button >
            <ListItemIcon>
              {listItem.icon}
            </ListItemIcon>
            <ListItemText primary={listItem.name} sx={{fontWeight:'bold',color:'GrayText'}}/>
          </ListItem>
          </Link>
        ))}
        
        
        </>:<>
        {adminNavs.map((listItem) => (
          <Link key={Math.random()} to={listItem.page_link} className='list-link'>
          <ListItem button >
            <ListItemIcon>
              {listItem.icon}
            </ListItemIcon>
            <ListItemText primary={listItem.name} sx={{fontWeight:'bold',color:'GrayText'}}/>
          </ListItem>
          </Link>
        ))}
        
        
        
        </>}
        

          <ListItem button onClick={handleLogout} sx={{backgroundColor:'snow',fontWeight:'bold'}}>
            <ListItemIcon >
              <ExitToAppOutlinedIcon color='error'/>
            </ListItemIcon>
            <ListItemText primary='Logout' sx={{fontWeight:'bold',color:'crimson'}}/>
          </ListItem>

      </List>
      
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            E-Shop BD
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        {/* <Toolbar /> */}
        
        <Routes>
        
        <Route exact path='/' element={<DashHome/>}/>
        <Route path='myorder' element={<MyOrder/>}/>
        
        <Route path='addproduct' element={<ProtectedRoute><AddProduct/></ProtectedRoute>}/>
        <Route path='manageproduct' element={<ProtectedRoute><ManageProduct/></ProtectedRoute>}/>
        <Route path='manageflashsell' element={<ProtectedRoute><ManageFlashSell/></ProtectedRoute>}/>

        <Route path='manageorder' element={<ProtectedRoute><ManageOrder/></ProtectedRoute>}/>

        <Route path='managebanner' element={<ProtectedRoute><ManageBanner/></ProtectedRoute>}/>
        <Route path='managecategory' element={<ProtectedRoute><ManageCategory/></ProtectedRoute>}/>

        
        <Route path='addadmin' element={<ProtectedRoute><MakeAdmin/></ProtectedRoute>}/>

        
        </Routes>
        <Footer/>
        
    </Box>
    </Box>
  );
}

DashBoard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DashBoard;
