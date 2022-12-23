import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Alert, Button, List, ListItem, ListItemText} from '@mui/material';
import WarningModal from '../../../../components/warningmodal/WarningModal';
import useAuth from '../../../../hooks/useAuth';

const columns = [
    { label: 'Ordered Item', minWidth: 200 },
    { label: 'P. Details', minWidth: 120 },
    { label: 'Customer Name', minWidth: 170 },
    {
      label: 'T. Price',
      minWidth: 80,
      format: (value) => value.toLocaleString('en-US'),
    },
    { label: 'Payment Method', minWidth: 180,},
    { label: 'Status', minWidth: 130,  },
    { label: 'Action', minWidth: 150, },
  ];
  

  
const MyOrder = () => {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [orders,setOrders]=useState([]);
  const [success,setSuccess]=useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const {user}=useAuth();

  useEffect(()=>{
    fetch(`https://mysterious-basin-77883.herokuapp.com/orders?email=${user.email}`)
    .then(res=>res.json())
    .then(data=>setOrders(data));
  },[user.email])
 // console.log(user.email,orders);
  

  const handleDelete=(id)=>{
    const url=`https://mysterious-basin-77883.herokuapp.com/orders/${id}`;
    
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

      const remainOrders=orders.filter(order=>order._id !==id);
      setOrders(remainOrders);
    
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
      <Alert onClose={() => {setSuccess(false)}}>Order Cancled Successfully — check it out!</Alert>
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
           {orders?
          <TableBody>
            {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={Math.random()} >

                        <TableCell>
                          {row.orderProduct.map(product=>
                          <List key={Math.random()} sx={{p:0}}>
                          <ListItem disablePadding>
                            <ListItemText primary={product.name.slice(0,20)} />
                          </ListItem>
                          </List>
                            
                            )}
                        </TableCell>

                        <TableCell>
                          {row.orderProduct.map(product=>
                          <List key={Math.random()} sx={{p:0}}>
                          <ListItem disablePadding>

                            <ListItemText  primary={`$${product.price} × ${product.quentity}`} />
                          </ListItem>
                          </List>
                            
                            )}
                        </TableCell>

                        <TableCell sx={{}}>
                          {row.name}
                          
                        </TableCell>
                        <TableCell>
                          ${row.totalPrice}
                          
                        </TableCell>
                        <TableCell>
                          <span style={{marginRight:'5px'}}>bKash-</span>
                          {row.bkashNum} <br />
                          TrxID:{row.trxID}
                          
                        </TableCell>
                        <TableCell>Order Status</TableCell>

                        <TableCell ><Button onClick={handleOpen} variant="contained" color="error" >Cancle</Button></TableCell>

                        <WarningModal id={row._id} open={open} handleClose={handleClose} handleDelete={handleDelete}></WarningModal>
                     
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
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </Paper>
      </>
    );
};

export default MyOrder;