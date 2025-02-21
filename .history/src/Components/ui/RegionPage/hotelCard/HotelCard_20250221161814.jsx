import React from 'react';
import classes from './Card.module.css';

const HotelCard = ({ hotel }) => {
  return (
    <div className={classes.card}>
      <img src={hotel.img[0]} alt={hotel.title} className={classes.cardImg} />
      <div className={classes.cardContent}>
        <h3>{hotel.title}</h3>
        <p>{hotel.city}</p>
        <p><strong>Адрес:</strong> {hotel.address}</p>
        <p><strong>Звезды:</strong> {hotel.numStars}</p>
      </div>
    </div>
  );
};

export default HotelCard;
