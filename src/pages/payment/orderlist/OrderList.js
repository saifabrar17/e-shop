import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const OrderList = ({cart}) => {
  // console.log(cart);
  const {name,image,category,productType,price,quentity}=cart;



    return (
        <List sx={{ width: '100%',  bgcolor: 'background.paper' }}>
          <ListItem alignItems="flex-start">
           <ListItemAvatar>
             <Avatar alt="Remy Sharp" src={image} />
           </ListItemAvatar>
          <ListItemText
            className="ellipses"
            title={name}
            primary={name}
            secondary={
            <React.Fragment >
              <Typography
                sx={{ display: 'inline',textTransform:'capitalize' }}
                component="span"
                variant="body2"
                color="text.primary"
                >
                  {category}
              </Typography>
               — {productType} Item, {price} &times; {quentity} 
            </React.Fragment>
         }
        />
          </ListItem>
         <Divider variant="inset" component="li" />
        </List>
    );
};

export default OrderList;