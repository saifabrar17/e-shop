import React from 'react';
import '../CameraZone.css';
import { Box, Button,Card,CardActionArea,CardActions,Divider, Grid} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { addTodb } from '../../../../utilities/LocalStorage';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import SnackbarAlert from '../../../../components/shared/snackbar/SnackbarAlert';

const theme = createTheme({
    components: {
      // Name of the component
      MuiCardActionArea: {
        styleOverrides: {
          // Name of the slot
          focusHighlight: {
            // Some CSS
            color:'cyan',
          },
        },
      },
    },
  });

const CameraCard = ({camera}) => {

    const [open, setOpen] = React.useState(false);

    const {_id,name,category,image,price}=camera;

    const navigate=useNavigate();

    const handleNavigate=(id)=>{
        navigate(`/productdetails/${id}`,{state:{sellType:'regular'}})


    }

    const handleAddtoCart=(id)=>{
        addTodb(id);
        setOpen(true);

    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };




    return (
        <Grid item xs={6} sm={4} md={4}>
        <ThemeProvider theme={theme}>
          <Card  sx={{  bgcolor: 'background.paper' }}>
           <CardActionArea  sx={{p:1}} onClick={()=>handleNavigate(_id)}>
             <Box sx={{ m:2, textAlign:'start',height:'80px'}}>
                <Grid container alignItems="center">
                <Grid item xs>
                    <Typography gutterBottom variant="h4" component="div">
                    {category}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography gutterBottom variant="h6" component="div">
                    ${price}
                    </Typography>
                </Grid>
                </Grid>
                <Typography color="text.secondary" variant="body2">
                    {name.slice(0,80)}...
                
                </Typography>
            </Box>
            <Divider variant="middle" />
            <Box sx={{ m:2, textAlign:'center' }}>

                <img src={image} alt="" style={{width:'70%',height:'160px'}}  />

                {/* <Typography gutterBottom variant="body1">
                Select type
                </Typography>
                <Stack direction="row" spacing={1}>
                <Chip label="Extra Soft" />
                <Chip color="primary" label="Soft" />
                <Chip label="Medium" />
                <Chip label="Hard" />
                </Stack> */}
            </Box>
          </CardActionArea>
          <CardActions sx={{display:'flex',justifyContent:'end',pr:3}}>
             <Button onClick={()=>handleAddtoCart(_id)} sx={{fontWeight:'bold'}} size='small' color='secondary' variant="outlined">Add to cart</Button>
          </CardActions>
          </Card> 
        </ThemeProvider>

        <SnackbarAlert open={open} handleClose={handleClose}></SnackbarAlert>       
      </Grid>
      
    );
};

export default CameraCard;