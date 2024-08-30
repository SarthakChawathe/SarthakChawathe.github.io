// import React from 'react';
// import "./testimonials.css";
// import { Data } from "./Data";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import { Pagination } from 'swiper';

// const Testimonials = () => {
//   return (
//     <section className="testimonial container section" id = "testimonials">
//         <h2 className="section__title">Testimonials</h2>
//         <span className="section__subtitle">Accolades received</span>
//         <Swiper className="testimonial__container"
//             loop={true}
//             grabCursor={true}
//             spaceBetween={24}
//             pagination={{
//                 clickable:true
//             }}
//             breakpoints={{
//                 576: {
//                     slidesPerView: 1,
//                     spaceBetween: 48,
//                 },
//                 768: {
//                     slidesPerView: 1,
//                     spaceBetween: 48,
//                 },
//             }}
//             modules={[Pagination]}
//         >
//             {Data.map(({id, image, title, position, description}) => {
//                 return (
//                     <SwiperSlide className="testimonial__card" key={id}>
//                         <img src={image} alt="client" className="testimonial__img" />
//                         <h2 className="tetimonial__name">{title}</h2>
//                         <h4 className="tetimonial__position">{position}</h4>
//                         <br />
//                         <p className="testimonial__description">{description}</p>
//                     </SwiperSlide>
//                 )
//             })}
//         </Swiper>    
//     </section>
//   );
// }

// export default Testimonials;

import React from 'react';
import "./testimonials.css";
import { Data } from "./Data";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay"; // Import the autoplay CSS
import { Pagination, Autoplay } from 'swiper'; // Import Autoplay from Swiper

const Testimonials = () => {
  return (
    <section className="testimonial container section" id="testimonials">
      <h2 className="section__title">Testimonials</h2>
      <span className="section__subtitle">Accolades received</span>
      <Swiper
        className="testimonial__container"
        loop={true}
        grabCursor={true}
        spaceBetween={24}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 4500, // Delay between transitions (in milliseconds)
          disableOnInteraction: false, // Continue autoplay even after user interaction
        }}
        breakpoints={{
          576: {
            slidesPerView: 2,
            spaceBetween: 48,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 48,
          },
        }}
        modules={[Pagination, Autoplay]} // Add Autoplay module here
      >
        {Data.map(({ id, image, title, position, description }) => {
          return (
            <SwiperSlide className="testimonial__card" key={id}>
              <img src={image} alt="client" className="testimonial__img" />
              <h2 className="testimonial__name">{title}</h2>
              <h4 className="testimonial__position">{position}</h4>
              <br />
              <p className="testimonial__description">{description}</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}

export default Testimonials;