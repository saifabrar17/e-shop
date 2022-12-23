import React from 'react';
import '../Home.css';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import img1 from '../../../images/electronic-banner.png';
import img2 from '../../../images/laptop-banner.png';
import img3 from '../../../images/wintersell-banner.png';
import { Container } from '@mui/material';

const banners=[
    {banner_slide:img1},
    {banner_slide:img2},
    {banner_slide:img3},

]
//console.log(banners);

const Homebanner = () => {

  // const [banners,setBanners]=useState([]);
  // useEffect(()=>{
  //   fetch('https://mysterious-basin-77883.herokuapp.com/banner')
  //   .then(res=>res.json())
  //   .then(data=>setBanners(data))

  // },[]);


    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "none"}}
            
            onClick={onClick}
          />
        );
      }
      
      function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
      
            style={{ ...style, display: "none"}}
          
            onClick={onClick}
          />
        );
      }
      

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
      
      };

    return (
        <Container sx={{pt:2}}>
        <Slider {...settings}  >



            {banners.map(slide=><div key={Math.random()}>
                <img style={{width:'100%',height:'344px',padding:'0'}} src={slide?.banner_slide} alt="side_banner" />
            </div>)}
          
        </Slider>

        
        </Container>
      
    );
};

export default Homebanner;