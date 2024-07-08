"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

import downloadapp from "../../../../public/banner/download-app-banner.png";
import businessloan from "../../../../public/banner/Business-Loan-banner.png";
import personalloan from "../../../../public/banner/Personal-loan-banner.png";
import joinpartner from "../../../../public/banner/join-partner-banner.png";

import "./appdownloadanddocuments.css";
import Link from "next/link";

const AppDownloadAndRequiredDocuments = () => {
  return (
    <>
      <section style={{ padding: "30px" }}>
        <div className="container">
          <Swiper
            spaceBetween={30}
            effect={"fade"}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            modules={[EffectFade, Navigation, Pagination, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <Link href="https://play.google.com/store/apps/details?id=com.addrupees.demoappthree">
                <Image
                  src={downloadapp}
                  style={{ width: "100%", height: "550px" }}
                  className="download-app-image"
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={joinpartner}
                style={{ width: "100%", height: "550px" }}
                className="required-document-image"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={businessloan}
                style={{ width: "100%", height: "550px" }}
                className="required-document-image"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={personalloan}
                style={{ width: "100%", height: "550px" }}
                className="required-document-image"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default AppDownloadAndRequiredDocuments;
