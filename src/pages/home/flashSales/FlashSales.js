import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Container, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useFlashSell from "../../../hooks/useFlashSell";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../hotDeals/HotDeals.css";
import FlashSellCard from "./card/FlashSellCard";
import { useTransition } from "react";

var settings = {
  // dots: true,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  autoplay: false,
  autoplaySpeed: 2000,
  pauseOnHover: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1080,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

const FlashSales = () => {
  const [startTransition,isPending, products] = useFlashSell();
  const [sellStartTime, setSellStartTime] = useState();
  const [sellEndTime, setSellEndTime] = useState();

  //  console.log(time);

  

  const countDownTime = new Date(`${sellEndTime}`).getTime();
  const setStartTime = new Date(`${sellStartTime}`).getTime();

  const currentTime = new Date().getTime();

  let showTime = setStartTime - currentTime;

  const calculateTimeLeft = () => {
    // let year = new Date().getFullYear();

    // console.log(showTime);
    let difference = countDownTime - currentTime;
    // let difference = +new Date(`10/01/${year}`) - +new Date();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }
    // {interval}
    timerComponents.push(
      <span style={{ marginRight: "5px" }} key={Math.random()}>
        {timeLeft[interval]} {interval} {""}
      </span>
    );
  });

  useEffect(() => {
    fetch("https://mysterious-basin-77883.herokuapp.com/flashsellTime")
      .then((res) => res.json())
      .then((data) => {
        startTransition(() => {
          setSellStartTime(data[0].startTime);
          setSellEndTime(data[0].endTime);
        });
      });
  }, [startTransition]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <>
      {isPending && <CircularProgress />}
      {showTime < 0 && timerComponents.length ? (
        <Container id="flashsell">
          <Typography
            style={{ textAlign: "start" }}
            sx={{ color: "info.main", mt: 2 }}
            variant="h4"
            gutterBottom
            component="div"
          >
            Flash Sell
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
            <Box
              sx={{
                display: { xs: "flex", sm: "flex" },
                flexFlow: { xs: "column-reverse", sm: "row" },
                textAlign: "start",
              }}
            >
              <Typography
                style={{}}
                sx={{ color: "", fontWeight: "bold" }}
                variant="h6"
                component="div"
              >
                On Sell Now
              </Typography>

              {showTime < 0 ? (
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    bgcolor: "error.main",
                    px: { xs: 1, sm: 2 },
                    py: 0.5,
                    boxShadow: 2,
                    borderRadius: 1,
                    marginLeft: { sm: "4vw" },
                  }}
                  style={{ color: "white" }}
                  variant="body1"
                  component="div"
                >
                  <AccessTimeIcon sx={{ mr: 1 }} />

                  {timerComponents.length ? timerComponents : <span>Time's up!</span>}
                </Typography>
              ) : (
                <div></div>
              )}
            </Box>

            <Button sx={{ height: { xs: "35px", sm: "auto" } }} size="small" variant="outlined">
              Show More
            </Button>
          </Box>

          <Divider sx={{ my: 2, backgroundColor: "black" }} />

          <Box sx={{ px: 3, py: 4 }}>
            <Slider {...settings} style={{ padding: "5px", borderRadius: "10px" }}>
              {products.map((product) => (
                <FlashSellCard key={Math.random()} product={product}></FlashSellCard>
              ))}
            </Slider>
          </Box>
        </Container>
      ) : (
        <Box></Box>
      )}
    </>
  );
};

export default FlashSales;
