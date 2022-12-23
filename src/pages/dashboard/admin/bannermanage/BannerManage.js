import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Alert, Button, Grid, Typography} from '@mui/material';
import WarningModal from '../../../../components/warningmodal/WarningModal';
import AddBanner from './AddBanner';

const columns = [
    { label: 'Banner Name', minWidth: 200 },
    { label: 'Image Id', minWidth: 120 },
    { label: 'Action', minWidth: 150, },
  ];
  

  
const ManageBanner = () => {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [banners,setBanners]=useState([]);
  const [success,setSuccess]=useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const title='Delete the Banner';
  const body='Banner will be remove from database';

  useEffect(()=>{
    fetch('https://mysterious-basin-77883.herokuapp.com/banner')
    .then(res=>res.json())
    .then(data=>setBanners(data));
  },[])
//   console.log(category);

  const handleDelete=(id)=>{
    const url=`https://mysterious-basin-77883.herokuapp.com/banner/${id}`;
    
    fetch(url,{
      method:'DELETE',
    })
    .then(async res=>{
      // const data=await res.json();

      if(!res.ok){
        // const error = (data && data.message) || res.status;
        // return Promise.reject(error);

      }
      setSuccess(true);
      handleClose();

      const remainBanners=banners.filter(category=>category._id !==id);
      setBanners(remainBanners);
    
    });

  }


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

    return (
      <>
      {success && 
      <Alert onClose={() => {setSuccess(false)}}>Banner Deleted Successfully — check it out!</Alert>
      }

     <Typography sx={{textAlign:'start',fontWeight:'bold'}} gutterBottom variant="h5"  component='div'>Home Banner Manage</Typography>

     <Typography sx={{textAlign:'start'}} gutterBottom variant="body1"  component='div' color='error'>Banner should be <span style={{fontWeight:'bold'}}>1080 x 344</span> pixel</Typography>

    
     <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{mt:2}}>
      
        <Grid item xs={12} sm={5} ><AddBanner/></Grid>

        <Grid item xs={12} sm={7}>
        
         <Paper sx={{ width: '100%', overflow: 'hidden',bgcolor:'aliceblue',p:2 }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={Math.random()}
                        style={{ minWidth: column.minWidth ,fontWeight:'bold'}}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    {/* <TableCell> 
                        <Link to='addcategory'>
                            <Button  variant='contained'>Add New</Button>
                        </Link> 
                    </TableCell> */}
                    
                    </TableRow>
                </TableHead>
                {banners?
                <TableBody>
                    {banners.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                        return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={Math.random()} >

                                <TableCell sx={{}}>
                                {row.name}                       
                                </TableCell>
                                
                                <TableCell>
                                {row.banner_slide}
                                </TableCell>

                                <TableCell ><Button onClick={handleOpen} variant="contained" color="error" >Delete</Button></TableCell>

                                <WarningModal id={row._id} open={open} handleClose={handleClose} handleDelete={handleDelete} title={title} body={body}></WarningModal>
                            
                        </TableRow>
                        );
                        
                    }
                    
                    
                    )}
                </TableBody>:<></>
                } 
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={banners.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>

      </Grid>
      
      
      </>
    );
};

export default ManageBanner;