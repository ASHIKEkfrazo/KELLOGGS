import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios"
import { Card } from "antd"
import { ColorRing } from 'react-loader-spinner'
function AutoPlay({ data }) {
  // const settings = {
  //   // dots: false,
  //   // infinite: true,
  //   slidesToShow: 2,
  //   slidesToScroll: 1,
  //   // autoplay: true,
  //   // speed: 3000,
  //   // autoplaySpeed: 2000,
  //   // cssEase: "linear"
  // };
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    // <span {...props}><img src={`https://admin.aventuras.co.in/uploads/arrow_right_b4d68d463d.png?updated_at=2023-03-24T12:13:32.807Z`}/></span>
    // <img src={KeyboardArrowUpIcon} alt="nextArrow" {...props} />
    <span {...props}>&larr;</span>
  );

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    // <img src='{BsChevronRight }' alt="nextArrow" {...props} />
    <div {...props}>&rarr;</div>
  );
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    speed: 1200,
    autoplaySpeed: 2000,
    cssEase: "linear",
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,

        }
      },

      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  console.log(data)
  return (
    <>

      {
        data?.length > 0 ?
          <div className="slider-container" style={{ width: "100%" }}>
            <h3 className="" style={{ margin: '1rem 0' }}>Violation</h3>
            <Slider {...settings}>
              {
                data?.map((item) => {
                  return (


                    <Card>
                      <img src={item.image_b64} alt="" style={{ width: "100%", height: "auto" }} />
                    </Card>
                  )
                })
              }


            </Slider>

          </div>
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

          null
      }
    </>
  );
}

export default AutoPlay;
