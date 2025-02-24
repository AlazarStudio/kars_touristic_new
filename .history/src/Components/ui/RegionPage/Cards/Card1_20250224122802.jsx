import React, { useEffect, useRef } from 'react';
import classes from './.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function card1 () {

  return (


                    <div key={item.id} className={classes.card1}>
                      <Swiper
                        modules={[Navigation, Pagination]}
                        // pagination={{ clickable: true }}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        className={classes.swiper}
                        loop={true}
                      >
                        {item.img.map((image, idx) => (
                          <SwiperSlide key={idx}>
                            <img
                              src={image}
                              alt={`${item.title} - ${idx + 1}`}
                              className={classes.cardImg}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      <img className={classes.favorite} src="/images/userLike_empty.png" />
                      <div className={classes.cardButtons}>
                        <button onClick={() => swiperRef.current?.slidePrev()}>
                          <img src="/images/butLeft.png" alt="Prev" />
                        </button>
                        <button onClick={() => swiperRef.current?.slideNext()}>
                          <img src="/images/butRight.png" alt="Next" />
                        </button>
                      </div>

                      <div className={classes.cardContent}>
                        <h3>{item.title}</h3>
                        <span>
                          Способ передвижения: <span>{item.transport}</span>{' '}
                        </span>
                        <span>
                          Продолжительность: <span>{item.duration}</span>{' '}
                        </span>
                        <span>
                          Время отправления: <span>{item.timeToStart}</span>{' '}
                        </span>
                        <span>
                          Тип экскурсии: <span>{item.type}</span>{' '}
                        </span>
                        <span>
                          Сложность: <span>{item.level}</span>{' '}
                        </span>
                        <div className={classes.addInfo}>
                          <img src="/images/optional_black.png" />
                          <span>{item.addInfo}</span>
                        </div>
                        <span className={classes.price}>
                          Стоимость:{' '}
                          <span>
                            {Number(item.price).toLocaleString('ru-RU')} ₽
                          </span>
                        </span>
                        <button>Подробнее</button>
                      </div>
                    </div>

   
  );
}

export default Card1;
