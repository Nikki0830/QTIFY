// src/components/Carousel.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Card from '../Card/Card';

const Carousel = ({ items }) => {
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={20}
      slidesPerView={3}
      navigation
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {items.map((item) => (
        <SwiperSlide key={item.id}>
          <Card album={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
