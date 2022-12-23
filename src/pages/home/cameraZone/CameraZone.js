import React from 'react';
import CameraCard from './card/CameraCard';
import { Box, Button, Container, Divider, Grid, Typography } from '@mui/material';
import { styled} from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import useCamera from '../../../hooks/useCamera';


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
    [theme.breakpoints.up('xs')]: {
      width: '8ch',
      '&:focus': {
        width: '15ch',
      },
    },
  },
}));

const  CameraZone = () => {
    const [cameras]=useCamera();
    
  
    
    return (
        
        <Box sx={{mt:3}}>
        <Container style={{backgroundColor:'whitesmoke'}}>
        <Typography style={{textAlign:'start'}} sx={{ color: 'info.main',pt:4 }} variant="h4" gutterBottom component="div">
            Camera Zone
           
            </Typography>

            <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'end'}}>
            <Box sx={{display:'flex',flexFlow:{xs:'column',sm:'row'}}}>
            <Typography style={{textAlign:'start'}} sx={{ color: 'warning.main'}} variant="h6" gutterBottom component="div">
                Latest Camera
               
            </Typography>

            <Box sx={{ml:{xs:0,md:3 }}}>
            <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

            </Box>

            </Box>

            <Button sx={{height:{xs:'35px',sm:'auto'}}} size="small" variant="outlined">Show More</Button>

            </Box>

            <Divider sx={{my:2,backgroundColor:'black'}}/>

            {/* .slice(1) */}
            
            
            <Grid container spacing={{ xs: 2, md: 3 }} sx={{py:4}} columns={{ xs: 4, sm: 8, md: 12 }}>
            
            {
                cameras.map(camera=><CameraCard key={Math.random()} camera={camera}></CameraCard>)
                
            }
            </Grid>
            
        </Container>
        </Box>
    );
};

export default  CameraZone;