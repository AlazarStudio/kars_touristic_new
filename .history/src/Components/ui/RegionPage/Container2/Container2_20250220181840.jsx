import React from 'react';
import classes from './Container2.module.css';

function Container2({ selected, multiDayTours, onerDayTours, hotels, places, events }) {
  return (
    <div className={classes.container2}>
      {selected === 0 && <p>Показаны многодневные туры</p>}
      {selected === 1 && <p>Показаны однодневные экскурсии</p>}
      {selected === 2 && <p>Показаны авторские туры</p>}
      {selected === 3 && <p>Показаны отели / апартаменты</p>}
      {selected === 4 && <p>Показаны места для посещения</p>}
      {selected === 5 && <p>Показаны региональные MICE ивенты</p>}
    </div>
  );
}

export default Container2;
