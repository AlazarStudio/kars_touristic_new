// import React from 'react';
// import classes from './RegionPage.module.css';
// import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
// import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
// import { regions } from '../../../../bd';
// import { useParams } from 'react-router';

// // Функция обратной транслитерации (из латиницы в русский)


// function RegionPage({ children, ...props }) {
//   const { title } = useParams();
//   const decodedTitle = decodeURIComponent(title);

//   // Обратная транслитерация
//   // const regionTitle = reverseTransliterate(decodedTitle);

//   // Поиск региона в массиве
//   const currentRegion = regions.find(
//     (item) =>
//       item.title.toLowerCase().trim() === regionTitle.toLowerCase().trim()
//   );

//   // Если регион не найден
//   if (!currentRegion) {
//     console.error(`Ошибка: регион "${regionTitle}" не найден в базе`);
//     return <p>Регион не найден</p>;
//   }

//   return (
//     <div className={classes.back}>
//       <h1>{currentRegion.title}</h1>
//       <CenterBlock>
//         <WidthBlock>
//           <p>{currentRegion.description}</p>
//           <img src={currentRegion.img[0]} alt={currentRegion.title} />
//         </WidthBlock>
//       </CenterBlock>
//     </div>
//   );
// }

// export default RegionPage;
