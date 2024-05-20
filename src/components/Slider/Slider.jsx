import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios"
import {Card} from "antd"
function AutoPlay({data}) {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };
  return (
    <div className="slider-container">
        <h3 className="" style={{margin:'2rem 0'}}>Violation</h3>
      <Slider {...settings}>
        {
            data.map((item)=>{
                return(
                    <Card>
                <img src={item.image_b64} alt="" srcset="" />
                </Card>                )
            })
        }
   
 
      </Slider>
      
    </div>
  );
}

export default AutoPlay;
