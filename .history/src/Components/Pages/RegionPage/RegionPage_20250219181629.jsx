import React from 'react';
import classes from './RegionPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { regions } from '../../../../bd';
import { useParams } from 'react-router';

// Функция обратной транслитерации (из латиницы в русский)
const reverseTransliterate = (text) => {
  const map = {
    shch: 'щ',
    yo: 'ё',
    zh: 'ж',
    kh: 'х',
    ts: 'ц',
    ch: 'ч',
    sh: 'ш',
    yu: 'ю',
    ya: 'я',
    a: 'а',
    b: 'б',
    v: 'в',
    g: 'г',
    d: 'д',
    e: 'е',
    z: 'з',
    i: 'и',
    y: 'й',
    k: 'к',
    l: 'л',
    m: 'м',
    n: 'н',
    o: 'о',
    p: 'п',
    r: 'р',
    s: 'с',
    t: 'т',
    u: 'у',
    f: 'ф',
    '-': ' ',
  };

  return text
    .toLowerCase()
    .replace(
      /shch|yo|zh|kh|ts|ch|sh|yu|ya|[a-z-]/g,
      (match) => map[match] || match
    );
};

const reverseTransliterate = (text) => {
    const map = {
      "shch": "щ", "yo": "ё", "zh": "ж", "kh": "х", "ts": "ц", "ch": "ч", 
      "sh": "ш", "yu": "ю", "ya": "я", "a": "а", "b": "б", "v": "в", 
      "g": "г", "d": "д", "e": "е", "z": "з", "i": "и", "y": "й", 
      "k": "к", "l": "л", "m": "м", "n": "н", "o": "о", "p": "п", 
      "r": "р", "s": "с", "t": "т", "u": "у", "f": "ф", "-": " "
    };
  
    return text
      .toLowerCase()
      .replace(/shch|yo|zh|kh|ts|ch|sh|yu|ya|[a-z-]/g, (match) => map[match] || match);
  };
  
