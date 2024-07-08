"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

import img1 from "../../../../public/man.webp";

const testimonials = [
  {
    text: "AddRupee has revolutionized the way I manage my finances. Their platform is incredibly user-friendly and the customer service is top-notch.",
    name: "Rakesh Sharma",
    role: "Businessman",
    image: img1,
    rating: 5,
  },
  {
    text: "Thanks to AddRupee, I was able to secure a loan with ease and at a competitive rate. I highly recommend their services to anyone in need of financial assistance.",
    name: "Kamlesh Varma",
    role: "Small Business Owner",
    image: img1,
    rating: 4,
  },
  {
    text: "The investment options provided by AddRupee are unparalleled. I've seen significant growth in my portfolio since I started using their platform.",
    name: "Deepak Kumar",
    role: "Investor",
    image: img1,
    rating: 4.5,
  },
  {
    text: "I appreciate the transparency and the personalized advice I received from AddRupee. It has been a game-changer for my personal finances.",
    name: "Shivam Singh",
    role: "Freelancer",
    image: img1,
    rating: 4.5,
  },
  {
    text: "AddRupee's customer support is excellent. They were always available to answer my questions and guide me through the process.",
    name: "Karan Pandey",
    role: "Consultant",
    image: img1,
    rating: 5,
  },
];

const TestimonialSlider = () => {
  return (
    <section style={{ padding: "30px 0" }}>
      <div className="container">
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontWeight: 700,
            color: "#264653",
          }}
        >
          What our clients say
        </h2>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{ clickable: true }}
          navigation
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className="testimonialSwiper"
          breakpoints={{
            360: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-card">
                <div className="testimonial-image">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                  />
                </div>
                <p className="testimonial-text">{testimonial.text}</p>
                <p className="testimonial-name">{testimonial.name}</p>
                <p className="testimonial-role">{testimonial.role}</p>
                <div className="testimonial-rating">
                  {Array.from({ length: 5 }, (v, i) => {
                    const ratingValue = i + 0.5;
                    return (
                      <span key={i}>
                        {testimonial.rating >= i + 1 ? (
                          <FaStar />
                        ) : testimonial.rating >= ratingValue ? (
                          <FaStarHalfAlt />
                        ) : (
                          <FaRegStar />
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <style jsx global>{`
          .testimonialSwiper {
            padding: 0 20px;
          }
          .testimonial-card {
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
              rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
            text-align: center;
          }
          .testimonial-image {
            margin: 0 auto 10px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            overflow: hidden;
          }
          .testimonial-text {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 10px;
          }
          .testimonial-name {
            font-weight: bold;
            margin-bottom: 5px;
          }
          .testimonial-role {
            color: gray;
          }
          .testimonial-rating {
            display: flex;
            justify-content: center;
            margin-top: 10px;
          }
          .testimonial-rating span {
            color: #f1c40f;
            font-size: 20px;
            margin: 0 2px;
          }

          /* Custom styles for navigation buttons */
          .swiper-button-next,
          .swiper-button-prev {
            color: #fff;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: #000;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 0.3s ease-in-out;
          }
          .swiper-button-next::after,
          .swiper-button-prev::after {
            font-size: 12px;
          }
          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            color: #000;
            background: #fff;
            border: 1px solid #000;
          }

          /* Custom styles for pagination dots */
          .swiper-pagination-bullet {
            background: #000;
            width: 10px;
            height: 10px;
            opacity: 1;
            border-radius: 50%;
          }
          .swiper-pagination-bullet-active {
            background: #0070f3;
          }
        `}</style>
      </div>
    </section>
  );
};

export default TestimonialSlider;
