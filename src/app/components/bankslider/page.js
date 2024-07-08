"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Autoplay } from "swiper/modules";

import "./bankslider.css";

// import bank images
import axisBank from "../../../../public/bank-logos/axis-bank-logo.png";
import auSmallFinanceBank from "../../../../public/bank-logos/au-small-finance-bank-logo.png";
import capitalBank from "../../../../public/bank-logos/capital-bank-logo.png";
import hdfcBank from "../../../../public/bank-logos/hdfc-bank-logo.webp";
import iciciBank from "../../../../public/bank-logos/icici-bank-logo.png";
import idfcBank from "../../../../public/bank-logos/idfc-bank-logo.png";
import IndusIndBank from "../../../../public/bank-logos/IndusInd-logo.png";
import kotakBank from "../../../../public/bank-logos/kotak-logo.png";
import ujjivansmallfinanceBank from "../../../../public/bank-logos/ujjivan-small-finance-bank-logo.png";
import utkarshsmallfinanceBank from "../../../../public/bank-logos/utkarsh-small-finance-bank-logo.png";
import yesBank from "../../../../public/bank-logos/Yes_Bank_logo.png";

import Image from "next/image";

const BankSlider = () => {
  return (
    <>
      <section style={{ padding: "30px 0", backgroundColor: "#EEECED" }}>
        <div className="container">
          <div style={{ paddingBottom: "20px" }}>
            <h2
              style={{ textAlign: "center", fontWeight: 700, color: "#264653" }}
            >
              Our Banks
            </h2>
            <hr
              style={{
                width: "150px",
                margin: "auto",
                borderTop: "3px solid #000000",
              }}
            />
          </div>
          <Swiper
            slidesPerView={5}
            spaceBetween={10}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              360: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
            }}
            modules={[Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="image-container">
                <Image
                  src={hdfcBank}
                  alt="HDFC Bank"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="image-container">
                <Image
                  src={iciciBank}
                  alt="ICICI Bank"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="image-container">
                <Image
                  src={axisBank}
                  alt="Axis Bank"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="image-container">
                <Image
                  src={auSmallFinanceBank}
                  alt="AU Small Finance Bank"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="image-container">
                <Image
                  src={capitalBank}
                  alt="Capital Bank"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="image-container">
                <Image
                  src={idfcBank}
                  alt="IDFC Bank"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="image-container">
                <Image
                  src={IndusIndBank}
                  alt="IndusInd Bank"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="image-container">
                <Image
                  src={kotakBank}
                  alt="Kotak Bank"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="image-container">
                <Image
                  src={ujjivansmallfinanceBank}
                  alt="Ujjivan Small Finance Bank"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="image-container">
                <Image
                  src={yesBank}
                  alt="Yes Bank"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="image-container">
                <Image
                  src={utkarshsmallfinanceBank}
                  alt="Utkarsh Small Finance Bank"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default BankSlider;
