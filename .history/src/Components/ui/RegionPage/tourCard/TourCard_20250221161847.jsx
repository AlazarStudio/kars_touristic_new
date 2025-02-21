import React from 'react';
import classes from './Card.module.css';

const TourCard = ({ tour }) => {
  return (
    <div className={classes.card}>
      <img src={tour.img[0]} alt={tour.title} className={classes.cardImg} />
      <div className={classes.cardContent}>
        <h3>{tour.title}</h3>
        <p>{tour.duration} | {tour.transport}</p>
        <p>{tour.level} | {tour.type}</p>
        <p><strong>Цена:</strong> {tour.price} ₽</p>
      </div>
    </div>
  );
};

export default TourCard;
