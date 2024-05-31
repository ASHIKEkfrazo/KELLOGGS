import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios"
import {Card} from "antd"
import { ColorRing } from 'react-loader-spinner'
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

console.log(data)
  return (
    <>
    
    {
      data?.length === 0 ? 
null
        // <ColorRing
        // visible={true}
        // height="80"
        // width="80"
        // ariaLabel="color-ring-loading"
        // wrapperStyle={{}}
        // wrapperClass="color-ring-wrapper"
        // colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        // /> 
      :

    <div className="slider-container">
        <h3 className="" style={{margin:'2rem 0'}}>Violation</h3>
      <Slider {...settings}>
        {
            data?.map((item)=>{
                return(
                    <Card>
                <img src={item.image_b64} alt="" srcset="" />
                </Card>                )
            })
        }
   
 
      </Slider>
      
    </div>
    }
    </>
  );
}

export default AutoPlay;
