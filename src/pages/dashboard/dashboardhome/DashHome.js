import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';

const DashHome = () => {
    const [inputList, setinputList]= useState([{discription:'', value:''}]);

  const handleOnBlur=(e, index)=>{
    const {name, value}= e.target;
    const list= [...inputList];
    list[index][name]= value;
    setinputList(list);

  }
 
  const handleremove= index=>{
    const list=[...inputList];
    list.splice(index,1);
    setinputList(list);
  }

  const handleaddclick=()=>{ 
    setinputList([...inputList, { discription:'', value:''}]);
   
  }
  const handleSubmit=(e)=>{
    
    console.log(inputList);

      e.preventDefault();

  }
    return (
        <div>
         <form onSubmit={handleSubmit}>
          { 
            inputList.map( (x,i)=>{
             // console.log(x.discription,i);
            return(
            
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} key={Math.random()}>
           
              <Grid item xs={10}>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} key={Math.random()}>

                    <Grid item xs={5}>
                    
                    <TextField
                    required
                    type="text"
                    defaultValue={x.discription || ''}
                    id="outlined-required"
                    label="Features Key"
                    variant="filled"
                    name="discription"
                    onBlur={(e)=>handleOnBlur(e,i)}

                    />

                    </Grid>

                    <Grid item xs={5}>
                    <TextField
                    required
                    type="text"
                    id="outlined-required"
                    label="Features Value"
                    defaultValue={x.value || ''}
                    variant="filled"
                    name="value"
                    onBlur={(e)=>handleOnBlur(e,i)}

                    />

                    </Grid>

                </Grid>

              </Grid>
                <Grid item xs={2}>
                  <div >
                    {
                    inputList.length!==1 &&
                    <Button size='small'  variant='contained' onClick={()=> handleremove(i)}>Remove</Button>
                    }
                    { inputList.length-1===i &&
                    <Button  size='small'  variant='contained' onClick={ handleaddclick}>Add More</Button>
                    }
                  </div>
                </Grid>
              </Grid>
              );
             }
            )} 

         <Button type='submit' variant='contained'>submit</Button>

        </form>
            
        </div>
    );
};

export default DashHome;