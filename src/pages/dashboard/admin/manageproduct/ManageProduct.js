import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Alert, Button, Grid,ListItemText, Tooltip, Typography} from '@mui/material';
import WarningModal from '../../../../components/warningmodal/WarningModal';

const columns = [
    { label: 'Product Name', minWidth: 250 },
    { label: 'Seller', minWidth: 120 },
    
    {
      label: 'Price',
      minWidth: 100,
      format: (value) => value.toLocaleString('en-US'),
    },
    { label: 'Shipping Cost', minWidth: 120,},
    { label: 'Stock', minWidth: 120,  },
    { label: 'Action', minWidth: 200, },
  ];
  

  
const ManageProduct = () => {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [products,setProducts]=useState([]);
  const [success,setSuccess]=useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const title='Delete the Product';
  const body='Product will be delete from database';

  useEffect(()=>{
    fetch('https://mysterious-basin-77883.herokuapp.com/products')
    .then(res=>res.json())
    .then(data=>setProducts(data));
  },[])
//   console.log(products);

  const handleDelete=(id)=>{
    const url=`https://mysterious-basin-77883.herokuapp.com/products/${id}`;
    
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

      const remainProducts=products.filter(order=>order._id !==id);
      setProducts(remainProducts);
    
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
        <Alert onClose={() => {setSuccess(false)}}>Product Deleted Successfully — check it out!</Alert>
        }
  
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
              </TableRow>
            </TableHead>
             {products?
            <TableBody>
              {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={Math.random()} >
  
                          <TableCell sx={{ flexGrow: 1, overflow: 'hidden',maxWidth:200 }}>
                            <Tooltip title={row.name} placement="bottom">
                               <Grid item xs zeroMinWidth>
                                  <ListItemText>
                                  <Typography sx={{textAlign:'start'}} noWrap>{row.name}</Typography>
                                  </ListItemText>
                                </Grid>
                            </Tooltip>
                                
                                <Typography sx={{textAlign:'start',color: 'text.secondary'}} variant='body2'>Id: {row._id}</Typography>
                            
                          </TableCell>
  
                          <TableCell>
                            {row.seller}
                           
                          </TableCell>

                          <TableCell>
                            ${row.price}
                            
                          </TableCell>
                          <TableCell>
                            ${row.shipping}
                            
                          </TableCell>
                          
                          <TableCell>
                              {row.stock}
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
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Paper>
        </>
    );
};

export default ManageProduct;