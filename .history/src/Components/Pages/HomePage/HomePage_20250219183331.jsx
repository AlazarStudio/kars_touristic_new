import React from 'react';
import classes from './HomePage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { regions } from '../../../../bd';
import { useNavigate } from 'react-router';

// Функция транслитерации (из русского в латиницу)
const transliterate = (text) => {
  const map = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh",
    з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
    п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts",
    ч: "ch", ш: "sh", щ: "shch", ы: "y", э: "e", ю: "yu", я: "ya",
    ъ: "", ь: "", " ": "-",

    А: "A", Б: "B", В: "V", Г: "G", Д: "D", Е: "E", Ё: "Yo", Ж: "Zh",
    З: "Z", И: "I", Й: "Y", К: "K", Л: "L", М: "M", Н: "N", О: "O",
    П: "P", Р: "R", С: "S", Т: "T", У: "U", Ф: "F", Х: "Kh", Ц: "Ts",
    Ч: "Ch", Ш: "Sh", Щ: "Shch", Ы: "Y", Э: "E", Ю: "Yu", Я: "Ya",
  };

  return text
    .split("")
    .map((char) => map[char] || char)
    .join("");
};


function HomePage({ children, ...props }) {
  const navigate = useNavigate();

  return (
    <CenterBlock>
      <WidthBlock>
        <div className={classes.container}>
          <div className={classes.containerTitle}>
            <span>ОРГАНИЗУЕМ ВАШ ОТДЫХ НА КАВКАЗЕ</span>
          </div>
          <div className={classes.containerSearch}>
            <input placeholder="Поиск" />
            <button>Найти</button>
          </div>
          <div className={classes.containerCards}>
            {regions.map((el) => (
              <div
                className={classes.containerCardsEl}
                key={el.id}
                onClick={() => navigate(`/region/${transliterate(el.title)}`)}
              >
                <img src={el.img[1]} />
                <img src={el.img[0]} />
                <span>{el.title}</span>
              </div>
            ))}
          </div>
        </div>
      </WidthBlock>
    </CenterBlock>
  );
}

export default HomePage;
