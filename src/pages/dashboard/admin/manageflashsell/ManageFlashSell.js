import { Typography } from '@mui/material';
import React from 'react';
import AddSellProduct from './AddSellProduct';
import ManageSellProducts from './ManageSellProducts';
import ManageSellTime from './ManageSellTime';

const ManageFlashSell = () => {
    return (
        <div>
             <Typography sx={{textAlign:'start',fontWeight:'bold'}} gutterBottom variant="h5"  component='div'>Manage FlashSell</Typography>

                <ManageSellTime/>
                <AddSellProduct/>
                <ManageSellProducts/>
            
            
        </div>
    );
};

export default ManageFlashSell;