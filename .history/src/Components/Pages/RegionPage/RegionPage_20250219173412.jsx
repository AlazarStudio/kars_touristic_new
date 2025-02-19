import React from 'react';
import classes from './RegionPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { regions } from '../../../../bd';
import { useParams } from 'react-router';

function RegionPage({ children, ...props }) {
    const { title } = useParams();
    const decodedTitle = decodeURIComponent(title);

    const transliterate = (text) => {
        const map = {
          А: 'A', Б: 'B', В: 'V', Г: 'G', Д: 'D', Е: 'E', Ё: 'E', Ж: 'Zh', З: 'Z', И: 'I',
          Й: 'Y', К: 'K', Л: 'L', М: 'M', Н: 'N', О: 'O', П: 'P', Р: 'R', С: 'S', Т: 'T',
          У: 'U', Ф: 'F', Х: 'Kh', Ц: 'Ts', Ч: 'Ch', Ш: 'Sh', Щ: 'Shch', Ы: 'Y', Э: 'E',
          Ю: 'Yu', Я: 'Ya', а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh',
          з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r',
          с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch',
          ы: 'y', э: 'e', ю: 'yu', я: 'ya', ' ': '-',
        };
        return text.split('').map((char) => map[char] || char).join('');
      };
    
      const currentRegion = regions.find(
        (item) =>
          transliterate(item.title.replaceAll('«', '').replaceAll('»', '')) ===
          decodedTitle
      );

  return (
    <>
      <div className={classes.back}>
        
        <CenterBlock>
          <WidthBlock>

          </WidthBlock>
        </CenterBlock>
      </div>
    </>
  );
}

export default RegionPage;
