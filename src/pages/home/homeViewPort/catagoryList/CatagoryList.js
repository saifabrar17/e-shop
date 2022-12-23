import React from 'react';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import WatchIcon from '@mui/icons-material/Watch';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import ComputerIcon from '@mui/icons-material/Computer';
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';

import { useNavigate } from 'react-router-dom';


const icons=[
    <i className="fas fa-tshirt"/>,<ComputerIcon/>,<PhoneIphoneIcon/>,<WatchIcon/>,<ShoppingBagIcon/>,<HeadphonesIcon/>,<HealthAndSafetyIcon/>]


const CatagoryList = ({listItem,index}) => {

    const {name}=listItem;

     const navigate=useNavigate();
     const icon=icons[index];
    
     const handleCategoryList=()=>{
         navigate(`/products/${name}`,{state:{someOtherProp:{name}}});

     }

    return (
        <>
            
            <List sx={{my:0,py:0}}>
                <ListItem className="list-item" disablePadding sx={{my:0, py:0}}>
                <ListItemButton onClick={handleCategoryList} >

                    <ListItemIcon  >
                      {icon}
                    </ListItemIcon>
                    <ListItemText  sx={{fontWeight:'bold',textTransform:'capitalize'}}  primary={name}/>
                </ListItemButton>
                </ListItem>


            </List>
              
            
        </>
    );
};

export default CatagoryList;