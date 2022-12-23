import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Typography from "@mui/material/Typography";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Alert, Button, Grid, Paper } from "@mui/material";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "aliceblue",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ManageSellTime = () => {
  const date = new Date();
  const [success, setSuccess] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(date.setMonth(date.getMonth() + 1));
  const [error, setError] = useState(false);

  
  const handleStartDate = (newValue) => {
    setStartDate(newValue);
  };
  
  const handleEndDate = (newValue) => {
    setEndDate(newValue);
  };

  

  const handleSetTime = () => {
    if (error) {
      setError(true);
    } else {
      console.log("st:", startDate, "ed:", endDate);
      saveDate();
    }
  };

  const saveDate = async () => {
    const sellTime = { startTime: startDate, endTime: endDate };

    await axios
      .delete("https://mysterious-basin-77883.herokuapp.com/flashsellTime")
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err);
      });

    await axios
      .post("https://mysterious-basin-77883.herokuapp.com/flashsellTime", sellTime)
      .then((res) => {
        if(res.status=== 200){
            setSuccess(true);
        }
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  useEffect(() => {
    const diff = endDate - startDate;
    if (diff < 1) {
      setError(true);
    } else {
      setError(false);
    }
  }, [endDate, startDate]);

  return (
    <Box>
      {success && <Alert onClose={() => setSuccess(false)}>Flash Time set - Successfully !</Alert>}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Item sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5}>
              <DateTimePicker
                label="Sell Start"
                value={startDate}
                onChange={handleStartDate}
                renderInput={(params) => (
                  <TextField {...params} sx={{ maxWidth: 400, minWidth: "auto" }} />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={5}>
              <DateTimePicker
                label="Sell End"
                value={endDate}
                onChange={handleEndDate}
                renderInput={(params) => (
                  <TextField {...params} sx={{ maxWidth: 400, minWidth: "auto" }} />
                )}
              />
            </Grid>

            <Box sx={{ my: "auto", ml: 1 }}>
              <Button
                onClick={handleSetTime}
                sx={{ maxWidth: 400, minWidth: "auto", fontWeight: "bold" }}
                variant="contained"
                color="info"
              >
                Set Time
              </Button>
            </Box>
          </Grid>
          {error && (
            <Typography
              color="error"
              sx={{ textAlign: "start", fontWeight: "bold" }}
              gutterBottom
              variant="body"
              component="div"
            >
              End Time must be Bigger.
            </Typography>
          )}
        </Item>
      </LocalizationProvider>
    </Box>
  );
};

export default ManageSellTime;
